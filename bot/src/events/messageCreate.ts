import { Message } from "discord.js";

export default (message: Message) => {
  if (message.author.id === message.client.user?.id) {
    return;
  }

  console.log(`${message.author.id} sent a message: ${message.content}`);
};
