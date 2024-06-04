"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const mashSchema = zfd.formData({
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
export const createMashProfile = async (formData: FormData) => {
  const data = mashSchema.parse(formData);
  const res = await prisma.mashProfile.create({
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/profiles/mash/${res.slug}`);
};
export const updateMashProfile = async (formData: FormData) => {
  const data = mashSchema.parse(formData);
  const res = await prisma.mashProfile.update({
    where: { id: data.id },
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/profiles/mash/${res.slug}`);
};
