import "dotenv/config";

import { REST, Routes } from "discord.js";
import { connectDiscord, getDiscordClient } from "./clients/discord";
import { getPrismaClient, handlePrismaConnection } from "./clients/prisma";
import { getRedisClient, handleRedisConnection } from "./clients/redis";

import commands from "./commands/commands";
import interactionCreate from "./events/interactionCreate";
import messageCreate from "./events/messageCreate";

(async () => {
  await handleRedisConnection();
  await handlePrismaConnection();
})();

connectDiscord();
const discordClient = getDiscordClient();

discordClient.once("ready", async () => {
  console.log(`Logged in as ${discordClient.user?.tag}`);

  if (!process.env.CLIENT_ID || !process.env.GUILD_ID || !process.env.TOKEN) {
    console.error(
      "Error: Ensure CLIENT_ID, GUILD_ID and TOKEN environment variables are defined"
    );
    return;
  }

  const rest = new REST().setToken(process.env.TOKEN);

  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID // For instant registering of commands
      ),
      { body: commands }
    );

    console.log("Successfully registered application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log(
      "Successfully registered application (/) commands globally, the commands can take up to 1 hour to appear."
    );
  } catch (error) {
    console.error(error);
  }
});

discordClient.on("interactionCreate", interactionCreate);
discordClient.on("messageCreate", messageCreate);

async function shutdown() {
  if (getRedisClient()?.isOpen) {
    console.log("Shutting down the Redis connection...");
    await getRedisClient().quit();
  }

  await getPrismaClient().$disconnect(); // No logging message

  if (discordClient.isReady()) {
    console.log("Shutting down the Discord client...");
    discordClient.destroy();
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

if (!process.env.TOKEN) {
  console.error("Error: TOKEN environment variable is not defined");
  process.exit(1);
}

discordClient.login(process.env.TOKEN);
