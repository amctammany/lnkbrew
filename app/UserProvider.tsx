"use client";

import { createContext } from "react";
import { useSession } from "next-auth/react";
import {
  TimeUnit,
  UserColorPreference,
  UserGravityPreference,
  UserMassPreference,
  UserPreferences,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";
import { toggleUserFavorite } from "./admin/actions";

export type UserContextType = Partial<UserPreferences> & {
  toggleUserFavorite?: typeof toggleUserFavorite;
  flow?: any;
  concentration?: any;
  percent?: any;
  mass?: any;
  unit?: any;
  volume?: any;
  percentage?: any;
  potential?: any;
}; // Omit<UserPreferences, "userId"> | null;
export const UserContext = createContext<UserContextType>({});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const { userId, ...prefs } = {
    userId: undefined,
    mass: UserMassPreference.g,
    color: UserColorPreference.L,
    flow: "gal/min",
    concentration: "ppm",
    percent: "%",
    percentage: "%",
    potential: "ppg",
    time: TimeUnit.min,
    unit: "each",
    temperature: UserTemperaturePreference.F,
    volume: UserVolumePreference.gal,
    gravity: UserGravityPreference.SG,
    hopMass: UserMassPreference.Oz,
    fermentableMass: UserMassPreference.LbOz,
    ...(session.data?.user.UserPreferences ?? {}),
  };
  const val = {
    userId,
    ...prefs,
    toggleUserFavorite: async (
      userId: string | undefined,
      profileType: Exclude<
        keyof UserPreferences,
        //| "gravity"
        //| "temperature"
        "userId"
        //| "volume"
        //| "hopMass"
        //| "fermentableMass"
      >,
      profileId: number | null
    ) => {
      await toggleUserFavorite(userId, profileType, profileId);
      await session?.update();
    },
  };

  //
  //const ctx: UserContextType = prefs;
  return <UserContext value={val}>{children}</UserContext>;
}
