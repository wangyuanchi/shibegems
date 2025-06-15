import { GemMultiplierName, GemName, GemWorth } from "./gems";
import { gems, profile } from "../generated/prisma";

import { truncate } from "./gems";

export type ItemName = "chrysoberyl";

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
  chrysoberyl: {
    diamond: 0,
    sunstone: 0,
    citrine: 0,
    topaz: 100,
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
} as const;

const ItemMultiplier: ItemGemMultiplierMap = {
  chrysoberyl: {
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
    painite_multiplier: 2,
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
    profile["networth"] - truncate(0.1 * itemCostToNetworth(item));

  return updatedProfile;
}
