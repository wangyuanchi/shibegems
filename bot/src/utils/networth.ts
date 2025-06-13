import {
  AMETHYST,
  AQUAMARINE,
  CITRINE,
  DIAMOND,
  GARNET,
  JADE,
  KUNZITE,
  PAINITE,
  PERIDOT,
  RUBY,
  SAPPHIRE,
  SUNSTONE,
  TOPAZ,
} from "./gem";

import { gems } from "../generated/prisma";

export function calculateNetworth(row: gems) {
  let networth = 0;
  networth += row.diamond * DIAMOND.worth;
  networth += row.sunstone * SUNSTONE.worth;
  networth += row.citrine * CITRINE.worth;
  networth += row.topaz * TOPAZ.worth;
  networth += row.peridot * PERIDOT.worth;
  networth += row.jade * JADE.worth;
  networth += row.aquamarine * AQUAMARINE.worth;
  networth += row.sapphire * SAPPHIRE.worth;
  networth += row.amethyst * AMETHYST.worth;
  networth += row.kunzite * KUNZITE.worth;
  networth += row.ruby * RUBY.worth;
  networth += row.garnet * GARNET.worth;
  networth += row.painite * PAINITE.worth;
  return Math.round(networth);
}
