"use server";

import { prisma } from "@/lib/client";
import { cache } from "react";
export const getHop = cache(async (slug: string) => {
  const hop = await prisma.hop.findFirst({
    where: {
      slug,
    },
    //include: {},
  });
  return hop;
});

export const getHops = cache(async () => {
  const hops = await prisma.hop.findMany();
  return hops;
});

export const getHopOptions = async () => {
  const hops = await getHops();
  const options = hops.reduce(
    (acc, hop) => {
      acc[hop.id] = hop.name;
      return acc;
    },
    {} as Record<number, string>
  );
  return options;
};
