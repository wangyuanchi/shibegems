package rdb

import (
	"context"
	"log"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"
)

func RunConsumer(wg *sync.WaitGroup, ctx context.Context, client *redis.Client, streamName, consumerGroupName, consumerName string) {
	defer wg.Done()
	for {
		select {
		case <-ctx.Done(): // Only selected when cancel() is called
			log.Printf("%v is exiting...", consumerName)
			return
		default:
			log.Println("Reading from Redis stream...")
			time.Sleep(5000 * time.Millisecond)
		}
	}
}
