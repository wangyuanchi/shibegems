import { Interaction } from "discord.js";
import { buyExecute } from "../commands/buy";
import { leaderboardExecute } from "../commands/leaderboard";
import { pingExecute } from "../commands/ping";
import { profileExecute } from "../commands/profile";

export default async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
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
    }
  } catch (error) {
    console.error(error);
  }
};
