"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z, ZodError, ZodIssue } from "zod";
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
  //userId: zfd.text(),
  id: zfd.text(),
  name: zfd.text(),
  username: zfd.text(),
  email: zfd.text(),
});
export async function updateUser(formData: FormData) {
  //try {
  const v = validateSchema(formData, schema);
  //console.log(v);
  //if (v.errors) return v;
  const { errors, id, ...data } = v;

  //if (errors) return Promise.resolve({ errors });

  //const data = validateSchema(formData, schema); //  schema.parse(formData);
  //console.log(data);
  const res = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  redirect("/admin/dash/profile");
  /**
  } catch (e) {
    const f = e as ZodError;
    console.log(f);
    return {
      //errors: validatedFields.error.flatten().fieldErrors
      errors: (f.issues || []).reduce(
        (acc, issue) => {
          acc[issue.path.join(".")] = issue;
          return acc;
        },
        {} as Record<string, ZodIssue>
      ),
    };
  }
  */
}
const preferenceSchema = zfd.formData({
  userId: zfd.text(),
  //range: zfd.numeric().array().length(2),
  color: zfd.text(
    z.nativeEnum(UserColorPreference).default(UserColorPreference.SRM)
  ),
  time: zfd.text(z.nativeEnum(TimeUnit).default(TimeUnit.min)),
  volume: zfd.text(
    z.nativeEnum(UserVolumePreference).default(UserVolumePreference.gal)
  ),
  hopMass: zfd.text(
    z.nativeEnum(UserMassPreference).default(UserMassPreference.Oz)
  ),
  fermentableMass: zfd.text(
    z.nativeEnum(UserMassPreference).default(UserMassPreference.Lb)
  ),
  gravity: zfd.text(
    z.nativeEnum(UserGravityPreference).default(UserGravityPreference.SG)
  ),
  temperature: zfd.text(
    z.nativeEnum(UserTemperaturePreference).default(UserTemperaturePreference.F)
  ),
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
      defaultEquipment: true,
      defaultMashProfile: true,
      defaultSourceWater: true,
      defaultTargetWater: true,
    },
    data: {
      [profileType]: profileId !== null ? profileId : null,
    },
  });
  revalidateTag("userPreferences");
}
export async function updateUserFavorite(
  userId: string | undefined,
  formData: FormData
) {
  const { errors, ...data } = validateSchema(formData, favoriteSchema);
  if (errors && errors.length) {
    //console.error(errors);
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
export async function updateUserPreferences(formData: FormData) {
  const r = preferenceSchema.parse(formData);
  console.log(r);
  const { errors, userId, ...data } = validateSchema(
    formData,
    preferenceSchema
  );
  if (errors && errors.length) {
    //console.error(errors);
    return Promise.resolve({ errors });
  }
  console.log({ userId, data });
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
