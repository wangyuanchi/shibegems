import { SlashCommandBuilder } from "discord.js";
import { pingCommand } from "./ping";
import { statsCommand } from "./stats";

const commands: SlashCommandBuilder[] = [pingCommand, statsCommand];

export default commands.map((command) => command.toJSON());
