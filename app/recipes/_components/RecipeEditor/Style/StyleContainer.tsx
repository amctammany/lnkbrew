//import { getExtendedRecipe } from "@/app/recipes/queries";
import React, { FC } from "react";
import dynamic from "next/dynamic";
//const StyleModal = dynamic(() => import("./StyleModal"), {
//ssr: false,
//});
import { UserMassPreference } from "@prisma/client";
import { StyleSection } from "./StyleSection";
import { ExtendedRecipe } from "@/types/Recipe";

interface StyleContainerProps {
  recipe: ExtendedRecipe;
  path?: string[];
  massUnit?: UserMassPreference;
}

export const StyleContainer: FC<StyleContainerProps> = async ({
  recipe,
  massUnit,
  path,
}) => {
  //const recipe = await getExtendedRecipe({ id: recipeId });
  const [modalType, modalId] = path ?? [undefined, undefined];
  return (
    <div className="lg:col-span-1">
      <StyleSection recipe={recipe} />
    </div>
  );
};
