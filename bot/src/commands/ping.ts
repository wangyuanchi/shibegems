import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply("Pong!");
}

export { command as pingCommand, execute as pingExecute };
