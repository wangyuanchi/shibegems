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

export const RareGemNames: GemName[] = [
  "amethyst",
  "kunzite",
  "ruby",
  "garnet",
  "painite",
];

export type GemMultiplierName =
  | "diamond_multiplier"
  | "sunstone_multiplier"
  | "citrine_multiplier"
  | "topaz_multiplier"
  | "peridot_multiplier"
  | "jade_multiplier"
  | "aquamarine_multiplier"
  | "sapphire_multiplier"
  | "amethyst_multiplier"
  | "kunzite_multiplier"
  | "ruby_multiplier"
  | "garnet_multiplier"
  | "painite_multiplier";

// Mimics Go's int32()
export function truncate(x: number): number {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

function calculateWorth(chance: number): number {
  return truncate(100 * Math.pow(1 / chance, 1.1));
}

type GemWorthMap = {
  [gem in GemName]: number;
};

export const GemWorth: GemWorthMap = {
  diamond: calculateWorth(1 / 4),
  sunstone: calculateWorth(1 / 8),
  citrine: calculateWorth(1 / 16),
  topaz: calculateWorth(1 / 32),
  peridot: calculateWorth(1 / 64),
  jade: calculateWorth(1 / 128),
  aquamarine: calculateWorth(1 / 256),
  sapphire: calculateWorth(1 / 512),
  amethyst: calculateWorth(1 / 1024),
  kunzite: calculateWorth(1 / 2048),
  ruby: calculateWorth(1 / 4096),
  garnet: calculateWorth(1 / 8192),
  painite: calculateWorth(1 / 16384),
} as const;
