import { GemName } from "./gems";

export type MessageEntry = {
  id: string;
  content: string;
  authorID: string;
  authorUsername: string;
  channelID: string;
  channelName: string;
  guildID: string;
  guildName: string;
  createdTimestamp: string;
};

export type LogEntry = MessageEntry & {
  gem: GemName;
};
