package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"strconv"
	"sync"
	"syscall"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
	"github.com/wangyuanchi/shibegems/pipeline/pgdb/legacy"
	"github.com/wangyuanchi/shibegems/pipeline/pgdb/postgres"
	"github.com/wangyuanchi/shibegems/pipeline/rdb"
)

func main() {
	// Load environment variables
	godotenv.Load(".env")

	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		log.Fatal("REDIS_URL is not found in the environment")
	}

	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		log.Fatalf("Error parsing REDIS_URL: %v", err)
	}

	postgresURL := os.Getenv("POSTGRES_URL")
	if postgresURL == "" {
		log.Fatal("POSTGRES_URL is not found in the environment")
	}

	// Context that is used throughout the pipeline
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Connect to Redis client
	redisClient := redis.NewClient(opt)
	defer redisClient.Close()

	_, err = redisClient.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Error pinging Redis client: %v", err)
	}
	log.Println("Connected to Redis")

	// Connect to Postgres database
	pool, err := pgxpool.New(ctx, postgresURL)
	if err != nil {
		log.Fatalf("Unable to create connection pool: %v", err)
	}
	log.Println("Connected to Postgres")
	defer pool.Close()
	pgq := postgres.New(pool)

	/*
		This performs the data migration to the "gems" table
		An additional "backup" table is also manually created
	*/
	legacy.Migrate(ctx, pgq, "./pgdb/legacy/gems.json", false)

	// Main task of this pipeline
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)

	var wg sync.WaitGroup
	streamName := "messageStream"
	consumerGroupName := "messageStreamConsumerGroup"
	rdb.CreateConsumerGroup(ctx, redisClient, streamName, consumerGroupName)

	wg.Add(1)
	log.Printf("[reclaimer] Starting...")
	go rdb.RunReclaimer(&wg, ctx, pgq, redisClient, streamName, consumerGroupName, "reclaimer")

	for i := 1; i <= 2; i++ {
		consumerName := "consumer-" + strconv.Itoa(i)
		wg.Add(1)
		log.Printf("[%v] Starting...", consumerName)
		go rdb.RunConsumer(&wg, ctx, pgq, redisClient, streamName, consumerGroupName, consumerName)
	}

	<-sigCh
	cancel()
	wg.Wait()
	log.Println("All consumers exited")
	log.Println("Shutting down the Postgres connection...")
	log.Println("Shutting down the Redis connection...")
}
