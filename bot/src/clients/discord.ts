import { Client, GatewayIntentBits } from "discord.js";

let client: Client | null = null;

export function connectDiscord() {
  if (client) {
    return;
  }

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });
}

export function getDiscordClient() {
  if (!client) {
    throw new Error(
      "Discord client is not initialized, you must connect first."
    );
  }
  return client;
}
