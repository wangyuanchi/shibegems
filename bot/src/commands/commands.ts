import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

import { buyCommand } from "./buy";
import { leaderboardCommand } from "./leaderboard";
import { pingCommand } from "./ping";
import { profileCommand } from "./profile";
import { resetCommand } from "./reset";
import { spawnCommand } from "./spawn";
import { tradeCommand } from "./trade";

const commands: (
  | SlashCommandBuilder
  | SlashCommandSubcommandsOnlyBuilder
  | SlashCommandOptionsOnlyBuilder
)[] = [
  pingCommand,
  profileCommand,
  leaderboardCommand,
  buyCommand,
  spawnCommand,
  resetCommand,
  tradeCommand,
];

export default commands.map((command) => command.toJSON());
