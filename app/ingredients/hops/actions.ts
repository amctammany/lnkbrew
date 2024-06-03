"use server";
import { HopUsage } from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import slugify from "slugify";

const schema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  country: zfd.text(z.string().optional()),
  usage: z.nativeEnum(HopUsage).optional().default(HopUsage.dual),
  alpha: zfd.numeric(z.number().min(0).max(40).optional()),
  beta: zfd.numeric(z.number().min(0).max(40).optional()),
  caryophyllene: zfd.numeric(z.number().min(0).max(30).optional()),
  cohumulone: zfd.numeric(z.number().min(0).max(70).optional()),
  farnesene: zfd.numeric(z.number().min(0).max(50).optional()),
  humulene: zfd.numeric(z.number().min(0).max(50).optional()),
  myrcene: zfd.numeric(z.number().min(0).max(80).optional()),
  totalOil: zfd.numeric(z.number().min(0).max(40).optional()),
  flavor: zfd.text(z.string().optional()),
  purpose: zfd.text(z.string().optional()),
  notes: zfd.text(z.string().optional()),
});

export const createHop = async (formData: FormData) => {
  const data = schema.parse(formData);
  const res = await prisma.hop.create({
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/ingredients/hops/${res.slug}`);
};
export const updateHop = async (formData: FormData) => {
  const data = schema.parse(formData);
  const res = await prisma.hop.update({
    where: { id: data.id },
    data,
  });
  redirect(`/ingredients/hops/${res.slug}`);
};
