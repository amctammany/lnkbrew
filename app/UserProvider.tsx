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
}; // Omit<UserPreferences, "userId"> | null;
export const UserContext = createContext<UserContextType>({});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const { userId, ...prefs } = session.data?.user.UserPreferences ?? {
    userId: undefined,
    colorUnit: UserColorPreference.L,
    timeUnit: TimeUnit.min,
    temperatureUnit: UserTemperaturePreference.F,
    volumeUnit: UserVolumePreference.gal,
    gravityUnit: UserGravityPreference.SG,
    hopMassUnit: UserMassPreference.Oz,
    fermentableMassUnit: UserMassPreference.LbOz,
  };
  const val = {
    userId,
    ...prefs,
    toggleUserFavorite: async (
      userId: string | undefined,
      profileType: Exclude<
        keyof UserPreferences,
        | "gravityUnit"
        | "temperatureUnit"
        | "userId"
        | "volumeUnit"
        | "hopMassUnit"
        | "fermentableMassUnit"
      >,
      profileId: number | null
    ) => {
      await toggleUserFavorite(userId, profileType, profileId);
      await session?.update();
    },
  };

  //const ctx: UserContextType = prefs;
  return <UserContext value={val}>{children}</UserContext>;
}
