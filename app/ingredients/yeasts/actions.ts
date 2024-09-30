"use server";
import { YeastFlocculation, YeastForm, YeastType } from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import slugify from "slugify";
import { validateSchema } from "@/lib/validateSchema";
import { FieldValues } from "react-hook-form";
import { YeastInput } from "@/types/Ingredient";

const schema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  manufacturer: zfd.text(z.string().optional()),
  type: z.nativeEnum(YeastType).optional().default(YeastType.Ale),
  flocculation: z.nativeEnum(YeastFlocculation).optional(),
  form: z.nativeEnum(YeastForm).optional(),
  attenuationRange: zfd
    .numeric(z.number().min(0).max(1).optional())
    .array()
    .length(2),
  attenuationLow: zfd.numeric(z.number().min(0).max(1).optional()),
  attenuationHigh: zfd.numeric(z.number().min(0).max(1).optional()),
  attenuation: zfd.numeric(z.number().min(0).max(1).optional()),
  tempRange: zfd.numeric(z.number()).array().length(2),
  tempLow: zfd.numeric(z.number().optional()),
  tempHigh: zfd.numeric(z.number().optional()),
  usage: zfd.text(z.string().optional()),
  notes: zfd.text(z.string().optional()),
});
type YeastSchema = z.infer<typeof schema>;
function parseYeast(data: YeastSchema) {
  const { tempRange, attenuationRange, ...rest } = data;
  return {
    ...rest,
    tempLow: tempRange?.[0],
    tempHigh: tempRange?.[1],
    attenuationLow: attenuationRange?.[0],
    attenuationHigh: attenuationRange?.[1],
    slug: slugify(rest.name, { lower: true }),
  };
}
export const createYeast = async (formData: FormData) => {
  const valid = validateSchema<YeastInput>(formData, schema);
  if (!valid.success) return Promise.resolve(valid);
  const data = parseYeast(valid.data);
  const res = await prisma.yeast.create({
    data,
  });
  redirect(`/ingredients/yeasts/${res.slug}`);
};

export const updateYeast = async (formData: FormData) => {
  const valid = validateSchema(formData, schema);
  if (!valid.success) return Promise.resolve(valid);
  const data = parseYeast(valid.data);
  const res = await prisma.yeast.update({
    where: { id: data.id },
    data,
  });
  redirect(`/ingredients/yeasts/${res.slug}`);
};
