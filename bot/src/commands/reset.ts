import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { getPrismaClient } from "../clients/prisma";

const command = new SlashCommandBuilder()
  .setName("reset")
  .setDescription(
    "Deletes your entire profile. Only works in the development server."
  );

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();
  try {
    if (interaction.guildId !== "1378312561820438609") {
      await interaction.editReply(
        "❌  You cannot use this command in this server."
      );
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
      await interaction.editReply(
        "⚠️  No profile to delete as you do not have one."
      );
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

    await interaction.editReply("✅  Successfully deleted profile.");
  } catch (err) {
    console.error(err);
    await interaction.editReply(
      "🛑  An unexpected error occurred. Please try again later."
    );
  }
}

export { command as resetCommand, execute as resetExecute };
