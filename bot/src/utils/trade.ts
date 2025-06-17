import { GemName } from "./gems";

type TradeMap = Partial<Record<GemName, GemName>>;

// To get the "key" gem, you need the "value" gem.
export const TradeUpMap: TradeMap = {
  sunstone: "diamond",
  citrine: "sunstone",
  topaz: "citrine",
  peridot: "topaz",
  jade: "peridot",
  aquamarine: "jade",
  sapphire: "aquamarine",
  amethyst: "sapphire",
  kunzite: "amethyst",
  ruby: "kunzite",
  garnet: "ruby",
} as const;

// To get the "key" gem, you need the "value" gem.
export const TradeDownMap: TradeMap = {
  diamond: "sunstone",
  sunstone: "citrine",
  citrine: "topaz",
  topaz: "peridot",
  peridot: "jade",
  jade: "aquamarine",
  aquamarine: "sapphire",
  sapphire: "amethyst",
  amethyst: "kunzite",
  kunzite: "ruby",
  ruby: "garnet",
} as const;
