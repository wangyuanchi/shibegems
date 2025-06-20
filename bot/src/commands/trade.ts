import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { GemName, GemWorth } from "../utils/gems";
import { TradeDownMap, TradeUpMap } from "../utils/trade";

import { createEmbedDescriptionOnly } from "../utils/embed";
import { getPrismaClient } from "../clients/prisma";

const command = new SlashCommandBuilder()
  .setName("trade")
  .setDescription("Trade your gems for lower or higher tier gems.")
  .addSubcommand((sub) =>
    sub
      .setName("up")
      .setDescription("Trade 3 lower tier gems for 1 higher tier gem.")
      .addStringOption((opt) =>
        opt
          .setName("type")
          .setDescription("The higher tier gem you want to trade towards.")
          .setRequired(true)
          .addChoices(
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
            { name: "garnet", value: "garnet" }
          )
      )
      .addIntegerOption((opt) =>
        opt
          .setName("count")
          .setDescription("The number of gems you want to receive.")
          .setRequired(true)
          .setMinValue(1)
      )
  )
  .addSubcommand((sub) =>
    sub
      .setName("down")
      .setDescription("Trade 1 higher tier gem for 2 lower tier gems.")
      .addStringOption((opt) =>
        opt
          .setName("type")
          .setDescription("The lower tier gem you want to trade towards.")
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
            { name: "ruby", value: "ruby" }
          )
      )
      .addIntegerOption((opt) =>
        opt
          .setName("count")
          .setDescription(
            "The number of gems you want to receive. Must be an even number."
          )
          .setRequired(true)
          .setMinValue(1)
      )
  );

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();
  try {
    const profileWithGems = await getPrismaClient().profile.findUnique({
      where: {
        user_id_guild_id: {
          user_id: BigInt(interaction.user.id),
          guild_id: BigInt(interaction.guildId!),
        },
      },
      include: {
        gems: true,
      },
    });

    if (!profileWithGems) {
      await interaction.editReply({
        embeds: [
          createEmbedDescriptionOnly(
            "⚠️ You do not have a profile which is required to trade gems. Send a message in any channel to create one automatically."
          ),
        ],
      });
      return;
    }

    const gemsRow = profileWithGems.gems!;
    const sub = interaction.options.getSubcommand();
    const receiveType = interaction.options.getString("type", true) as GemName;
    const receiveCount = interaction.options.getInteger("count", true);
    let giveType: GemName;
    let giveCount: number;

    if (sub === "up") {
      giveType = TradeUpMap[receiveType] as GemName;
      giveCount = receiveCount * 3;
    } else {
      if (receiveCount % 2 !== 0) {
        await interaction.editReply({
          embeds: [
            createEmbedDescriptionOnly(
              "❌ You can only trade down to an even number of gems."
            ),
          ],
        });
        return;
      }

      giveType = TradeDownMap[receiveType] as GemName;
      giveCount = receiveCount / 2;
    }

    if (gemsRow[giveType] < giveCount) {
      await interaction.editReply({
        embeds: [
          createEmbedDescriptionOnly(
            `❌ You cannot afford this trade, you need ${
              giveCount - gemsRow[giveType]
            } more ${giveType}.`
          ),
        ],
      });
      return;
    }

    await getPrismaClient().$transaction([
      getPrismaClient().gems.update({
        where: {
          user_id_guild_id: {
            user_id: BigInt(interaction.user.id),
            guild_id: BigInt(interaction.guildId!),
          },
        },
        data: {
          [giveType]: { decrement: giveCount },
          [receiveType]: { increment: receiveCount },
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
          networth: {
            decrement: BigInt(
              giveCount * GemWorth[giveType] -
                receiveCount * GemWorth[receiveType]
            ),
          },
        },
      }),
    ]);

    await interaction.editReply({
      embeds: [
        createEmbedDescriptionOnly(
          `✅ Successfully traded ${giveCount.toLocaleString()} ${giveType} for ${receiveCount.toLocaleString()} ${receiveType}!`
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

export { command as tradeCommand, execute as tradeExecute };
