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
