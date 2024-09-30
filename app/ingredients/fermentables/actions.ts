"use server";
//import { FermentableUsage } from "@prisma/client";
import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  country: zfd.text(z.string().optional()),
  notes: zfd.text(z.string().optional()),
  stability: zfd.text(z.string().optional()),
  power: zfd.numeric(z.number().min(0).max(120).optional()),
  maxUsage: zfd.numeric(z.number().min(0).max(100).optional()),
  color: zfd.numeric(z.number().min(0).max(600).optional()),
  potential: zfd.numeric(z.number().min(0).max(2).optional()),
});
export const createFermentable = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, schema);
  if (!valid.success) return valid;
  const { data } = valid;
  const res = await prisma.fermentable.create({
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/ingredients/fermentables/${res.slug}`);
};

export const updateFermentable = async (prev: any, formData: FormData) => {
  const valid = validateSchema(formData, schema);
  if (!valid.success) return valid;
  const { data } = valid;
  const res = await prisma.fermentable.update({
    where: { id: data.id },
    data,
  });
  redirect(`/ingredients/fermentables/${res.slug}`);
};
