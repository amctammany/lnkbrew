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
  recipe: ExtendedRecipe;
  action?: any;
  src?: ExtendedFermentableIngredient;
  fermentables: Fermentable[];
};
export const FermentablesModal = ({
  recipe,
  fermentables,
  src,
  action,
}: FermentablesModalProps) => {
  return (
    <FermentableIngredientFormContainer action={action}>
      <RoutedModal returnUrl={getRecipeUrl(recipe.id)} hidden={false}>
        <FermentableIngredientForm
          recipe={recipe}
          src={src}
          fermentables={fermentables}
        />
        ;
      </RoutedModal>
    </FermentableIngredientFormContainer>
  );
};
