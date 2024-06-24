"use server";
import { prisma } from "@/lib/client";
import { SchemaFieldError, validateSchema } from "@/lib/validateSchema";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { ZodError, ZodIssue, z } from "zod";
import { zfd } from "zod-form-data";
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
  mashEfficiency: zfd.numeric(z.number().min(0).max(1).optional()),
  brewEfficiency: zfd.numeric(z.number().min(0).max(1).optional()),
});

export const createEquipmentProfile = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const v = validateSchema(formData, equipmentSchema);
    if (v.errors) return v;
    //const valid = equipmentSchema.parse(formData);
    //console.log(valid);
    //if (!valid.success) {
    //return valid.error;
    //}
    const { id, forkedFrom, userId, ...data } = v; // equipmentSchema.parse(formData);
    const res = await prisma.equipmentProfile.create({
      data: {
        ...data,
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
    return {
      //errors: validatedFields.error.flatten().fieldErrors
      errors: f.issues.reduce(
        (acc, issue) => {
          acc[issue.path.join(".")] = issue;
          return acc;
        },
        {} as Record<string, ZodIssue>
      ),
    };
  }
};
export const updateEquipmentProfile = async (
  prevState: any,
  formData: FormData
) => {
  const v = validateSchema(formData, equipmentSchema);
  if (v.errors) return v;
  const { id, forkedFrom, userId, ...data } = v; // equipmentSchema.parse(formData);
  const res = await prisma.equipmentProfile.update({
    where: { id },
    data: {
      ...data,
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
