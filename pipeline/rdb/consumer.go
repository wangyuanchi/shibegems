package rdb

import (
	"context"
	"log"
	"strconv"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/wangyuanchi/shibegems/pipeline/pgdb/postgres"
	"github.com/wangyuanchi/shibegems/pipeline/utils"
)

func RunConsumer(wg *sync.WaitGroup, ctx context.Context, pgq *postgres.Queries, client *redis.Client, streamName, consumerGroupName, consumerName string) {
	defer wg.Done()
	for {
		select {
		case <-ctx.Done(): // Only selected when cancel() is called
			log.Printf("[%v] Exiting...", consumerName)
			return
		default:
			res, err := client.XReadGroup(ctx, &redis.XReadGroupArgs{
				Group:    consumerGroupName,
				Consumer: consumerName,
				Streams:  []string{streamName, ">"},
				Count:    5,
				Block:    5 * time.Second,
			}).Result()

			if err != nil && err != redis.Nil {
				log.Printf("[%v] Redis Read Error: %v", consumerName, err)
				continue
			}

			if res == nil {
				// log.Printf("[%v] No messages in Redis %v, retrying...", consumerName, streamName)
				continue
			}

			for _, stream := range res {
				// log.Printf("[%v] Read %v messages from Redis %v", consumerName, len(stream.Messages), streamName)
				processAcknowledgeDelete(ctx, pgq, client, stream, streamName, consumerGroupName, consumerName)
			}
		}
	}
}

func RunReclaimer(wg *sync.WaitGroup, ctx context.Context, pgq *postgres.Queries, client *redis.Client, streamName, consumerGroupName, consumerName string) {
	ticker := time.NewTicker(5 * time.Minute) // First tick in 5 minutes, not instantly
	defer ticker.Stop()
	defer wg.Done()
	for {
		select {
		case <-ctx.Done(): // Only selected when cancel() is called
			log.Printf("[%v] Exiting...", consumerName)
			return
		case <-ticker.C:
			claimed, _, err := client.XAutoClaim(ctx, &redis.XAutoClaimArgs{
				Stream:   streamName,
				Group:    consumerGroupName,
				Consumer: consumerName,
				MinIdle:  100 * time.Second,
				Start:    "0",
				Count:    50,
			}).Result()

			if err != nil {
				log.Printf("[%s] Redis Autoclaim error: %v", consumerName, err)
				continue
			}

			if len(claimed) == 0 {
				// log.Printf("[%v] No stale message entries to reclaim", consumerName)
				continue
			}
			log.Printf("[%v] Claimed %v stale message entries", consumerName, len(claimed))

			stream := redis.XStream{
				Stream:   streamName,
				Messages: claimed,
			}
			processAcknowledgeDelete(ctx, pgq, client, stream, streamName, consumerGroupName, consumerName)
		}
	}
}

func processAcknowledgeDelete(ctx context.Context, pgq *postgres.Queries, client *redis.Client, stream redis.XStream, streamName, consumerGroupName, consumerName string) {
	for _, message := range stream.Messages {
		messageEntry := message.Values

		// Type conversion without error checking
		guildID, _ := strconv.ParseInt(messageEntry["guildID"].(string), 10, 64)
		authorID, _ := strconv.ParseInt(messageEntry["authorID"].(string), 10, 64)

		err := pgq.CreateProfile(ctx, postgres.CreateProfileParams{
			UserID:  authorID,
			GuildID: guildID,
		})
		if err != nil {
			log.Printf("[%v] Failed to create profile: %v", consumerName, err)
			continue // Left in pending entries list
		}

		err = pgq.CreateGems(ctx, postgres.CreateGemsParams{
			UserID:  authorID,
			GuildID: guildID,
		})
		if err != nil {
			log.Printf("[%v] Failed to create gems: %v", consumerName, err)
			continue // Left in pending entries list
		}

		gem, err := utils.RollRNG(ctx, pgq, authorID, guildID)
		if err != nil {
			log.Printf("[%v] Failed to roll RNG: %v", consumerName, err)
			continue // Left in pending entries list
		}

		if gem != nil {
			err := utils.UpdateGemAndNetworth(ctx, pgq, authorID, guildID, gem.Name, 1)
			if err != nil {
				log.Printf("[%v] Failed to update gem and networth: %v", consumerName, err)
				continue // Left in pending entries list
			}
			// log.Printf("[%v] %v found a %v!", consumerName, authorID, gem.Name)
		}

		err = client.XAck(ctx, streamName, consumerGroupName, message.ID).Err()
		if err != nil {
			log.Printf("[%v] Failed to acknowledge message entry %v: %v", consumerName, message.ID, err)
			continue
		}

		deleted, err := client.XDel(ctx, streamName, message.ID).Result()
		if err != nil {
			log.Printf("[%v] Failed to delete message entry %v: %v", consumerName, message.ID, err)
			continue
		} else if deleted == 0 {
			log.Printf("[%v] Message entry %v was already deleted", consumerName, message.ID)
			continue
		} else {
			// log.Printf("[%v] Acknowledged and deleted message entry %v", consumerName, message.ID)
		}

		if gem != nil {
			logEntry := messageEntry
			logEntry["gem"] = gem.Name

			_, err = client.XAdd(ctx, &redis.XAddArgs{
				Stream: "logStream",
				ID:     "*",
				Values: logEntry,
			}).Result()
			if err != nil {
				log.Printf("[%v] Failed to add log entry: %v", consumerName, err)
			}
		}
	}
}
