"use server";
import { Hop, HopUsage } from "@prisma/client";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import slugify from "slugify";
import { validateSchema } from "@/lib/validateSchema";
import { ExtendedHop, HopInput } from "@/types/Ingredient";
import { FieldValues } from "react-hook-form";

const schema = zfd.formData({
  id: zfd.text(z.string().optional()),
  name: zfd.text(z.string()),
  description: zfd.text(z.string().optional()),
  country: zfd.text(z.string().optional()),
  usage: z.nativeEnum(HopUsage).optional().default(HopUsage.dual),
  alphaRange: zfd.numeric(z.number()).array().length(2),
  alpha: zfd.numeric(z.number().min(0).max(40).optional()),
  betaRange: zfd.numeric().array().length(2),
  beta: zfd.numeric(z.number().min(0).max(40).optional()),
  caryophyllene: zfd.numeric(z.number().min(0).max(30).optional()),
  caryophylleneRange: zfd.numeric().array().length(2),
  cohumulone: zfd.numeric(z.number().min(0).max(70).optional()),
  cohumuloneRange: zfd.numeric().array().length(2),
  farnesene: zfd.numeric(z.number().min(0).max(50).optional()),
  farneseneRange: zfd.numeric().array().length(2),
  humulene: zfd.numeric(z.number().min(0).max(50).optional()),
  humuleneRange: zfd.numeric().array().length(2),
  myrcene: zfd.numeric(z.number().min(0).max(80).optional()),
  myrceneRange: zfd.numeric().array().length(2),
  totalOil: zfd.numeric(z.number().min(0).max(40).optional()),
  totalOilRange: zfd.numeric().array().length(2),
  flavor: zfd.text(z.string().optional()),
  purpose: zfd.text(z.string().optional()),
  notes: zfd.text(z.string().optional()),
});
type T = z.infer<typeof schema>;
function parseHop(data: T) {
  //if (!data) return null;
  const {
    alphaRange,
    betaRange,
    caryophylleneRange,
    cohumuloneRange,
    farneseneRange,
    myrceneRange,
    totalOilRange,
    humuleneRange,
    ...rest
  } = data || { name: "" };
  return {
    ...rest,
    alphaLow: alphaRange?.[0],
    alphaHigh: alphaRange?.[1],
    betaLow: betaRange?.[0],
    betaHigh: betaRange?.[1],
    caryophylleneLow: caryophylleneRange?.[0],
    caryophylleneHigh: caryophylleneRange?.[1],
    farneseneLow: farneseneRange?.[0],
    farneseneHigh: farneseneRange?.[1],
    humuleneLow: humuleneRange?.[0],
    humuleneHigh: humuleneRange?.[1],
    cohumuloneLow: cohumuloneRange?.[0],
    cohumuloneHigh: cohumuloneRange?.[1],
    totalOilLow: totalOilRange?.[0],
    totalOilHigh: totalOilRange?.[1],
    myrceneLow: myrceneRange?.[0],
    myrceneHigh: myrceneRange?.[1],
    slug: slugify(rest.name, { lower: true }),
  } as any;
}
export const createHop = async (formData: FormData) => {
  const valid = validateSchema(formData, schema);
  if (!valid.success) return valid;
  //const f = validateSchema(formData, schema);
  //const d = schema.parse(formData);
  const hop = valid.data;
  const data = parseHop(hop);
  const res = await prisma.hop.create({
    data,
  });
  redirect(`/ingredients/hops/${res.slug}`);
};
export const updateHop = async (formData: FormData) => {
  const valid = validateSchema(formData, schema);
  if (!valid.success) return valid;
  const hop = valid.data;
  const data = parseHop(hop);
  const res = await prisma.hop.update({
    where: { id: data.id },
    data,
  });
  redirect(`/ingredients/hops/${res.slug}`);
};
