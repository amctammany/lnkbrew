import { RangeValue } from "@/components/Range/RangeSlider";
import { Hop, Yeast, Fermentable, HopSensoryPanel } from "@prisma/client";
export type BaseFermentable = Pick<
  Fermentable,
  | "name"
  | "id"
  | "slug"
  | "description"
  | "maxUsage"
  | "color"
  | "potential"
  | "power"
>;
export type BaseYeast = Pick<
  Yeast,
  | "name"
  | "id"
  | "slug"
  | "description"
  | "attenuation"
  | "flocculation"
  | "form"
  | "tempLow"
  | "tempHigh"
  | "tolerance"
  | "type"
>;

export type BaseHop = Pick<
  Hop,
  | "name"
  | "id"
  | "slug"
  | "description"
  | "characteristics"
  | "alpha"
  | "country"
  | "usage"
  | "beta"
  | "flavor"
>;
export type ExtendedHop = Hop & { HopSensoryPanel: HopSensoryPanel[] };
export type HopInput = Hop & {
  alphaRange?: RangeValue;
  betaRange?: RangeValue;
  cohumuloneRange?: RangeValue;
  caryophylleneRange?: RangeValue;
  farneseneRange?: RangeValue;
  humuleneRange?: RangeValue;
  myrceneRange?: RangeValue;
  totalOilRange?: RangeValue;
};

export type YeastInput = Yeast & {
  tempRange?: RangeValue;
  attenuationRange?: RangeValue;
};
