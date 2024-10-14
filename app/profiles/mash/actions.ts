"use server";
import {
  classConverters,
  getConverters,
  UnitTypes,
} from "@/lib/amountConversions";
import { prisma } from "@/lib/client";
import { mapUnits, mashProfileStepMapping } from "@/lib/mapUnits";
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
export const createMashProfile = async (
  prefs: Omit<UnitPreferences, "id">,
  pref: any,
  formData: FormData
) => {
  const valid = validateSchema(formData, mashSchema);
  if (!valid.success) return valid;
  const { id, forkedFrom, userId, ...data } = valid.data;
  const origin = forkedFrom
    ? {
        connect: { id: forkedFrom ?? undefined },
      }
    : undefined;

  const steps = data.steps.map((step) =>
    mapUnits(step, prefs, mashProfileStepMapping)
  );
  const res = await prisma.mashProfile.create({
    data: {
      ...data,
      origin,
      slug: slugify(data.name, { lower: true }),
      steps: {
        createMany: { data: steps },
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
  prefs: Omit<UnitPreferences, "id">,
  prev: any,
  formData: FormData
) => {
  const valid = validateSchema(formData, mashSchema);
  console.log(valid);
  if (!valid.success) return valid;
  const { steps, id, forkedFrom, userId, ...data } = valid.data;
  const origin = forkedFrom
    ? {
        connect: { id: forkedFrom },
      }
    : undefined;
  //const f= classConverters['color'].
  const sps = steps.map((step) =>
    mapUnits(step, prefs, mashProfileStepMapping, "to")
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
        createMany: { data: sps ?? [] },
      },
      owner,
      origin,
    },
    include: {
      //steps: {
      //select: { temperature: true, time: true, name: true, rampTime: true },
      //},
    },
  });
  redirect(`/profiles/mash/${res.slug}`);
};
