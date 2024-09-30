"use server";
import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { WaterProfileInput } from "@/types/Profile";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z, ZodIssue } from "zod";
import { zfd } from "zod-form-data";

const waterSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  name: zfd.text(),
  userId: zfd.text(z.string().optional()),
  forkedFrom: zfd.numeric(z.number().optional()),

  description: zfd.text(z.string().optional()),
  calcium: zfd.numeric(z.number().min(0).default(0)),
  magnesium: zfd.numeric(z.number().min(0).default(0)),
  sodium: zfd.numeric(z.number().min(0).default(0)),
  chloride: zfd.numeric(z.number().min(0).default(0)),
  sulfate: zfd.numeric(z.number().min(0).default(0)),
  bicarbonate: zfd.numeric(z.number().min(0).default(0)),
});
export const createWaterProfile = async (prev: any, formData: FormData) => {
  const valid = await waterSchema.safeParseAsync(formData);
  if (!valid.success)
    return {
      success: false,
      errors: valid.error.issues?.reduce((acc, issue) => {
        acc[issue.path.join(".")] = issue;
        return acc;
      }, {} as Record<string, ZodIssue>),
    };

  const { id, userId, forkedFrom, ...data } = valid.data;
  const res = await prisma.waterProfile.create({
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
      owner: {
        connect: { id: userId ?? undefined },
      },
      origin: {
        connect: { id: forkedFrom ?? undefined },
      },
    },
    //include: {
    //origin: true,
    //owner: true,
    //},
  });
  redirect(`/profiles/water/${res.slug}`);
};
export const updateWaterProfile = async (prev: any, formData: FormData) => {
  //console.log(prev, formData.entries());
  const valid = validateSchema(formData, waterSchema);

  if (valid.errors) return valid;
  const { id, userId, forkedFrom, ...rest } =
    valid.data || ({} as WaterProfileInput);
  const res = await prisma.waterProfile.update({
    where: { id },
    data: {
      ...rest,
      slug: slugify(rest.name ?? "", { lower: true }),
      owner: {
        connect: { id: userId ?? undefined },
      },
      origin: {
        connect: { id: forkedFrom ?? undefined },
      },
    },
    //include: {
    //origin: true,
    //owner: true,
    //},
  });
  return { success: true, data: res };

  //redirect(`/profiles/water/${res.slug}`);
};
