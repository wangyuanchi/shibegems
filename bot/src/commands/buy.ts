import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import {
  ItemCost,
  ItemName,
  affordable,
  updatedProfileAfterBuyingItem,
} from "../utils/items";

import { getPrismaClient } from "../clients/prisma";

const command = new SlashCommandBuilder()
  .setName("buy")
  .setDescription("Buy any item from the shop.")
  .addStringOption((opt) =>
    opt
      .setName("item")
      .setDescription("The name of the item.")
      .setRequired(true)
      .addChoices({ name: "chrysoberyl", value: "chrysoberyl" })
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
      await interaction.editReply("⚠️  You already have this item.");
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
      await interaction.editReply("❌  You cannot afford this item.");
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

    await interaction.editReply(`✅  Successfully bought \`\`${item}\`\`!`);
  } catch (err) {
    console.error(err);
    await interaction.editReply(
      "🛑  An unexpected error occurred. Please try again later."
    );
  }
}

export { command as buyCommand, execute as buyExecute };
