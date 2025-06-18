import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const command = new SlashCommandBuilder()
  .setName("tutorial")
  .setDescription("Tells you how the bot works.");

export const tutorialPages = ["Page 1", "Page 2", "Page 3"];

export function createTutorialActionRowButtons(
  index: number
): ActionRowBuilder<ButtonBuilder> {
  const prevButton = new ButtonBuilder()
    .setCustomId(`tutorial_${index}_prev`)
    .setLabel("Prev")
    .setEmoji("⬅️")
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(index === 0);

  const nextButton = new ButtonBuilder()
    .setCustomId(`tutorial_${index}_next`)
    .setLabel("Next")
    .setEmoji("➡️")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(index === tutorialPages.length - 1);

  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    prevButton,
    nextButton
  );
}

async function execute(interaction: ChatInputCommandInteraction) {
  const index = 0;
  await interaction.reply({
    content: tutorialPages[index],
    components: [createTutorialActionRowButtons(index)],
  });
}

export { command as tutorialCommand, execute as tutorialExecute };
