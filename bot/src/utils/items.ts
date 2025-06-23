import { GemMultiplierName, GemName, GemWorth } from "./gems";
import { gems, profile } from "../generated/prisma";

import { truncate } from "./gems";

export type ItemName =
  | "seven_of_diamonds"
  | "night_vision_goggles"
  | "topaz_compass"
  | "five_leaf_clover"
  | "blue_crystal_ball"
  | "moonbow_particles"
  | "caisu_pink_map"
  | "rarespberry"
  | "red_topaz"
  | "tempel_tuttle_shard";

type ItemGemCountMap = {
  [item in ItemName]: {
    [gem in GemName]: number;
  };
};

type ItemGemMultiplierMap = {
  [item in ItemName]: {
    [gem in GemMultiplierName]: number;
  };
};

export const ItemCost: ItemGemCountMap = {
  seven_of_diamonds: {
    diamond: 7,
    sunstone: 0,
    citrine: 0,
    topaz: 0,
    peridot: 0,
    jade: 0,
    aquamarine: 0,
    sapphire: 0,
    amethyst: 0,
    kunzite: 0,
    ruby: 0,
    garnet: 0,
    painite: 0,
  },
  night_vision_goggles: {
    diamond: 88,
    sunstone: 0,
    citrine: 0,
    topaz: 0,
    peridot: 0,
    jade: 0,
    aquamarine: 0,
    sapphire: 0,
    amethyst: 0,
    kunzite: 0,
    ruby: 0,
    garnet: 0,
    painite: 0,
  },
  topaz_compass: {
    diamond: 0,
    sunstone: 25,
    citrine: 25,
    topaz: 0,
    peridot: 0,
    jade: 0,
    aquamarine: 0,
    sapphire: 0,
    amethyst: 0,
    kunzite: 0,
    ruby: 0,
    garnet: 0,
    painite: 0,
  },
  five_leaf_clover: {
    diamond: 0,
    sunstone: 0,
    citrine: 0,
    topaz: 0,
    peridot: 25,
    jade: 5,
    aquamarine: 0,
    sapphire: 0,
    amethyst: 0,
    kunzite: 0,
    ruby: 0,
    garnet: 0,
    painite: 0,
  },
  blue_crystal_ball: {
    diamond: 0,
    sunstone: 0,
    citrine: 0,
    topaz: 0,
    peridot: 0,
    jade: 0,
    aquamarine: 9,
    sapphire: 3,
    amethyst: 0,
    kunzite: 0,
    ruby: 0,
    garnet: 0,
    painite: 0,
  },
  moonbow_particles: {
    diamond: 0,
    sunstone: 1,
    citrine: 0,
    topaz: 2,
    peridot: 3,
    jade: 0,
    aquamarine: 4,
    sapphire: 0,
    amethyst: 5,
    kunzite: 0,
    ruby: 0,
    garnet: 0,
    painite: 0,
  },
  caisu_pink_map: {
    diamond: 0,
    sunstone: 0,
    citrine: 0,
    topaz: 0,
    peridot: 0,
    jade: 0,
    aquamarine: 0,
    sapphire: 0,
    amethyst: 0,
    kunzite: 4,
    ruby: 0,
    garnet: 0,
    painite: 0,
  },
  rarespberry: {
    diamond: 0,
    sunstone: 0,
    citrine: 0,
    topaz: 0,
    peridot: 0,
    jade: 80,
    aquamarine: 0,
    sapphire: 0,
    amethyst: 0,
    kunzite: 0,
    ruby: 1,
    garnet: 0,
    painite: 0,
  },
  red_topaz: {
    diamond: 0,
    sunstone: 0,
    citrine: 0,
    topaz: 1000,
    peridot: 0,
    jade: 0,
    aquamarine: 0,
    sapphire: 0,
    amethyst: 0,
    kunzite: 0,
    ruby: 0,
    garnet: 0,
    painite: 0,
  },
  tempel_tuttle_shard: {
    diamond: 10000,
    sunstone: 0,
    citrine: 0,
    topaz: 0,
    peridot: 0,
    jade: 0,
    aquamarine: 0,
    sapphire: 0,
    amethyst: 0,
    kunzite: 0,
    ruby: 0,
    garnet: 4,
    painite: 0,
  },
} as const;

export const ItemMultiplier: ItemGemMultiplierMap = {
  seven_of_diamonds: {
    diamond_multiplier: 1.07,
    sunstone_multiplier: 1,
    citrine_multiplier: 1,
    topaz_multiplier: 1,
    peridot_multiplier: 1,
    jade_multiplier: 1,
    aquamarine_multiplier: 1,
    sapphire_multiplier: 1,
    amethyst_multiplier: 1,
    kunzite_multiplier: 1,
    ruby_multiplier: 1,
    garnet_multiplier: 1,
    painite_multiplier: 1,
  },
  night_vision_goggles: {
    diamond_multiplier: 1,
    sunstone_multiplier: 1.1,
    citrine_multiplier: 1.1,
    topaz_multiplier: 1,
    peridot_multiplier: 1,
    jade_multiplier: 1,
    aquamarine_multiplier: 1,
    sapphire_multiplier: 1,
    amethyst_multiplier: 1,
    kunzite_multiplier: 1,
    ruby_multiplier: 1,
    garnet_multiplier: 1,
    painite_multiplier: 1,
  },
  topaz_compass: {
    diamond_multiplier: 1,
    sunstone_multiplier: 1,
    citrine_multiplier: 1,
    topaz_multiplier: 1.15,
    peridot_multiplier: 1,
    jade_multiplier: 1,
    aquamarine_multiplier: 1,
    sapphire_multiplier: 1,
    amethyst_multiplier: 1,
    kunzite_multiplier: 1,
    ruby_multiplier: 1,
    garnet_multiplier: 1,
    painite_multiplier: 1,
  },
  five_leaf_clover: {
    diamond_multiplier: 1,
    sunstone_multiplier: 1,
    citrine_multiplier: 1,
    topaz_multiplier: 1,
    peridot_multiplier: 1.25,
    jade_multiplier: 1.25,
    aquamarine_multiplier: 1,
    sapphire_multiplier: 1,
    amethyst_multiplier: 1,
    kunzite_multiplier: 1,
    ruby_multiplier: 1,
    garnet_multiplier: 1,
    painite_multiplier: 1,
  },
  blue_crystal_ball: {
    diamond_multiplier: 1,
    sunstone_multiplier: 1,
    citrine_multiplier: 1,
    topaz_multiplier: 1,
    peridot_multiplier: 1,
    jade_multiplier: 1,
    aquamarine_multiplier: 1.33,
    sapphire_multiplier: 1.33,
    amethyst_multiplier: 1,
    kunzite_multiplier: 1,
    ruby_multiplier: 1,
    garnet_multiplier: 1,
    painite_multiplier: 1,
  },
  moonbow_particles: {
    diamond_multiplier: 1,
    sunstone_multiplier: 1,
    citrine_multiplier: 1,
    topaz_multiplier: 1,
    peridot_multiplier: 1,
    jade_multiplier: 1,
    aquamarine_multiplier: 1,
    sapphire_multiplier: 1,
    amethyst_multiplier: 1.35,
    kunzite_multiplier: 1,
    ruby_multiplier: 1,
    garnet_multiplier: 1,
    painite_multiplier: 1,
  },
  caisu_pink_map: {
    diamond_multiplier: 1,
    sunstone_multiplier: 1,
    citrine_multiplier: 1,
    topaz_multiplier: 1,
    peridot_multiplier: 1,
    jade_multiplier: 1,
    aquamarine_multiplier: 1,
    sapphire_multiplier: 1,
    amethyst_multiplier: 1,
    kunzite_multiplier: 1.4,
    ruby_multiplier: 1,
    garnet_multiplier: 1,
    painite_multiplier: 1,
  },
  rarespberry: {
    diamond_multiplier: 1,
    sunstone_multiplier: 1,
    citrine_multiplier: 1,
    topaz_multiplier: 1,
    peridot_multiplier: 1,
    jade_multiplier: 1,
    aquamarine_multiplier: 1,
    sapphire_multiplier: 1,
    amethyst_multiplier: 1,
    kunzite_multiplier: 1,
    ruby_multiplier: 1.45,
    garnet_multiplier: 1,
    painite_multiplier: 1,
  },
  red_topaz: {
    diamond_multiplier: 1,
    sunstone_multiplier: 1,
    citrine_multiplier: 1,
    topaz_multiplier: 1,
    peridot_multiplier: 1,
    jade_multiplier: 1,
    aquamarine_multiplier: 1,
    sapphire_multiplier: 1,
    amethyst_multiplier: 1,
    kunzite_multiplier: 1,
    ruby_multiplier: 1,
    garnet_multiplier: 1.5,
    painite_multiplier: 1,
  },
  tempel_tuttle_shard: {
    diamond_multiplier: 1,
    sunstone_multiplier: 1,
    citrine_multiplier: 1,
    topaz_multiplier: 1,
    peridot_multiplier: 1,
    jade_multiplier: 1,
    aquamarine_multiplier: 1,
    sapphire_multiplier: 1,
    amethyst_multiplier: 1,
    kunzite_multiplier: 1,
    ruby_multiplier: 1,
    garnet_multiplier: 1,
    painite_multiplier: 2.5,
  },
} as const;

export function affordable(gemsRow: gems | null, item: ItemName): boolean {
  if (!gemsRow) {
    return false;
  }

  for (const gem of Object.keys(ItemCost[item]) as GemName[]) {
    if (gemsRow[gem] < ItemCost[item][gem]) {
      return false;
    }
  }

  return true;
}

function itemCostToNetworth(item: ItemName) {
  let costToNetworth = 0;
  for (const key of Object.keys(ItemCost[item]) as GemName[]) {
    costToNetworth += ItemCost[item][key] * GemWorth[key];
  }
  return costToNetworth;
}

export function updatedProfileAfterBuyingItem(
  profile: profile,
  item: ItemName
): Partial<profile> {
  const updatedProfile: Partial<profile> = { ...profile };
  const multipliers = ItemMultiplier[item];

  // Update multipliers
  for (const key of Object.keys(multipliers) as GemMultiplierName[]) {
    updatedProfile[key] = profile[key] * multipliers[key];
  }

  // Update networth
  // Items are worth 90% of their cost
  updatedProfile["networth"] =
    profile["networth"] - BigInt(truncate(0.1 * itemCostToNetworth(item)));

  return updatedProfile;
}

export const ItemDisplayNames: Record<string, string> = {
  seven_of_diamonds: "seven of diamonds",
  night_vision_goggles: "night vision goggles",
  topaz_compass: "topaz compass",
  five_leaf_clover: "five leaf clover",
  blue_crystal_ball: "blue crystal ball",
  moonbow_particles: "moonbow particles",
  caisu_pink_map: "caisu's pink map",
  rarespberry: "rarespberry",
  red_topaz: "red topaz",
  tempel_tuttle_shard: "tempel-tuttle shard",
} as const;
