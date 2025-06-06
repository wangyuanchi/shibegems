package rdb

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

func CreateConsumerGroup(ctx context.Context, client *redis.Client, streamName, consumerGroupName string) {
	err := client.XGroupCreateMkStream(ctx, streamName, consumerGroupName, "0").Err()
	if err != nil {
		if err.Error() == "BUSYGROUP Consumer Group name already exists" {
			log.Println("Consumer group already exists")
		} else {
			log.Fatalf("Error creating consumer group: %v", err)
		}
	} else {
		log.Println("Consumer group created")
	}
}
