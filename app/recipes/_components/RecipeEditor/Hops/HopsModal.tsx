"use client";
import { ExtendedHopIngredient, ExtendedRecipe } from "@/types/Recipe";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import { getRecipeUrl } from "@/lib/utils";
import HopIngredientForm, {
  HopIngredientFormContainer,
} from "./HopIngredientForm";
//import HopsForm, { HopsFormContainer } from "./HopsForm";

export type HopsModalProps = {
  //recipe: ExtendedRecipe;
  src: ExtendedHopIngredient;
  action?: any;
  hops?: any;
};
export const HopsModal = ({ hops, action, src }: HopsModalProps) => {
  return (
    <HopIngredientFormContainer action={action}>
      <RoutedModal returnUrl={getRecipeUrl(src.recipeId)} hidden={false}>
        <HopIngredientForm src={src} hops={hops} />
      </RoutedModal>
    </HopIngredientFormContainer>
  );
};
