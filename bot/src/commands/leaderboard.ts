import {
  APIEmbedField,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

import { GemName } from "../utils/gems";
import { convertToTrophy } from "../utils/trophy";
import { createEmbed } from "../utils/embed";
import { createEmbedDescriptionOnly } from "../utils/embed";
import { fetchDiscordUsername } from "../utils/username";
import { getPrismaClient } from "../clients/prisma";

const command = new SlashCommandBuilder()
  .setName("leaderboard")
  .setDescription("View any type of leaderboard.")
  .addSubcommand((sub) =>
    sub
      .setName("gem")
      .setDescription("View the leaderboard for a type of gem.")
      .addStringOption((opt) =>
        opt
          .setName("type")
          .setDescription("The type of gem.")
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
  )
  .addSubcommand((sub) =>
    sub.setName("networth").setDescription("View the networth leaderboard.")
  );

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();
  try {
    const sub = interaction.options.getSubcommand();
    if (sub === "gem") {
      const type = interaction.options.getString("type", true) as GemName;

      const gemsRows = await getPrismaClient().gems.findMany({
        where: {
          guild_id: BigInt(interaction.guildId!),
          [type]: { gt: 0 },
        },
        orderBy: {
          [type]: "desc",
        },
        take: 10,
      });

      if (gemsRows.length === 0) {
        await interaction.editReply({
          embeds: [
            createEmbedDescriptionOnly(
              "👀 This leaderboard is currently empty."
            ),
          ],
        });
        return;
      }

      const userGemsRow = await getPrismaClient().gems.findUnique({
        where: {
          user_id_guild_id: {
            user_id: BigInt(interaction.user.id),
            guild_id: BigInt(interaction.guildId!),
          },
        },
      });

      let userGemCount: number;
      if (!userGemsRow) {
        userGemCount = 0;
      } else {
        userGemCount = userGemsRow[type];
      }

      const userRank =
        (await getPrismaClient().gems.count({
          where: {
            [type]: {
              gt: userGemCount,
            },
          },
        })) + 1;

      const embed = createEmbed(interaction, false).setTitle(
        `${type.charAt(0).toUpperCase() + type.slice(1)} Leaderboard`
      );

      embed.setDescription(
        `You are ranked #${userRank.toLocaleString()} with ${userGemCount.toLocaleString()} ${type}.`
      );

      const fields: APIEmbedField[] = await Promise.all(
        gemsRows.map(async (gemsRow, i) => ({
          name: `${convertToTrophy(`#${i + 1}`)} ${await fetchDiscordUsername(
            gemsRow.user_id
          )}`,
          value: gemsRow[type].toLocaleString(),
          inline: true,
        }))
      );

      embed.addFields(fields);
      await interaction.editReply({ embeds: [embed] });
    } else if (sub === "networth") {
      const profileRows = await getPrismaClient().profile.findMany({
        where: {
          guild_id: BigInt(interaction.guildId!),
          networth: { gt: 0 },
        },
        orderBy: {
          networth: "desc",
        },
        take: 10,
      });

      if (profileRows.length === 0) {
        await interaction.editReply({
          embeds: [
            createEmbedDescriptionOnly(
              "👀 This leaderboard is currently empty."
            ),
          ],
        });
        return;
      }

      const userProfileRow = await getPrismaClient().profile.findUnique({
        where: {
          user_id_guild_id: {
            user_id: BigInt(interaction.user.id),
            guild_id: BigInt(interaction.guildId!),
          },
        },
      });

      let userNetworth: bigint;
      if (!userProfileRow) {
        userNetworth = 0n;
      } else {
        userNetworth = userProfileRow.networth;
      }

      const userRank =
        (await getPrismaClient().profile.count({
          where: {
            networth: {
              gt: userNetworth,
            },
          },
        })) + 1;

      const embed = createEmbed(interaction, false).setTitle(
        "Networth Leaderboard"
      );

      embed.setDescription(
        `You are ranked #${userRank.toLocaleString()} with a networth of ${userNetworth.toLocaleString()}.`
      );

      const fields: APIEmbedField[] = await Promise.all(
        profileRows.map(async (profileRow, i) => ({
          name: `${convertToTrophy(`#${i + 1}`)} ${await fetchDiscordUsername(
            profileRow.user_id
          )}`,
          value: profileRow.networth.toLocaleString(),
          inline: true,
        }))
      );

      embed.addFields(fields);
      await interaction.editReply({ embeds: [embed] });
    }
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

export { command as leaderboardCommand, execute as leaderboardExecute };
