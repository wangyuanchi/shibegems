import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { createEmbedDescriptionOnly } from "../utils/embed";

const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({
    embeds: [createEmbedDescriptionOnly("🏓 Pong!")],
  });
}

export { command as pingCommand, execute as pingExecute };
