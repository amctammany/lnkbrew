"use client";
import { ExtendedFermentableIngredient, ExtendedRecipe } from "@/types/Recipe";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import { getRecipeUrl } from "@/lib/utils";
import {
  FermentableIngredientForm,
  FermentableIngredientFormContainer,
} from "./FermentableIngredientForm";
import { Fermentable } from "@prisma/client";

export type FermentablesModalProps = {
  //recipe: ExtendedRecipe;
  action?: any;
  src: ExtendedFermentableIngredient;
  fermentables: Fermentable[];
};
export const FermentablesModal = ({
  //recipe,
  fermentables,
  src,
  action,
}: FermentablesModalProps) => {
  return (
    <RoutedModal returnUrl={getRecipeUrl(src.recipeId)} hidden={false}>
      <FermentableIngredientForm
        //recipe={recipe}
        action={action}
        src={src}
        fermentables={fermentables}
      />
    </RoutedModal>
  );
};
