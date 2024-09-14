//import { getExtendedRecipe } from "@/app/recipes/queries";
import React, { FC } from "react";
import dynamic from "next/dynamic";
//const GeneralModal = dynamic(() => import("./GeneralModal"), {
//ssr: false,
//});
import { UserMassPreference } from "@prisma/client";
import { GeneralSection } from "./GeneralSection";
import { ExtendedRecipe } from "@/types/Recipe";

interface GeneralContainerProps {
  recipe?: ExtendedRecipe | null;
  path?: string[];
  massUnit?: UserMassPreference;
}

export const GeneralContainer: FC<GeneralContainerProps> = async ({
  recipe,
  massUnit,
  path,
}) => {
  //const recipe = await getExtendedRecipe({ id: recipeId });
  const [modalType, modalId] = path ?? [undefined, undefined];
  return (
    <div className="md:col-span-2">
      <GeneralSection recipe={recipe} />
    </div>
  );
};
