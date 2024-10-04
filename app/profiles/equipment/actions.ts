"use server";
import {
  AmountType,
  classConverters,
  UnitTypes,
} from "@/lib/amountConversions";
import { prisma } from "@/lib/client";
import { SchemaFieldError, validateSchema } from "@/lib/validateSchema";
import { EquipmentProfile, UnitPreferences } from "@prisma/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { ZodError, ZodIssue, z } from "zod";
import { zfd } from "zod-form-data";
import { EquipmentProfileForm } from "./_components/EquipmentProfileForm";
import { equipmentProfileMapping, mapUnits } from "@/lib/mapUnits";
import {
  EquipmentProfileInput,
  ExtendedEquipmentProfile,
} from "@/types/Profile";
const equipmentSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  name: zfd.text(),
  userId: zfd.text(z.string().optional()),
  forkedFrom: zfd.numeric(z.number().optional()),
  description: zfd.text(z.string().optional()),
  boilTime: zfd.numeric(z.number().min(0).optional()),
  batchVolume: zfd.numeric(z.number().min(0).optional()),
  boilOffRate: zfd.numeric(z.number().min(0).optional()),
  trubLoss: zfd.numeric(z.number().min(0).optional()),
  mashLoss: zfd.numeric(z.number().min(0).optional()),
  fermenterLoss: zfd.numeric(z.number().min(0).optional()),
  mashEfficiency: zfd.numeric(z.number().min(0).max(100).optional()),
  brewEfficiency: zfd.numeric(z.number().min(0).max(100).optional()),
});

export const createEquipmentProfile = async (
  prefs: Partial<Omit<UnitPreferences, "id">>,
  prevState: any,
  formData: FormData
) => {
  try {
    //console.log(prevState);
    //console.log(Object.fromEntries(formData.entries()));
    const v = validateSchema(formData, equipmentSchema);
    if (!v.success) return v;
    //const valid = equipmentSchema.parse(formData);
    //console.log(valid);
    //if (!valid.success) {
    //return valid.error;
    //}
    const { id, forkedFrom, userId, ...data } = v.data; // equipmentSchema.parse(formData);
    const r = mapUnits(data, prefs, equipmentProfileMapping, "to");
    //console.log(r);
    const res = await prisma.equipmentProfile.create({
      data: {
        ...r,
        slug: slugify(data.name, { lower: true }),
        origin: {
          connect: { id: forkedFrom ?? undefined },
        },
        owner: {
          connect: { id: userId ?? "" },
        },
      },
      include: {
        origin: true,
        owner: true,
      },
    });
    redirect(`/profiles/equipment/${res.slug}`);
  } catch (e) {
    const f = e as ZodError;
    //console.log(f);
    return {
      //errors: validatedFields.error.flatten().fieldErrors
      errors: (f.issues || []).reduce((acc, issue) => {
        acc[issue.path.join(".")] = issue;
        return acc;
      }, {} as Record<string, ZodIssue>),
    };
  }
};
export const updateEquipmentProfile = async (
  prefs: Partial<Omit<UnitPreferences, "id">>,
  prevState: any,
  formData: FormData
) => {
  const v = validateSchema(formData, equipmentSchema);
  if (!v.success) return v;
  const {
    data: { id, ...data },
  } = v; // equipmentSchema.parse(formData);
  console.log(prefs, data);
  const {
    id: _id,
    forkedFrom,
    userId,
    ...r
  } = mapUnits(
    data as ExtendedEquipmentProfile,
    prefs,
    equipmentProfileMapping,
    "to"
  );
  console.log(r);
  const res = await prisma.equipmentProfile.update({
    where: { id },
    data: {
      ...r,
      slug: slugify(data.name, { lower: true }),
      origin: {
        connect: { id: forkedFrom ?? undefined },
      },
      owner: {
        connect: { id: userId ?? "" },
      },
    },
    include: {
      origin: true,
      owner: true,
    },
  });
  redirect(`/profiles/equipment/${res.slug}`);
};
