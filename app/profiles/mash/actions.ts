"use server";
import {
  classConverters,
  getConverters,
  UnitTypes,
} from "@/lib/amountConversions";
import { prisma } from "@/lib/client";
import { validateSchema } from "@/lib/validateSchema";
import { TimeUnit, UnitPreferences } from "@prisma/client";
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
  steps: zfd
    .repeatableOfType(
      z.object({
        id: zfd.numeric(z.number().optional()),
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
export const updateMashProfile = async (
  prefs: UnitPreferences,
  formData: FormData
) => {
  const { steps, id, forkedFrom, userId, errors, ...data } = validateSchema(
    formData,
    mashSchema
  );
  if (errors) return errors;
  const origin = forkedFrom
    ? {
        connect: { id: forkedFrom },
      }
    : undefined;
  //const f= classConverters['color'].
  const mapSteps = (steps ?? []).map(
    ({ name, temperature, time, rampTime }) => ({
      time: classConverters["time"][prefs.time as UnitTypes].from(time), //,(time),
      temperature:
        classConverters["temperature"][prefs.temperature as UnitTypes].from(
          temperature
        ), //,(time),
      rampTime: classConverters["time"][prefs.time as UnitTypes].from(rampTime), //,(time),
      name,
    })
  );
  const owner = userId
    ? {
        connect: { id: userId },
      }
    : undefined;
  const res = await prisma.mashProfile.update({
    where: { id },
    data: {
      ...data,
      slug: slugify(data.name || "", { lower: true }),
      steps: {
        deleteMany: {
          mashProfileId: id,
        },
        createMany: { data: mapSteps ?? [] },
      },
      owner,
      origin,
    },
    include: { steps: true, owner: true, origin: true },
  });
  redirect(`/profiles/mash/${res.slug}`);
};
