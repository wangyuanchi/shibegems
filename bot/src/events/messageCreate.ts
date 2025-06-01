import { Message } from "discord.js";
import { getRedisClient } from "../redis";

export default async (message: Message) => {
  if (message.author.id === message.client.user?.id) {
    return;
  }

  const redisClient = getRedisClient();

  await redisClient.set("author", `${message.author.id}`);
  await redisClient.set("message", `${message.content}`);
};
