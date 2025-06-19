import { ButtonInteraction, CacheType } from "discord.js";

import { ChatInputCommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";

export function createEmbed(
  interaction:
    | ChatInputCommandInteraction<CacheType>
    | ButtonInteraction<CacheType>,
  displayAvatar: boolean
) {
  const embed = new EmbedBuilder()
    .setColor(0x3e8cf9)
    .setFooter({ text: interaction.guild?.name! })
    .setTimestamp();

  if (displayAvatar) {
    embed.setThumbnail(interaction.user.displayAvatarURL());
  }

  return embed;
}

export function createEmbedDescriptionOnly(description: string) {
  return new EmbedBuilder().setColor(0x3e8cf9).setDescription(description);
}
