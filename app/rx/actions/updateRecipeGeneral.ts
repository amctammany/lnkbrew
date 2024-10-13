"use server";
import { prisma } from "@/lib/client";
import { equipmentProfileMapping, mapUnits } from "@/lib/mapUnits";
import { getRecipeUrl } from "@/lib/utils";
import { validateSchema } from "@/lib/validateSchema";
import { UnitPreferences } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const recipeGeneralSchema = zfd.formData({
  id: zfd.text(),
  name: zfd.text(z.string().optional()),
  description: zfd.text(z.string().optional()),
});

export async function updateRecipeGeneral(prevState: any, formData: FormData) {
  const v = validateSchema(formData, recipeGeneralSchema);
  if (!v.success) return v;
  const {
    data: { id, ...data },
  } = v;
  //console.log(r);
  //recipeSchema.parse(formData);
  //console.log({ id, styleIdentifer, data });
  const res = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
  //console.log(getObjectDifferences(old, res));
  //await updateRecipeVitals(res.id);
  redirect(getRecipeUrl(res.id));
}
