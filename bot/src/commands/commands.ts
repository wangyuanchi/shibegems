import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

import { buyCommand } from "./buy";
import { leaderboardCommand } from "./leaderboard";
import { pingCommand } from "./ping";
import { profileCommand } from "./profile";

const commands: (
  | SlashCommandBuilder
  | SlashCommandSubcommandsOnlyBuilder
  | SlashCommandOptionsOnlyBuilder
)[] = [pingCommand, profileCommand, leaderboardCommand, buyCommand];

export default commands.map((command) => command.toJSON());
