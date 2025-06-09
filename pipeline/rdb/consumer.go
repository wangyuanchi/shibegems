package rdb

import (
	"context"
	"log"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/wangyuanchi/shibegems/pipeline/utils"
)

func RunConsumer(wg *sync.WaitGroup, ctx context.Context, client *redis.Client, streamName, consumerGroupName, consumerName string) {
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
				log.Printf("[%v] No messages in Redis %v, retrying...", consumerName, streamName)
				continue
			}

			for _, stream := range res {
				log.Printf("[%v] Read %v messages from Redis %v", consumerName, len(stream.Messages), streamName)

				for _, message := range stream.Messages {
					messageEntry := message.Values

					gem := utils.RollRNG()
					if gem != nil {
						// Add to DB
						log.Printf("[%v] %v found a %v!", consumerName, messageEntry["authorID"], gem.Name)
					}

					err := client.XAck(ctx, streamName, consumerGroupName, message.ID).Err()
					if err != nil {
						log.Printf("[%v] Failed to acknowledge message entry %v: %v", consumerName, message.ID, err)
						continue
					}

					deleted, err := client.XDel(ctx, streamName, message.ID).Result()
					if err != nil {
						log.Printf("[%v] Failed to delete message entry %v: %v", consumerName, message.ID, err)
					} else if deleted == 0 {
						log.Printf("[%v] Message entry %v was already deleted", consumerName, message.ID)
					} else {
						log.Printf("[%v] Acknowledged and deleted message entry %v", consumerName, message.ID)
					}
				}
			}
		}
	}
}
