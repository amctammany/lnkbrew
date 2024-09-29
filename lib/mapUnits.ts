import { UnitPreferences, EquipmentProfile } from "@prisma/client";
import { AmountType, classConverters, UnitTypes } from "./amountConversions";
export type Mapping<T extends object> = {
  [Prop in keyof T]?: AmountType;
};
export const equipmentProfileMapping: Mapping<EquipmentProfile> =
  //Record<
  //keyof EquipmentProfile extends string ? string : never,
  //Extract<keyof EquipmentProfile, Exclude<keyof UnitPreferences, "id">>,
  //AmountType
  {
    boilTime: "time",
    batchVolume: "volume",
    boilOffRate: "flow",
    trubLoss: "volume",
    mashLoss: "volume",
    fermenterLoss: "volume",
    mashEfficiency: "percentage",
    brewEfficiency: "percentage",
  };

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
        acc[k as any] = classConverters[map][prefs[map] as UnitTypes][method](
          acc[k]
        ); // [prefs[k]];
      //time: classConverters["time"][prefs.time as UnitTypes].to(time), //,(time),
      return acc;
    },
    { ...src }
  );
}
