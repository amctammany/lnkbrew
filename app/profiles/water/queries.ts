import { prisma } from "@/lib/client";
import { cache } from "react";

export const getWaterProfile = cache(async (slug: string) => {
  const profile = await prisma.waterProfile.findFirst({
    where: { slug: { equals: slug } },
  });
  return profile;
});

export const getWaterProfiles = cache(async () => {
  const profiles = await prisma.waterProfile.findMany({});
  return profiles;
});

export const getWaterProfileOptions = async () => {
  const profiles = await getWaterProfiles();
  const options = profiles.reduce(
    (acc, profile) => {
      acc[profile.id] = `${profile.name}`;
      return acc;
    },
    {} as Record<string, string>
  );
  return options;
};
