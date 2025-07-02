import { GuildTextBasedChannel, Message } from "discord.js";

import { MessageEntry } from "../utils/entries";
import { getRedisClient } from "../clients/redis";

export default async (message: Message) => {
  if (message.author.id === message.client.user?.id || !message.guild) {
    return;
  }

  const channelName = (message.channel as GuildTextBasedChannel)?.name;
  if (!channelName) {
    return;
  }

  const messageEntry: MessageEntry = {
    id: message.id,
    content: message.content,
    authorID: message.author.id,
    authorUsername: message.author.username,
    channelID: message.channel.id,
    channelName: channelName,
    guildID: message.guild.id,
    guildName: message.guild.name,
    createdTimestamp: message.createdTimestamp.toString(),
  };

  const redisClient = getRedisClient();
  redisClient.xAdd("messageStream", "*", messageEntry);
};
