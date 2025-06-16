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
    const profileWithGemsAndItems = await getPrismaClient().profile.findUnique({
      where: {
        user_id_guild_id: {
          user_id: BigInt(interaction.user.id),
          guild_id: BigInt(interaction.guildId!),
        },
      },
      include: {
        gems: true,
        items: true,
      },
    });

    if (!profileWithGemsAndItems) {
      await interaction.editReply(
        "You do not have a profile, send a message in any channel to create one automatically."
      );
      return;
    }

    const { user_id, guild_id, ...gems } = profileWithGemsAndItems.gems!;
    const { networth } = profileWithGemsAndItems;
    const items = profileWithGemsAndItems.items.map((element) => element.item);

    let description = `Networth: ${networth}`;

    if (items.length > 0) {
      description += "\nItems:\n";
      description += items.join("\n");
    }

    const embed = createEmbed(interaction, true)
      .setTitle(`${interaction.user.username}'s Profile`)
      .setDescription(description);

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
