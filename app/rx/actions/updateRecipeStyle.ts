"use server";
import { prisma } from "@/lib/client";
import { equipmentProfileMapping, mapUnits } from "@/lib/mapUnits";
import { getRecipeUrl } from "@/lib/utils";
import { validateSchema } from "@/lib/validateSchema";
import { UnitPreferences } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const recipeStyleSchema = zfd.formData({
  id: zfd.text(),
  styleId: zfd.numeric(z.number().optional()),
});

export async function updateRecipeStyle(prevState: any, formData: FormData) {
  const v = validateSchema(formData, recipeStyleSchema);
  if (!v.success) return v;
  const {
    data: { id, styleId, ...data },
  } = v;
  console.log(v);
  //recipeSchema.parse(formData);
  //console.log({ id, styleIdentifer, data });
  const res = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      ...data,
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
