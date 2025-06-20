import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import {
  ItemCost,
  ItemDisplayNames,
  ItemName,
  affordable,
  updatedProfileAfterBuyingItem,
} from "../utils/items";

import { createEmbedDescriptionOnly } from "../utils/embed";
import { getPrismaClient } from "../clients/prisma";

const command = new SlashCommandBuilder()
  .setName("buy")
  .setDescription("Buy any item from the shop.")
  .addStringOption((opt) =>
    opt
      .setName("item")
      .setDescription("The name of the item.")
      .setRequired(true)
      .addChoices(
        { name: "seven of diamonds", value: "seven_of_diamonds" },
        { name: "night vision goggles", value: "night_vision_goggles" },
        { name: "topaz compass", value: "topaz_compass" },
        { name: "five leaf clover", value: "five_leaf_clover" },
        { name: "blue crystal ball", value: "blue_crystal_ball" },
        { name: "moonbow particles", value: "moonbow_particles" },
        { name: "caisu's pink map", value: "caisu_pink_map" },
        { name: "rarespberry", value: "rarespberry" },
        { name: "red topaz", value: "red_topaz" },
        { name: "tempel-tuttle shard", value: "tempel_tuttle_shard" }
      )
  );

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();
  try {
    const item = interaction.options.getString("item", true) as ItemName;

    // Check if item already exists
    const exist = await getPrismaClient().items.findUnique({
      where: {
        user_id_guild_id_item: {
          user_id: BigInt(interaction.user.id),
          guild_id: BigInt(interaction.guildId!),
          item: item,
        },
      },
    });

    if (exist) {
      await interaction.editReply({
        embeds: [createEmbedDescriptionOnly("⚠️ You already have this item.")],
      });
      return;
    }

    // Check if item is affordable
    const gemsRow = await getPrismaClient().gems.findUnique({
      where: {
        user_id_guild_id: {
          user_id: BigInt(interaction.user.id),
          guild_id: BigInt(interaction.guildId!),
        },
      },
    });

    if (!affordable(gemsRow, item)) {
      await interaction.editReply({
        embeds: [createEmbedDescriptionOnly("❌ You cannot afford this item.")],
      });
      return;
    }

    const profile = await getPrismaClient().profile.findUnique({
      where: {
        user_id_guild_id: {
          user_id: BigInt(interaction.user.id),
          guild_id: BigInt(interaction.guildId!),
        },
      },
    });

    const data: Record<string, { decrement: number }> = {};
    for (const [gem, count] of Object.entries(ItemCost[item])) {
      if (count > 0) {
        data[gem] = { decrement: count };
      }
    }

    await getPrismaClient().$transaction([
      getPrismaClient().items.create({
        data: {
          user_id: BigInt(interaction.user.id),
          guild_id: BigInt(interaction.guildId!),
          item: item,
        },
      }),

      getPrismaClient().gems.update({
        where: {
          user_id_guild_id: {
            user_id: BigInt(interaction.user.id),
            guild_id: BigInt(interaction.guildId!),
          },
        },
        data: data,
      }),

      getPrismaClient().profile.update({
        where: {
          user_id_guild_id: {
            user_id: BigInt(interaction.user.id),
            guild_id: BigInt(interaction.guildId!),
          },
        },
        data: updatedProfileAfterBuyingItem(profile!, item),
      }),
    ]);
    await interaction.editReply({
      embeds: [
        createEmbedDescriptionOnly(
          `✅ Successfully bought \`\`${ItemDisplayNames[item]}\`\`!`
        ),
      ],
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

export { command as buyCommand, execute as buyExecute };
