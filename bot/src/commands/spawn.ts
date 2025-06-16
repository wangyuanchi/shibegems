import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { GemName, GemWorth } from "../utils/gems";

import { getPrismaClient } from "../clients/prisma";

const command = new SlashCommandBuilder()
  .setName("spawn")
  .setDescription("[ADMIN COMMAND] Spawn gems for testing purposes.")
  .addStringOption((opt) =>
    opt
      .setName("type")
      .setDescription("The type of gem to spawn.")
      .setRequired(true)
      .addChoices(
        { name: "diamond", value: "diamond" },
        { name: "sunstone", value: "sunstone" },
        { name: "citrine", value: "citrine" },
        { name: "topaz", value: "topaz" },
        { name: "peridot", value: "peridot" },
        { name: "jade", value: "jade" },
        { name: "aquamarine", value: "aquamarine" },
        { name: "sapphire", value: "sapphire" },
        { name: "amethyst", value: "amethyst" },
        { name: "kunzite", value: "kunzite" },
        { name: "ruby", value: "ruby" },
        { name: "garnet", value: "garnet" },
        { name: "painite", value: "painite" }
      )
  )
  .addIntegerOption((opt) =>
    opt
      .setName("count")
      .setDescription("The number of gems to spawn.")
      .setRequired(true)
      .setMinValue(1)
  );

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();
  try {
    if (interaction.user.id !== "1378309602759807017") {
      await interaction.editReply(
        "You do not have permission to use this admin command!"
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
        "You do not have a profile, send a message in any channel to create one automatically."
      );
      return;
    }

    const type = interaction.options.getString("type", true) as GemName;
    const count = interaction.options.getInteger("count", true);

    await getPrismaClient().$transaction([
      getPrismaClient().gems.update({
        where: {
          user_id_guild_id: {
            user_id: BigInt(interaction.user.id),
            guild_id: BigInt(interaction.guildId!),
          },
        },
        data: {
          [type]: { increment: count },
        },
      }),
      getPrismaClient().profile.update({
        where: {
          user_id_guild_id: {
            user_id: BigInt(interaction.user.id),
            guild_id: BigInt(interaction.guildId!),
          },
        },
        data: {
          networth: { increment: count * GemWorth[type] },
        },
      }),
    ]);

    await interaction.editReply(`Successfully added ${count} ${type}.`);
  } catch (err) {
    console.error(err);
    await interaction.editReply(
      "An unexpected error occurred. Please try again later."
    );
  }
}

export { command as spawnCommand, execute as spawnExecute };
