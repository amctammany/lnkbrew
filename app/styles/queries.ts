"use server";

import { prisma } from "@/lib/client";
import { cache } from "react";

export const getStyle = cache(async (identifier: string) => {
  const style = await prisma.style.findFirst({
    where: { identifier },
  });
  return style;
});
export const getStyles = cache(async () => {
  const styles = await prisma.style.findMany({
    orderBy: [{ subcategoryId: "asc" }, { identifier: "asc" }],
  });
  return styles;
});

export const getStyleOptions = async () => {
  const styles = await getStyles();
  const options = styles.reduce(
    (acc, style) => {
      acc[style.identifier] = `${style.identifier}: ${style.name}`;
      return acc;
    },
    {} as Record<string, string>
  );
  return options;
};
