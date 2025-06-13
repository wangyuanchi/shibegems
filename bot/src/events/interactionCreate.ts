import { Interaction } from "discord.js";
import { leaderboardExecute } from "../commands/leaderboard";
import { pingExecute } from "../commands/ping";
import { statsExecute } from "../commands/stats";

export default async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "ping":
      await pingExecute(interaction);
      break;
    case "stats":
      await statsExecute(interaction);
      break;
    case "leaderboard":
      await leaderboardExecute(interaction);
      break;
  }
};
