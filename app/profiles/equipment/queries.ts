import { prisma } from "@/lib/client";
import { cache } from "react";
import { ExtendedEquipmentProfile } from "./_components/EquipmentProfileDisplay";

export const getEquipmentProfile = cache(async (slug: string) => {
  const profile = await prisma.equipmentProfile.findFirst({
    where: { slug: { equals: slug } },
    include: { owner: true },
    //include: { users: true },
  });
  return profile as ExtendedEquipmentProfile;
});

export const getEquipmentProfiles = cache(async () => {
  const profiles = await prisma.equipmentProfile.findMany({});
  return profiles;
});

export const getEquipmentProfileOptions = async () => {
  const profiles = await getEquipmentProfiles();
  const options = profiles.reduce(
    (acc, profile) => {
      acc[profile.id] = `${profile.name}`;
      return acc;
    },
    {} as Record<string, string>
  );
  return options;
};
