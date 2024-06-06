"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
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
export const createWaterProfile = async (formData: FormData) => {
  const { id, userId, forkedFrom, ...data } = waterSchema.parse(formData);
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
    include: {
      origin: true,
      owner: true,
    },
  });
  redirect(`/profiles/water/${res.slug}`);
};
export const updateWaterProfile = async (formData: FormData) => {
  const { id, userId, forkedFrom, ...data } = waterSchema.parse(formData);
  const res = await prisma.waterProfile.update({
    where: { id },
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
    include: {
      origin: true,
      owner: true,
    },
  });
  redirect(`/profiles/water/${res.slug}`);
};
