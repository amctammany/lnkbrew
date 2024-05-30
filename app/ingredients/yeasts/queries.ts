"use server";

import { prisma } from "@/lib/client";
import { cache } from "react";
export const getYeast = cache(async (slug: string) => {
  const yeast = await prisma.yeast.findFirst({
    where: { slug },
  });
  return yeast;
});

export const getYeasts = cache(async () => {
  const yeasts = await prisma.yeast.findMany();
  return yeasts;
});

export const getYeastOptions = async () => {
  const yeasts = await getYeasts();
  const options = yeasts.reduce(
    (acc, yeast) => {
      acc[yeast.id] = yeast.name;
      return acc;
    },
    {} as Record<string, string>
  );
  return options;
};
