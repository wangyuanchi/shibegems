import { Interaction } from "discord.js";
import { pingExecute } from "../commands/ping";

export default async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "ping":
      await pingExecute(interaction);
      break;
  }
};
