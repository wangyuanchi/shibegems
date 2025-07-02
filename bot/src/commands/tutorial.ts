import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { createEmbed } from "../utils/embed";

const command = new SlashCommandBuilder()
  .setName("tutorial")
  .setDescription("Tells you how the bot works.");

type Page = {
  title: string;
  description: string;
};

const page1: Page = {
  title: "**💎 shibegems Tutorial 💎**",
  description: `Every time you send a message, you have a chance to find a gem.

**Use your gems to:**
• Buy items which increase your gem chance
• Trade for gems that are lower or higher in rarity
• Climb up the networth and gemstone leaderboards

Create a profile by typing any message in any channel.
`,
};

const page2: Page = {
  title: "**💬 Commands 💬**",
  description: `All commands are accessible through slash commands "/".

**Commands available in any server:**
\`\`/profile\`\` View your profile
\`\`/buy\`\` Buy any item from the shop
\`\`/leaderboard gem\`\` View the leaderboard for a type of gem
\`\`/leaderboard networth\`\` View the networth leaderboard
\`\`/trade up\`\` Trade your gems for higher tier gems
\`\`/trade down\`\` Trade your gems for lower tier gems

**Commands only available in the development server:**
\`\`/reset\`\` Delete your entire profile
\`\`/spawn\`\` Spawn any type of gem for yourself
`,
};

const page3: Page = {
  title: "**✨ Gems ✨**",
  description: `These are the 13 possible gems you could get.
Adding up the base chances, you have ~50% chance to roll any gem for a message.

\`\`\`
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
\`\`\`
The total number of each gem you have collected will be visible in your profile.
`,
};

const page4: Page = {
  title: "**🛒 Shop 🛒**",
  description: `
The gem multiplier is multiplied to your base gem chance and also stacks.
The item is only worth 90% of the gems you spend.

\`\`seven of diamonds\`\`
x1.07 diamond_multiplier
7 Diamond

\`\`night vision goggles\`\`
x1.1 sunstone/citrine_multiplier
88 Diamond

\`\`topaz compass\`\`
x1.15 topaz_multiplier
25 Sunstone 25 Citrine

\`\`five leaf clover\`\`
x1.25 peridot/jade_multiplier
25 Peridot 5 Jade

\`\`blue crystal ball\`\`
x1.33 aquamarine/sapphire_multiplier
9 Aquamarine 3 Sapphire

\`\`moonbow particles\`\`
x1.35 amethyst_multiplier
1 Sunstone 2 Topaz 3 Peridot 4 Aquamarine 5 Amethyst

\`\`caisu's pink map\`\`
x1.4 kunzite_multiplier
4 Kunzite

\`\`rarespberry\`\`
x1.45 ruby_multiplier
80 Jade 1 Ruby

\`\`red topaz\`\`
x1.5 garnet_multiplier
1,000 Topaz

\`\`tempel-tuttle shard\`\`
x2.5 painite_multiplier
10,000 Diamond 4 Garnet
`,
};

const page5: Page = {
  title: "**🔄 Trading 🔄**",
  description: `**How the trading system works:**
• You can only trade down or up by 1 tier
• Your trades can never involve Painite
• You will always trade 3 lower tier gems for 1 higher tier gem
• You will always trade 1 higher tier gem for 2 lower tier gems
• You will always lose some networth with any trade
`,
};

const page6 = {
  title: "**⚙️ Development ⚙️**",
  description: `Feel free to join the development server!
  
**Permanent Invite Link:**
https://discord.gg/Q2zMhmHTq3
`,
};

export const tutorialPagesEmbed: Page[] = [
  page1,
  page2,
  page3,
  page4,
  page5,
  page6,
];

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
    .setDisabled(index === tutorialPagesEmbed.length - 1);

  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    prevButton,
    nextButton
  );
}

async function execute(interaction: ChatInputCommandInteraction) {
  const index = 0;
  await interaction.reply({
    embeds: [
      createEmbed(interaction, false)
        .setTitle(tutorialPagesEmbed[index].title)
        .setDescription(tutorialPagesEmbed[index].description),
    ],
    components: [createTutorialActionRowButtons(index)],
  });
}

export { command as tutorialCommand, execute as tutorialExecute };
