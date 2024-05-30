"use server";

import { prisma } from "@/lib/client";
import { cache } from "react";
export const getFermentable = cache(async (slug: string) => {
  const fermentable = await prisma.fermentable.findFirst({
    where: {
      slug,
    },
    //include: {},
  });
  return fermentable;
});

export const getFermentables = cache(async () => {
  const fermentables = await prisma.fermentable.findMany();
  return fermentables;
});

export const getFermentableOptions = async () => {
  const fermentables = await getFermentables();
  const options = fermentables.reduce(
    (acc, fermentable) => {
      acc[fermentable.id] = fermentable.name;
      return acc;
    },
    {} as Record<string, string>
  );
  return options;
};
