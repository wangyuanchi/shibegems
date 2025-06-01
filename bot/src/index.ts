import "dotenv/config";

import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { getRedisClient, handleRedisConnection } from "./redis";

import commands from "./commands/commands";
import interactionCreate from "./events/interactionCreate";
import messageCreate from "./events/messageCreate";

(async () => {
  await handleRedisConnection();
})();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  if (!process.env.CLIENT_ID || !process.env.GUILD_ID || !process.env.TOKEN) {
    console.error(
      "Error: Ensure CLIENT_ID, GUILD_ID and TOKEN environment variables are defined"
    );
    return;
  }

  const rest = new REST().setToken(process.env.TOKEN);

  try {
    // To support multiple guilds, use Routes.applicationCommands
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Successfully registered application (/) commands");
  } catch (error) {
    console.error(error);
  }
});

client.on("interactionCreate", interactionCreate);
client.on("messageCreate", messageCreate);

async function shutdown() {
  if (getRedisClient()?.isOpen) {
    console.log("Shutting down the Redis connection...");
    await getRedisClient().quit();
  }
  if (client.isReady()) {
    console.log("Shutting down the Discord client...");
    client.destroy();
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

if (!process.env.TOKEN) {
  console.error("Error: TOKEN environment variable is not defined");
  process.exit(1);
}

client.login(process.env.TOKEN);
