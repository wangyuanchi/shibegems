type Gem = {
  name: string;
  worth: number;
};

function calculateWorth(
  chance: number,
  baseValue: number = 100,
  exponent: number = 1.1
): number {
  return baseValue * Math.pow(1 / chance, exponent);
}

export const DIAMOND: Gem = {
  name: "diamond",
  worth: calculateWorth(1 / 4),
};

export const SUNSTONE: Gem = {
  name: "sunstone",
  worth: calculateWorth(1 / 8),
};

export const CITRINE: Gem = {
  name: "citrine",
  worth: calculateWorth(1 / 16),
};

export const TOPAZ: Gem = {
  name: "topaz",
  worth: calculateWorth(1 / 32),
};

export const PERIDOT: Gem = {
  name: "peridot",
  worth: calculateWorth(1 / 64),
};

export const JADE: Gem = {
  name: "jade",
  worth: calculateWorth(1 / 128),
};

export const AQUAMARINE: Gem = {
  name: "aquamarine",
  worth: calculateWorth(1 / 256),
};

export const SAPPHIRE: Gem = {
  name: "sapphire",
  worth: calculateWorth(1 / 512),
};

export const AMETHYST: Gem = {
  name: "amethyst",
  worth: calculateWorth(1 / 1024),
};

export const KUNZITE: Gem = {
  name: "kunzite",
  worth: calculateWorth(1 / 2048),
};

export const RUBY: Gem = {
  name: "ruby",
  worth: calculateWorth(1 / 4096),
};

export const GARNET: Gem = {
  name: "garnet",
  worth: calculateWorth(1 / 8192),
};

export const PAINITE: Gem = {
  name: "painite",
  worth: calculateWorth(1 / 16384),
};
