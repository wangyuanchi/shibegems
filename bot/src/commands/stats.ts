import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

import { getPrismaClient } from "../prisma";

const command = new SlashCommandBuilder()
  .setName("stats")
  .setDescription("Shows the number of gems you have found.");

async function execute(interaction: ChatInputCommandInteraction) {
  try {
    const row = await getPrismaClient().gems.findUnique({
      where: {
        user_id_guild_id: {
          user_id: BigInt(interaction.user.id),
          guild_id: BigInt(interaction.guildId!),
        },
      },
    });

    if (!row) {
      await interaction.reply("You do not have any gems.");
    } else {
      const { user_id, guild_id, ...gems } = row;

      const embed = new EmbedBuilder()
        .setColor(0x7289da)
        .setTitle(`${interaction.user.username}'s Stats`)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFooter({ text: interaction.guild?.name! })
        .setTimestamp();

      for (const [key, value] of Object.entries(gems)) {
        embed.addFields({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: value.toString(),
          inline: true,
        });
      }

      await interaction.reply({ embeds: [embed] });
    }
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "An unexpected error occurred. Please try again later.",
      ephemeral: true,
    });
  }
}

export { command as statsCommand, execute as statsExecute };
