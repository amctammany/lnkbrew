"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const mashSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  steps: z.array(
    z.object({
      name: zfd.text(z.string().optional()),
      temperature: zfd.numeric(z.number().min(0).max(212)),
      time: zfd.numeric(z.number().min(0)),
      rampTime: zfd.numeric(z.number().min(0).default(0)),
    })
  ),
});
export const createMashProfile = async (formData: FormData) => {
  const { steps, ...data } = mashSchema.parse(formData);
  const res = await prisma.mashProfile.create({
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
      steps: {
        createMany: { data: steps },
      },
    },
    include: { steps: true },
  });
  redirect(`/profiles/mash/${res.slug}`);
};
export const updateMashProfile = async (formData: FormData) => {
  const { steps, ...data } = mashSchema.parse(formData);
  const res = await prisma.mashProfile.update({
    where: { id: data.id },
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
      steps: {
        deleteMany: {
          mashProfileId: data.id,
        },
        createMany: { data: steps },
      },
    },
    include: { steps: true },
  });
  redirect(`/profiles/mash/${res.slug}`);
};
