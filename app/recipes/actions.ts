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
  HopIngredientType,
  Recipe,
  HopIngredient,
  UnitPreferences,
  FermentableIngredient,
} from "@prisma/client";
import { getRecipeUrl } from "@/lib/utils";
import { ID } from "@/types/App";
import { UnitPrefs } from "@/types/User";
import {
  fermentableIngredientMapping,
  hopIngredientMapping,
  mapUnits,
} from "@/lib/mapUnits";

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
  mashEfficiency: zfd.numeric(
    z.number().min(0).max(100).optional().default(65)
  ),
  brewEfficiency: zfd.numeric(
    z.number().min(0).max(100).optional().default(60)
  ),
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
  recipeId: zfd.text(z.string()),
});
export async function removeRecipe(formData: FormData) {
  const { id } = removeSchema.parse(formData);
  const res = await prisma.recipe.delete({
    where: { id },
  });
  redirect("/recipes");
}

export async function updateRecipe(formData: FormData) {
  const v = validateSchema(formData, recipeSchema);
  if (!v.success) return v;
  const {
    data: {
      id,
      //mashEfficiency,
      //brewEfficiency,
      mashProfileId,
      waterProfileId,
      equipmentProfileId,
      styleId,
      ...data
    },
  } = v;
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
      //mashEfficiency: mashEfficiency / 100,
      //brewEfficiency: brewEfficiency / 100,
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
  id: zfd.numeric(z.number()),
  recipeId: zfd.text(z.string()),
  hopId: zfd.text(z.string()),
  amount: zfd.numeric(z.number().gte(0).default(1)),
  alpha: zfd.numeric(z.number().min(0).optional()),
  temperature: zfd.numeric(z.number().min(0).optional()),
  usage: z.nativeEnum(HopIngredientUsage).default(HopIngredientUsage.Boil),
  type: z.nativeEnum(HopIngredientType).default(HopIngredientType.Pellet),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.Oz),
  duration: zfd.numeric(z.number().min(0).default(60)),
  durationType: z.nativeEnum(TimeUnit).default(TimeUnit.min),
});
export async function addHopIngredientToRecipe(
  prefs: Partial<Omit<UnitPreferences, "id">>,
  prevState: any,
  formData: FormData
) {
  //const data = hopIngredientSchema.parse(formData);
  const valid = validateSchema(formData, hopIngredientSchema);

  if (!valid.success) return Promise.resolve(valid);
  const {
    data: { id, ...data },
  } = valid; // equipmentSchema.parse(formData);

  const {
    id: _id,
    //forkedFrom,
    //userId,
    ...r
  } = mapUnits(data as HopIngredient, prefs, hopIngredientMapping, "to");

  const res = await prisma.hopIngredient.create({
    data: r,
    include: {
      recipe: true,
    },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateHopIngredient(
  prefs: Partial<Omit<UnitPreferences, "id">>,
  prevState: any,
  formData: FormData
) {
  const valid = validateSchema(formData, hopIngredientSchema);
  if (!valid.success) return Promise.resolve(valid);

  const {
    data: { id, recipeId, ...data },
  } = valid; // equipmentSchema.parse(formData);

  const {
    id: _id,
    //forkedFrom,
    //userId,
    ...r
  } = mapUnits(data as HopIngredient, prefs, hopIngredientMapping, "to");

  //const data = hopIngredientSchema.parse(formData);
  const res = await prisma.hopIngredient.update({
    where: { recipeId_id: { id, recipeId } },
    data: r,
    include: { recipe: true },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function removeHopIngredientById(recipeId: string, id: number) {
  //const { id } = removeIngredientSchema.parse(formData);
  const res = await prisma.hopIngredient.delete({
    where: { recipeId_id: { id, recipeId } },
    //include: { recipe: true },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}

export async function removeHopIngredient(formData: FormData) {
  const { id, recipeId } = removeIngredientSchema.parse(formData);
  const res = await prisma.hopIngredient.delete({
    where: { recipeId_id: { id, recipeId } },
    include: { recipe: true },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}

const fermentableIngredientSchema = zfd.formData({
  id: zfd.numeric(z.number()),
  recipeId: zfd.text(z.string()),
  fermentableId: zfd.text(z.string()),
  usage: z
    .nativeEnum(FermentableIngredientUsage)
    .default(FermentableIngredientUsage.Mash),
  amount: zfd.numeric(z.number().gt(0).default(1)),
  amountType: z.nativeEnum(MassUnit).default(MassUnit.Lb),
  color: zfd.numeric(z.number().gt(0).default(1)),
  potential: zfd.numeric(z.number().gt(0).default(1)),
});
export async function addFermentableIngredientToRecipe(
  prefs: Partial<Omit<UnitPreferences, "id">>,
  prevState: any,
  formData: FormData
) {
  const valid = validateSchema(formData, fermentableIngredientSchema);

  if (!valid.success) return Promise.resolve(valid);
  const {
    data: { id, ...data },
  } = valid; // equipmentSchema.parse(formData);

  const {
    id: _id,
    //forkedFrom,
    //userId,
    ...r
  } = mapUnits(
    data as FermentableIngredient,
    prefs,
    fermentableIngredientMapping,
    "to"
  );

  const res = await prisma.fermentableIngredient.create({
    data: r,
    include: { recipe: true },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function updateFermentableIngredient(
  prefs: Partial<Omit<UnitPreferences, "id">>,
  prevState: any,
  formData: FormData
) {
  const valid = validateSchema(formData, fermentableIngredientSchema);
  if (!valid.success) return Promise.resolve(valid);
  const {
    data: { id, ...data },
  } = valid; // equipmentSchema.parse(formData);

  const {
    id: _id,
    //forkedFrom,
    //userId,
    recipeId,
    ...r
  } = mapUnits(
    data as FermentableIngredient,
    prefs,
    fermentableIngredientMapping,
    "to"
  );

  //const { recipeId, id, ...r } = valid.data;
  const res = await prisma.fermentableIngredient.update({
    where: { recipeId_id: { id, recipeId } },
    //include: { recipe: true },
    data: r,
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function removeFermentableIngredientById(
  recipeId: string,
  id: number
) {
  //const { id } = removeIngredientSchema.parse(formData);
  const res = await prisma.fermentableIngredient.delete({
    where: { recipeId_id: { id, recipeId } },
    //include: { recipe: true },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
export async function removeFermentableIngredient(formData: FormData) {
  const { id, recipeId } = removeIngredientSchema.parse(formData);
  const res = await prisma.fermentableIngredient.delete({
    where: { recipeId_id: { id, recipeId } },
    include: { recipe: true },
  });
  redirect(getRecipeUrl(res.recipeId));
  //return updateRecipeVitals(res.recipeId);
  //redirect(`/recipes/${res.recipeId}/edit`);
}
