"use server";
import { prisma } from "@/lib/client";
import { equipmentProfileMapping, mapUnits } from "@/lib/mapUnits";
import { getRecipeUrl } from "@/lib/utils";
import { validateSchema } from "@/lib/validateSchema";
import { UnitPreferences } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const recipeEquipmentSchema = zfd.formData({
  id: zfd.text(),
  equipmentProfileId: zfd.numeric(z.number().optional()),
  boilTime: zfd.numeric(z.number().min(0).default(60)),
  boilOffRate: zfd.numeric(z.number().min(0).default(1.5)),
  preboilVolume: zfd.numeric(z.number().min(0).default(1.5)),
  batchVolume: zfd.numeric(z.number().min(0).default(15)),
  boilVolume: zfd.numeric(z.number().min(0).default(15)),
  trubLoss: zfd.numeric(z.number().min(0).default(1.5)),
  mashLoss: zfd.numeric(z.number().min(0).default(1.5)),
  fermenterLoss: zfd.numeric(z.number().min(0).default(1.5)),
  mashEfficiency: zfd.numeric(z.number().min(0).max(100).default(65)),
  brewEfficiency: zfd.numeric(z.number().min(0).max(100).default(60)),
});

export async function updateRecipeEquipment(
  prefs: Partial<Omit<UnitPreferences, "id">>,
  prevState: any,
  formData: FormData
) {
  const v = validateSchema(formData, recipeEquipmentSchema);
  console.log(v);
  if (!v.success) return v;
  const {
    data: {
      id,
      equipmentProfileId,
      //boilTime,
      //preboilVolume,
      //mashLoss,
      //trubLoss,
      //fermenterLoss,
      //batchVolume,
      //boilOffRate,
      //mashEfficiency,
      //brewEfficiency,
      ...data
    },
  } = v;
  //const r = mapUnits(
  //{
  //batchVolume,
  //preboilVolume,
  //boilTime,
  //mashLoss,
  //trubLoss,
  //fermenterLoss,
  //boilOffRate,
  //mashEfficiency,
  //brewEfficiency,
  //} as any,
  //prefs,
  //equipmentProfileMapping,
  //"to"
  //);
  //console.log(r);
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
      //...r,
      ...(equipmentProfileId
        ? { equipmentProfile: { connect: { id: equipmentProfileId } } }
        : {}),
    },
  });
  //console.log(getObjectDifferences(old, res));
  //await updateRecipeVitals(res.id);
  redirect(getRecipeUrl(res.id));
}
