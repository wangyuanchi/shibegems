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
			log.Printf("Consumer group %v already exists", consumerGroupName)
		} else {
			log.Fatalf("Error creating consumer group %v: %v", consumerGroupName, err)
		}
	} else {
		log.Printf("Consumer group %v created", consumerGroupName)
	}
}
