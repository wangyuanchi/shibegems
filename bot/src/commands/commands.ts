import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

import { buyCommand } from "./buy";
import { leaderboardCommand } from "./leaderboard";
import { pingCommand } from "./ping";
import { profileCommand } from "./profile";
import { spawnCommand } from "./spawn";

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
];

export default commands.map((command) => command.toJSON());
