import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

import { leaderboardCommand } from "./leaderboard";
import { pingCommand } from "./ping";
import { statsCommand } from "./stats";

const commands: (SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder)[] = [
  pingCommand,
  statsCommand,
  leaderboardCommand,
];

export default commands.map((command) => command.toJSON());
