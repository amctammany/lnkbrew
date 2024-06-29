"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";
import {
  UserPreferences,
  UserGravityPreference,
  UserMassPreference,
  UserTemperaturePreference,
  UserVolumePreference,
  UserColorPreference,
  TimeUnit,
} from "@prisma/client";
import { validateSchema } from "@/lib/validateSchema";
import { revalidateTag } from "next/cache";

const schema = zfd.formData({
  id: zfd.text(),
  name: zfd.text(),
  username: zfd.text(),
});
export async function updateUser(formData: FormData) {
  const data = schema.parse(formData);
  const res = await prisma.user.update({
    where: {
      id: data.id,
    },
    data,
  });
  return redirect("/admin");
}
const preferenceSchema = zfd.formData({
  userId: zfd.text(),
  //range: zfd.numeric().array().length(2),
  colorUnit: zfd.text(z.nativeEnum(UserColorPreference)),
  timeUnit: zfd.text(z.nativeEnum(TimeUnit)),
  volumeUnit: zfd.text(z.nativeEnum(UserVolumePreference)),
  hopMassUnit: zfd.text(z.nativeEnum(UserMassPreference)),
  fermentableMassUnit: zfd.text(z.nativeEnum(UserMassPreference)),
  gravityUnit: zfd.text(z.nativeEnum(UserGravityPreference)),
  temperatureUnit: zfd.text(z.nativeEnum(UserTemperaturePreference)),
  equipmentProfileId: zfd.numeric(z.number().optional()),
  mashProfileId: zfd.numeric(z.number().optional()),
  sourceWaterProfileId: zfd.numeric(z.number().optional()),
  targetWaterProfileId: zfd.numeric(z.number().optional()),
});
const favoriteSchema = zfd.formData({
  equipmentProfileId: zfd.numeric(z.number().optional()),
  mashProfileId: zfd.numeric(z.number().optional()),
  sourceWaterProfileId: zfd.numeric(z.number().optional()),
  targetWaterProfileId: zfd.numeric(z.number().optional()),
});
export async function toggleUserFavorite(
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
) {
  const res = await prisma.userPreferences.update({
    where: {
      userId,
    },
    include: {
      user: true,
      //defaultEquipment: true,
      //defaultMashProfile: true,
      //defaultSourceWater: true,
      //defaultTargetWater: true,
    },
    data: {
      [profileType]: profileId !== null ? profileId : null,
    },
  });
  revalidateTag("userPreferences");
}
/**
export async function updateUserFavorite(
  userId: string | undefined,
  formData: FormData
) {
  const { errors, ...data } = validateSchema(formData, favoriteSchema);
  if (errors && errors.length) {
    console.log(errors);
    return { errors };
  }
  const res = await prisma.userPreferences.update({
    where: {
      userId,
    },
    data: {
      defaultEquipment:
        data.equipmentProfileId === null
          ? undefined
          : data.equipmentProfileId === undefined
            ? { disconnect: true }
            : { connect: { id: data.equipmentProfileId } },
      defaultTargetWater:
        data.targetWaterProfileId === null
          ? undefined
          : data.targetWaterProfileId === undefined
            ? { disconnect: true }
            : { connect: { id: data.targetWaterProfileId } },
      defaultSourceWater:
        data.sourceWaterProfileId === null
          ? undefined
          : data.sourceWaterProfileId === undefined
            ? { disconnect: true }
            : { connect: { id: data.sourceWaterProfileId } },
      defaultMashProfile:
        data.mashProfileId === null
          ? undefined
          : data.mashProfileId === undefined
            ? { disconnect: true }
            : { connect: { id: data.mashProfileId } },
    },
  });

  revalidateTag("userPreferences");
}
*/
export async function updateUserPreferences(formData: FormData) {
  //const r = preferenceSchema.parse(formData);
  const { errors, userId, ...data } = validateSchema(
    formData,
    preferenceSchema
  );
  console.log(errors);
  if (errors && errors.length) {
    //console.log(errors);
    return { errors };
  }
  const update = {
    ...data,
  };
  const res = await prisma.userPreferences.upsert({
    where: {
      userId,
    },

    update,
    create: {
      ...update,
      userId,
    },
  });
  return redirect("/admin");
}
