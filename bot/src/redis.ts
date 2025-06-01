import "dotenv/config";

import { RedisClientType, createClient } from "redis";

let client: RedisClientType | null = null;

async function connectRedis(): Promise<void> {
  if (client?.isOpen) {
    return;
  }

  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL environment variable is not defined");
  }

  client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on("error", (err) => {
    console.error("[Redis]", err);
  });

  await client.connect();
  console.log("Connected to Redis");

  return;
}

export async function handleRedisConnection(): Promise<void> {
  try {
    await connectRedis();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export function getRedisClient(): RedisClientType {
  if (!client) {
    throw new Error("Redis client is not initialized, you must connect first.");
  }

  return client;
}
