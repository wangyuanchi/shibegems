type Gem = {
  name: GemName;
  worth: number;
};

export type GemName =
  | "diamond"
  | "sunstone"
  | "citrine"
  | "topaz"
  | "peridot"
  | "jade"
  | "aquamarine"
  | "sapphire"
  | "amethyst"
  | "kunzite"
  | "ruby"
  | "garnet"
  | "painite";

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
} as const;

export const SUNSTONE: Gem = {
  name: "sunstone",
  worth: calculateWorth(1 / 8),
} as const;

export const CITRINE: Gem = {
  name: "citrine",
  worth: calculateWorth(1 / 16),
} as const;

export const TOPAZ: Gem = {
  name: "topaz",
  worth: calculateWorth(1 / 32),
} as const;

export const PERIDOT: Gem = {
  name: "peridot",
  worth: calculateWorth(1 / 64),
} as const;

export const JADE: Gem = {
  name: "jade",
  worth: calculateWorth(1 / 128),
} as const;

export const AQUAMARINE: Gem = {
  name: "aquamarine",
  worth: calculateWorth(1 / 256),
} as const;

export const SAPPHIRE: Gem = {
  name: "sapphire",
  worth: calculateWorth(1 / 512),
} as const;

export const AMETHYST: Gem = {
  name: "amethyst",
  worth: calculateWorth(1 / 1024),
} as const;

export const KUNZITE: Gem = {
  name: "kunzite",
  worth: calculateWorth(1 / 2048),
} as const;

export const RUBY: Gem = {
  name: "ruby",
  worth: calculateWorth(1 / 4096),
} as const;

export const GARNET: Gem = {
  name: "garnet",
  worth: calculateWorth(1 / 8192),
} as const;

export const PAINITE: Gem = {
  name: "painite",
  worth: calculateWorth(1 / 16384),
} as const;
