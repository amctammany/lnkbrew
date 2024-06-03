"use server";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { z } from "zod";

const schema = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  aroma: zfd.text(z.string().optional()),
  appearance: zfd.text(z.string().optional()),
  flavor: zfd.text(z.string().optional()),
  mouthfeel: zfd.text(z.string().optional()),
  history: zfd.text(z.string().optional()),
  ingredients: zfd.text(z.string().optional()),
  comments: zfd.text(z.string().optional()),
  comparison: zfd.text(z.string().optional()),
  examples: zfd.text(z.string().optional()),
});
export async function update(formData: FormData) {
  const data = schema.parse(formData);
  const res = await prisma.style.update({
    where: {
      id: data.id,
    },
    data,
  });
  redirect(`/styles/${res.identifier}`);
}
