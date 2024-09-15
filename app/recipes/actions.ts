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
import {
  HopIngredientUsage,
  MassUnit,
  TimeUnit,
  FermentableIngredientUsage,
} from "@prisma/client";
import { getRecipeUrl } from "@/lib/utils";

const recipeSchema = zfd.formData({
  //id: zfd.numeric(z.number()),
  id: zfd.text(),
  name: zfd.text(z.string().optional()),
  description: zfd.text(z.string().optional()),
  mashProfileId: zfd.numeric(z.number().optional()),
  waterProfileId: zfd.numeric(z.number().optional()),
  styleId: zfd.numeric(z.number().optional()),
  //styleIdentifer: zfd.text(z.string().optional()),
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

const removeIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number()),
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
    styleId,
    ...data
  } = validateSchema(formData, recipeSchema);
  //recipeSchema.parse(formData);
  //console.log({ id, styleIdentifer, data });
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
        ? { equipmentProfile: { connect: { id: equipmentProfileId } } }
        : {}),
      ...(styleId
        ? {
            style: {
              connect: {
                id: styleId,
              },
            },
          }
        : {}),
    },
  });
  //console.log(getObjectDifferences(old, res));
  //await updateRecipeVitals(res.id);
  redirect(getRecipeUrl(res.id));
}
const hopIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.text(z.string()),
  hopId: zfd.text(z.string()),
  amount: zfd.numeric(z.number().gte(0).default(1)),
  alpha: zfd.numeric(z.number().min(0).optional()),
  usage: z.nativeEnum(HopIngredientUsage).default(HopIngredientUsage.Boil),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.Oz),
  duration: zfd.numeric(z.number().min(0).default(60)),
  durationType: z.nativeEnum(TimeUnit).default(TimeUnit.min),
});
export async function addHopIngredientToRecipe(formData: FormData) {
  //const data = hopIngredientSchema.parse(formData);
  const { errors, ...data } = validateSchema(formData, hopIngredientSchema);
  if (errors) return Promise.resolve({ errors });
  const res = await prisma.hopIngredient.create({
    data,
    include: {
      recipe: true,
    },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateHopIngredient(formData: FormData) {
  const { errors, ...data } = validateSchema(formData, hopIngredientSchema);
  //if (errors) return { errors };
  if (errors) return Promise.resolve({ errors });
  //const data = hopIngredientSchema.parse(formData);
  const res = await prisma.hopIngredient.update({
    where: { id: data.id },
    data,
    include: { recipe: true },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function removeHopIngredient(formData: FormData) {
  const { id } = removeIngredientSchema.parse(formData);
  const res = await prisma.hopIngredient.delete({
    where: { id },
    include: { recipe: true },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}

const fermentableIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  recipeId: zfd.text(z.string()),
  fermentableId: zfd.text(z.string()),
  usage: z
    .nativeEnum(FermentableIngredientUsage)
    .default(FermentableIngredientUsage.Mash),
  amount: zfd.numeric(z.number().gt(0).default(1)),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.Lb),
});
export async function addFermentableIngredientToRecipe(formData: FormData) {
  const { errors, ...data } = validateSchema(
    formData,
    fermentableIngredientSchema
  );
  if (errors) return Promise.resolve({ errors });
  const res = await prisma.fermentableIngredient.create({
    data,
    include: { recipe: true },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateFermentableIngredient(formData: FormData) {
  const { errors, ...data } = validateSchema(
    formData,
    fermentableIngredientSchema
  );
  if (errors) return Promise.resolve({ errors });
  const res = await prisma.fermentableIngredient.update({
    where: { id: data.id },
    include: { recipe: true },
    data,
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function removeFermentableIngredient(formData: FormData) {
  const { id } = removeIngredientSchema.parse(formData);
  const res = await prisma.fermentableIngredient.delete({
    where: { id },
    include: { recipe: true },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
