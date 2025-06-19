import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { createEmbedDescriptionOnly } from "../utils/embed";
import { getPrismaClient } from "../clients/prisma";

const command = new SlashCommandBuilder()
  .setName("reset")
  .setDescription(
    "Delete your entire profile. Only works in the development server."
  );

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();
  try {
    if (interaction.guildId !== "1378312561820438609") {
      await interaction.editReply({
        embeds: [
          createEmbedDescriptionOnly(
            "❌ You cannot use this command in this server."
          ),
        ],
      });
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

    if (!profileRow) {
      await interaction.editReply({
        embeds: [
          createEmbedDescriptionOnly(
            "⚠️ No profile to delete as you do not have one."
          ),
        ],
      });
      return;
    }

    await getPrismaClient().profile.delete({
      where: {
        user_id_guild_id: {
          user_id: BigInt(interaction.user.id),
          guild_id: BigInt(interaction.guildId!),
        },
      },
    });

    await interaction.editReply({
      embeds: [createEmbedDescriptionOnly("✅ Successfully deleted profile.")],
    });
  } catch (err) {
    console.error(err);
    await interaction.editReply({
      embeds: [
        createEmbedDescriptionOnly(
          "🛑 An unexpected error occurred. Please try again later."
        ),
      ],
    });
  }
}

export { command as resetCommand, execute as resetExecute };
