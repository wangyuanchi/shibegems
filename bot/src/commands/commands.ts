import { SlashCommandBuilder } from "discord.js";
import { pingCommand } from "./ping";

const commands: SlashCommandBuilder[] = [pingCommand];

export default commands.map((command) => command.toJSON());
