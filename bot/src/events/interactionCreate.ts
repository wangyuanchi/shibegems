import {
  createTutorialActionRowButtons,
  tutorialExecute,
  tutorialPagesEmbed,
} from "../commands/tutorial";

import { Interaction } from "discord.js";
import { buyExecute } from "../commands/buy";
import { createEmbed } from "../utils/embed";
import { leaderboardExecute } from "../commands/leaderboard";
import { pingExecute } from "../commands/ping";
import { profileExecute } from "../commands/profile";
import { resetExecute } from "../commands/reset";
import { spawnExecute } from "../commands/spawn";
import { tradeExecute } from "../commands/trade";

export default async (interaction: Interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      switch (interaction.commandName) {
        case "ping":
          await pingExecute(interaction);
          break;
        case "profile":
          await profileExecute(interaction);
          break;
        case "leaderboard":
          await leaderboardExecute(interaction);
          break;
        case "buy":
          await buyExecute(interaction);
          break;
        case "spawn":
          await spawnExecute(interaction);
          break;
        case "reset":
          await resetExecute(interaction);
          break;
        case "trade":
          await tradeExecute(interaction);
          break;
        case "tutorial":
          await tutorialExecute(interaction);
          break;
      }
      return;
    }

    if (interaction.isButton()) {
      const [commandName, index, direction] = interaction.customId.split("_");
      const newIndex =
        direction === "prev" ? parseInt(index) - 1 : parseInt(index) + 1;
      switch (commandName) {
        case "tutorial":
          await interaction.update({
            embeds: [
              createEmbed(interaction, false)
                .setTitle(tutorialPagesEmbed[newIndex].title)
                .setDescription(tutorialPagesEmbed[newIndex].description),
            ],
            components: [createTutorialActionRowButtons(newIndex)],
          });
          break;
      }
      return;
    }
  } catch (error) {
    console.error(error);
  }
};
