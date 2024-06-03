"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";
const equipmentSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  boilTime: zfd.numeric(z.number().min(0).optional()),
  batchVolume: zfd.numeric(z.number().min(0).optional()),
  boilOffRate: zfd.numeric(z.number().min(0).optional()),
  trubLoss: zfd.numeric(z.number().min(0).optional()),
  mashLoss: zfd.numeric(z.number().min(0).optional()),
  fermenterLoss: zfd.numeric(z.number().min(0).optional()),
  mashEfficiency: zfd.numeric(z.number().min(0).max(1).optional()),
  brewEfficiency: zfd.numeric(z.number().min(0).max(1).optional()),
});

export const createEquipmentProfile = async (formData: FormData) => {
  const data = equipmentSchema.parse(formData);
  const res = await prisma.equipmentProfile.create({
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/profiles/equipment/${res.slug}`);
};
export const updateEquipmentProfile = async (formData: FormData) => {
  const data = equipmentSchema.parse(formData);
  const res = await prisma.equipmentProfile.update({
    where: { id: data.id },
    data: {
      ...data,
      slug: slugify(data.name, { lower: true }),
    },
  });
  redirect(`/profiles/equipment/${res.slug}`);
};
