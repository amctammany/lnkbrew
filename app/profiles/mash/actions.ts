"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const mashSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  forkedFrom: zfd.numeric(z.number().optional()),
  userId: zfd.text(z.string().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  steps: z
    .array(
      z.object({
        name: zfd.text(z.string().optional()),
        temperature: zfd.numeric(z.number().min(0).max(212)),
        time: zfd.numeric(z.number().min(0)),
        rampTime: zfd.numeric(z.number().min(0).default(0)),
      })
    )
    .optional()
    .default([]),
});
export const createMashProfile = async (formData: FormData) => {
  const { id, forkedFrom, steps, userId, ...data } = mashSchema.parse(formData);
  const origin = forkedFrom
    ? {
        connect: { id: forkedFrom ?? undefined },
      }
    : undefined;
  const mapSteps = steps.map(({ name, temperature, time, rampTime }) => ({
    time,
    temperature,
    rampTime,
    name,
  }));
  const res = await prisma.mashProfile.create({
    data: {
      ...data,
      origin,
      slug: slugify(data.name, { lower: true }),
      steps: {
        createMany: { data: mapSteps },
      },
      owner: {
        connect: { id: userId ?? "" },
      },
    },
    include: { steps: true, owner: true, origin: true },
  });
  redirect(`/profiles/mash/${res.slug}`);
};
export const updateMashProfile = async (formData: FormData) => {
  const { steps, id, forkedFrom, userId, ...data } = mashSchema.parse(formData);
  const origin = forkedFrom
    ? {
        connect: { id: forkedFrom },
      }
    : undefined;
  const mapSteps = steps.map(({ name, temperature, time, rampTime }) => ({
    time,
    temperature,
    rampTime,
    name,
  }));

  const res = await prisma.mashProfile.update({
    where: { id: id },
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
      steps: {
        deleteMany: {
          mashProfileId: id,
        },
        createMany: { data: mapSteps ?? [] },
      },
      owner: {
        connect: { id: userId },
      },
      origin,
    },
    include: { steps: true, owner: true, origin: true },
  });
  redirect(`/profiles/mash/${res.slug}`);
};
