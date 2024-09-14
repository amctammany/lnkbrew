"use server";
import { zfd } from "zod-form-data";
//import {
//FermentableIngredientUsage,
//HopIngredientUsage,
//IngredientUsage,
//MassUnit,
//TimeUnit,
//YeastAmountType,
//} from "@prisma/client";
import { prisma } from "@/lib/client";
//import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import slugify from "slugify";
//import { ExtendedRecipe } from "./types";
//import { getObjectDifferences } from "@/lib/utils";
import { validateSchema } from "@/lib/validateSchema";

const recipeSchema = zfd.formData({
  //id: zfd.numeric(z.number()),
  id: zfd.text(),
  name: zfd.text(z.string().optional()),
  description: zfd.text(z.string().optional()),
  mashProfileId: zfd.numeric(z.number().optional()),
  waterProfileId: zfd.numeric(z.number().optional()),
  styleIdentifer: zfd.text(z.string().optional()),
  equipmentProfileId: zfd.numeric(z.number().optional()),
  boilTime: zfd.numeric(z.number().min(0).optional()),
  batchVolume: zfd.numeric(z.number().min(0).optional()),
  mashEfficiency: zfd.numeric(z.number().min(0).optional()),
  brewEfficiency: zfd.numeric(z.number().min(0).optional()),
  calcium: zfd.numeric(z.number().optional()),
  magnesium: zfd.numeric(z.number().optional()),
  sodium: zfd.numeric(z.number().optional()),
  chloride: zfd.numeric(z.number().optional()),
  sulfate: zfd.numeric(z.number().optional()),
  bicarbonate: zfd.numeric(z.number().optional()),
});
const removeSchema = zfd.formData({
  id: zfd.text(),
});

export async function removeRecipe(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  const res = await prisma.recipe.delete({
    where: { id },
  });
  redirect("/recipes");
}

export async function updateRecipe(formData: FormData) {
  const {
    id,
    mashProfileId,
    waterProfileId,
    equipmentProfileId,
    styleIdentifer,
    ...data
  } = validateSchema(formData, recipeSchema);
  //recipeSchema.parse(formData);
  console.log({ id, styleIdentifer, data });
  const old = await prisma.recipe.findFirst({
    where: {
      id,
    },
  });
  const res = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      ...data,
      ...(data.name
        ? { name: data.name, slug: slugify(data.name, { lower: true }) }
        : {}),
      ...(mashProfileId ? { mash: { connect: { id: mashProfileId } } } : {}),
      ...(waterProfileId ? { water: { connect: { id: waterProfileId } } } : {}),
      ...(equipmentProfileId
        ? { equipment: { connect: { id: equipmentProfileId } } }
        : {}),
      ...(styleIdentifer
        ? {
            style: {
              connect: {
                identifier: styleIdentifer,
              },
            },
          }
        : {}),
    },
  });
  //console.log(getObjectDifferences(old, res));
  //await updateRecipeVitals(res.id);
  redirect(`/recipes/${res.ownerUsername}/${res.slug}/edit`);
}
