import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { createEmbed } from "../utils/embed";
import { getPrismaClient } from "../clients/prisma";

const command = new SlashCommandBuilder()
  .setName("profile")
  .setDescription(
    "Shows the number of gems you have found and the items you have."
  );

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  try {
    const gemsRow = await getPrismaClient().gems.findUnique({
      where: {
        user_id_guild_id: {
          user_id: BigInt(interaction.user.id),
          guild_id: BigInt(interaction.guildId!),
        },
      },
    });

    if (!gemsRow) {
      await interaction.editReply("You do not have any gems.");
      return;
    }

    const profileRow = await getPrismaClient().profile.findUnique({
      where: {
        user_id_guild_id: {
          user_id: BigInt(interaction.user.id),
          guild_id: BigInt(interaction.guildId!),
        },
      },
    });

    const { user_id, guild_id, ...gems } = gemsRow;
    const { networth } = profileRow!;

    const embed = createEmbed(interaction, true)
      .setTitle(`${interaction.user.username}'s Profile`)
      .setDescription(`Networth: ${networth}`);

    for (const [key, value] of Object.entries(gems)) {
      embed.addFields({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value.toString(),
        inline: true,
      });
    }

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    console.error(err);
    await interaction.editReply(
      "An unexpected error occurred. Please try again later."
    );
  }
}

export { command as profileCommand, execute as profileExecute };
