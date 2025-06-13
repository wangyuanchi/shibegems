import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { GemString } from "../utils/gem";
import { createEmbed } from "../utils/embed";
import { getDiscordClient } from "../discord";
import { getPrismaClient } from "../prisma";

const command = new SlashCommandBuilder()
  .setName("leaderboard")
  .setDescription("Select the leaderboard you want to view.")
  .addSubcommand((sub) =>
    sub
      .setName("gem")
      .setDescription("View the leaderboard for a specific gem type.")
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
  const sub = interaction.options.getSubcommand();

  if (sub === "gem") {
    const type = interaction.options.getString("type", true) as GemString;

    try {
      const rows = await getPrismaClient().gems.findMany({
        where: {
          guild_id: BigInt(interaction.guildId!),
          [type]: { gt: 0 },
        },
        orderBy: {
          [type]: "desc",
        },
        take: 10,
      });

      if (rows.length === 0) {
        await interaction.reply("This leaderboard is currently empty!");
      } else {
        const topTenArray = rows.map((row) => ({
          user_id: row.user_id,
          [type]: row[type],
        }));
        const embed = createEmbed(interaction, false).setTitle(
          `${type.charAt(0).toUpperCase() + type.slice(1)} Leaderboard`
        );

        topTenArray.forEach((element, i) => {
          embed.addFields({
            name: `#${i + 1} ${getDiscordClient().users.cache.get(
              element.user_id.toString()
            )}`,
            value: `${element[type]}`,
          });
        });

        await interaction.reply({
          embeds: [embed],
        });
      }
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "An unexpected error occurred. Please try again later.",
        ephemeral: true,
      });
    }
  } else if (sub === "networth") {
    await interaction.reply("Coming Soon!");
  }
}

export { command as leaderboardCommand, execute as leaderboardExecute };
