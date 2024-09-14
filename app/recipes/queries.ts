import { Prisma, Recipe } from "@prisma/client";
import { prisma } from "@/lib/client";
import { cache } from "react";
import { ExtendedRecipe } from "@/types/Recipe";

export const getExtendedRecipe = cache(
  async (where: Prisma.RecipeWhereInput) =>
    prisma.recipe.findFirst({
      include: {
        owner: {
          select: { id: true, name: true, username: true, email: true },
        },
        style: true,
        //hops: { include: { hop: true } },
        //yeasts: { include: { yeast: true } },
        //equipment: true,
        //water: true,
        //mash: { include: { steps: true } },
        //otherIngredients: { include: { otherIngredient: true } },
        //fermentables: { include: { fermentable: true } },
        //style: { select: { name: true, identifier: true, overall: true } },
      },
      where,
    }) as unknown as ExtendedRecipe
);

export const getRecipe = cache(async (username: string, slug: string) =>
  prisma.recipe.findFirst({
    where: {
      ownerUsername: { equals: username },
      slug: { equals: slug },
    },
    include: { owner: true },
  })
);

export const getRecipeById = cache(async (id: string) =>
  prisma.recipe.findFirst({
    where: {
      id,
    },
    include: { owner: true },
  })
);
export const getRecipes = cache(
  async (where?: Prisma.RecipeWhereInput) =>
    prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        //styleIdentifer: true,
        ownerUsername: true,
        ownerEmail: true,
        owner: true,
      },
      where,
    }) as unknown as Recipe[]
);
