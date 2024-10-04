import { UnitTypes } from "@/lib/amountConversions";
import { UserPreferences, User, UnitPreferences } from "@prisma/client";

export type BaseUser = Pick<User, "name" | "email" | "id" | "username">;
export type Preferences = Partial<Omit<UserPreferences, "userId">>;

export type UnitPrefs = Omit<UnitPreferences, "id"> & {
  mass?: UnitTypes;
  percent?: UnitTypes;
  potential?: UnitTypes;
  unit?: UnitTypes;
  percentage?: UnitTypes;
};
