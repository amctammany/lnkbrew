"use client";

import { createContext } from "react";
import { useSession } from "next-auth/react";
import {
  TimeUnit,
  UserGravityPreference,
  UserMassPreference,
  UserPreferences,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";

export type UserContextType = Partial<UserPreferences>; // Omit<UserPreferences, "userId"> | null;
export const UserContext = createContext<UserContextType>({});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const { userId, ...prefs } = session.data?.user.UserPreferences ?? {
    userId: undefined,
    timeUnit: TimeUnit.min,
    temperatureUnit: UserTemperaturePreference.F,
    volumeUnit: UserVolumePreference.gal,
    gravityUnit: UserGravityPreference.SG,
    hopMassUnit: UserMassPreference.Oz,
    fermentableMassUnit: UserMassPreference.LbOz,
  };
  console.log(prefs);
  //const ctx: UserContextType = prefs;
  return <UserContext.Provider value={prefs}>{children}</UserContext.Provider>;
}
