import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const command = new SlashCommandBuilder()
  .setName("tutorial")
  .setDescription("Tells you how the bot works.");

const page1 = `**💎  shibegems Tutorial  💎**

Every time you send a message, you have a chance to find a gem.

Use your gems to:
• Buy items that increase your gem multiplier
• Trade for gems that are lower or higher in rarity
• Climb up the networth and gemstone leaderboards

Create a profile by typing any message in any channel.
Have fun chatting!
`;

const page2 = `**💬  Commands  💬**

All commands are accessible through slash commands "/".

Commands available in any server: 
/buy                   Buy any item from the shop
/leaderboard gem       View the leaderboard for a specific type of gem
/leaderboard networth  View the networth leaderboard
/profile               View your profile
/trade up              Trade your gems for higher tier gems
/trade down            Trade your gems for lower tier gems

Commands only available in the development server:
/reset                 Delete your entire profile
/spawn                 Spawn any type of gem for yourself
`;

const page3 = `**✨  Gem Info  ✨**

Type        Chance        Worth
Diamond     1 in 4        459
Sunstone    1 in 8        984
Citrine     1 in 16       2,111
Topaz       1 in 32       4,525
Peridot     1 in 64       9,700
Jade        1 in 128      20,807
Aquamarine  1 in 256      44,659
Sapphire    1 in 512      95,775
Amethyst    1 in 1,024    205,773
Kunzite     1 in 2,048    442,903
Ruby        1 in 4,096    953,642
Garnet      1 in 8,192    2,055,471
Painite     1 in 131,072  4,425,289
`;

const page4 = `**🛒  Shop  🛒**

Item                 Cost        Effect
\`\`Chrysoberyl\`\`  200 Topaz   x2 painite_multiplier
\`\`Cymophane\`\`    1000 Topaz  x4 painite_multiplier

Note:
The gem multiplier is multiplied to your base gem chance and also stacks.
The item is only worth 90% of the gems you spend.
`;

const page5 = `**🔄  Trading System  🔄**

How it works:
• You can only trade down or up by 1 tier
• Your trades can never involve Painite
• You will always trade 3 lower tier gems for 1 higher tier gem
• You will always trade 1 higher tier gem for 2 lower tier gems
• You will always lose some networth with any trade
`;

const page6 = `**⚙️  Development Server  ⚙️**

Feel free to join and check out the behind the scenes!
Permanent Invite Link: https://discord.gg/QMTJcqZz
`;

export const tutorialPages = [page1, page2, page3, page4, page5, page6];

export function createTutorialActionRowButtons(
  index: number
): ActionRowBuilder<ButtonBuilder> {
  const prevButton = new ButtonBuilder()
    .setCustomId(`tutorial_${index}_prev`)
    .setLabel("Prev")
    .setEmoji("⬅️")
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(index === 0);

  const nextButton = new ButtonBuilder()
    .setCustomId(`tutorial_${index}_next`)
    .setLabel("Next")
    .setEmoji("➡️")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(index === tutorialPages.length - 1);

  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    prevButton,
    nextButton
  );
}

async function execute(interaction: ChatInputCommandInteraction) {
  const index = 0;
  await interaction.reply({
    content: tutorialPages[index],
    components: [createTutorialActionRowButtons(index)],
  });
}

export { command as tutorialCommand, execute as tutorialExecute };
