package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"strconv"
	"sync"
	"syscall"

	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
	"github.com/wangyuanchi/shibegems/pipeline/rdb"
)

func main() {

	godotenv.Load(".env")

	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		log.Fatal("REDIS_URL is not found in the environment")
	}

	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		log.Fatalf("Error parsing REDIS_URL: %v", err)
	}

	client := redis.NewClient(opt)
	defer client.Close()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	_, err = client.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Error pinging Redis client: %v", err)
	}
	log.Println("Connected to Redis")

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)

	var wg sync.WaitGroup
	streamName := "messageStream"
	consumerGroupName := "messageStreamConsumerGroup"
	numConsumers := 3

	rdb.CreateConsumerGroup(ctx, client, streamName, consumerGroupName)
	for i := 1; i <= numConsumers; i++ {
		consumerName := "consumer-" + strconv.Itoa(i)
		wg.Add(1)
		go rdb.RunConsumer(&wg, ctx, client, streamName, consumerGroupName, consumerName)
	}

	<-sigCh
	cancel()
	wg.Wait()
	log.Println("All consumers exited")
	log.Println("Shutting down the Redis connection...")
}
