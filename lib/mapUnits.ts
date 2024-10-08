import { UnitPreferences, EquipmentProfile, MashProfile } from "@prisma/client";
import { AmountType, classConverters, UnitTypes } from "./amountConversions";
import { ExtendedMashProfile } from "@/types/Profile";
export type Mapping<T extends object> = {
  [Prop in keyof T]?: AmountType;
};
export const mashProfileStepMapping: Mapping<
  ExtendedMashProfile["steps"][number]
> = {
  time: "time",
  rampTime: "time",
  temperature: "temperature",
};

export const equipmentProfileMapping: Mapping<EquipmentProfile> = {
  boilTime: "time",
  batchVolume: "volume",
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
  method: "to" | "from" = "to"
) {
  return (Object.keys(mapping) as (keyof T)[]).reduce(
    (acc, k) => {
      const map = mapping[k] as AmountType;
      if (typeof acc[k] === "number")
        acc[k as any] = toFixed(
          classConverters[map][prefs[map] as UnitTypes][method](acc[k]),
          2
        ); // [prefs[k]];
      //time: classConverters["time"][prefs.time as UnitTypes].to(time), //,(time),
      return acc;
    },
    { ...src }
  );
}
