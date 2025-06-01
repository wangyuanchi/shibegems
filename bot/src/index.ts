import "dotenv/config";

import { Client, Interaction, REST, Routes } from "discord.js";

import commands from "./commands/commands";
import interactionCreate from "./events/interactionCreate";

const client = new Client({ intents: [] });

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
    console.log("Started registering application (/) commands.");

    // To support multiple guilds, use Routes.applicationCommands
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Successfully registering application (/) commands.");
  } catch (error) {
    console.error(error);
  }
});

client.on("interactionCreate", async (interaction: Interaction) => {
  await interactionCreate(interaction);
});

if (!process.env.TOKEN) {
  console.error("Error: TOKEN environment variable is not defined");
  process.exit(1);
}

client.login(process.env.TOKEN);
