import { prisma } from "@/lib/client";
import { ExtendedMashProfile } from "@/types/Profile";
import { cache } from "react";

export const getMashProfile = cache(async (slug: string) => {
  const profile = await prisma.mashProfile.findFirst({
    where: { slug: { equals: slug } },
    include: { steps: true, owner: true, origin: true },
  });
  return profile as ExtendedMashProfile;
});

export const getMashProfiles = cache(async () => {
  const profiles = await prisma.mashProfile.findMany({});
  return profiles;
});

export const getMashProfileOptions = async () => {
  const profiles = await getMashProfiles();
  const options = profiles.reduce((acc, profile) => {
    acc[profile.id] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);
  return options;
};
