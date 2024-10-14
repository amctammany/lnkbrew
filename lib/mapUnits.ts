import {
  UnitPreferences,
  EquipmentProfile,
  MashProfile,
  HopIngredient,
  FermentableIngredient,
} from "@prisma/client";
import { AmountType, classConverters, UnitTypes } from "./amountConversions";
import { ExtendedMashProfile } from "@/types/Profile";
import { ExtendedRecipe } from "@/types/Recipe";
export type Mapping<T extends object> = {
  [Prop in keyof T]?: AmountType | [AmountType, UnitTypes] | null;
};
export const mashProfileStepMapping: Mapping<
  ExtendedMashProfile["steps"][number]
> = {
  time: ["time", "min"],
  rampTime: ["time", "min"],
  temperature: "temperature",
};

export const hopIngredientMapping: Mapping<HopIngredient> = {
  //amount: "hopMass",
  //duration: ["time", "min"],
  temperature: "temperature",
  //durationType:
};

export const fermentableIngredientMapping: Mapping<FermentableIngredient> = {
  //amount: "fermentableMass",
  color: "color",
  //potential: "potential",
  //temperature: "temperature",
  //durationType:
};
export const recipeMapping: Mapping<ExtendedRecipe> = {
  boilTime: ["time", "min"],
  batchVolume: "volume",
  preboilVolume: "volume",
  boilOffRate: "flow",
  trubLoss: "volume",
  mashLoss: "volume",
  fermenterLoss: "volume",
  mashEfficiency: "percent",
  brewEfficiency: "percent",
};

export const equipmentProfileMapping: Mapping<EquipmentProfile> = {
  boilTime: ["time", "min"],
  batchVolume: "volume",
  preboilVolume: "volume",
  boilOffRate: "flow",
  trubLoss: "volume",
  mashLoss: "volume",
  fermenterLoss: "volume",
  mashEfficiency: "percent",
  brewEfficiency: "percent",
};
function toFixed(num: number, fixed: number) {
  fixed = fixed || 0;
  fixed = Math.pow(10, fixed);
  return Math.floor(num * fixed) / fixed;
}
export function mapUnits<T extends Record<string | number, unknown>>(
  src: T,
  prefs: {
    [T in AmountType]?: UnitTypes;
    //keyof Omit<UnitPreferences, "id"> | "percent" | "percentage" | "mass",
    //any
    //>, //Partial<Omit<UnitPreferences, "id">>,
  },
  mapping: Mapping<T>,
  method: "to" | "from" = "to",
  fixed = 0
) {
  return (Object.keys(mapping) as (keyof T)[]).reduce(
    (acc, k) => {
      const map = mapping[k];
      if (typeof acc[k] === "number") {
        let def: number;
        if (Array.isArray(map)) {
          const [amountType, unit] = map;
          def = classConverters[amountType][unit][method](acc[k]);
        } else {
          def = classConverters[map as AmountType][
            prefs[map as AmountType] as UnitTypes
          ][method](acc[k]);
        }
        acc[k as any] = fixed > 0 ? toFixed(def, fixed) : def;
      }
      //4 // [prefs[k]];
      //time: classConverters["time"][prefs.time as UnitTypes].to(time), //,(time),
      return acc;
    },
    { ...src }
  );
}
