"use client";
import { ExtendedRecipe } from "@/types/Recipe";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import { getRecipeUrl } from "@/lib/utils";
import EquipmentForm, { EquipmentFormContainer } from "./EquipmentForm";

export type EquipmentModalProps = {
  recipe: ExtendedRecipe;
  action?: any;
  profiles?: any;
};
export const EquipmentModal = ({
  recipe,
  profiles,
  action,
}: EquipmentModalProps) => {
  return (
    <EquipmentFormContainer action={action}>
      <RoutedModal returnUrl={getRecipeUrl(recipe.id)} hidden={false}>
        <EquipmentForm recipe={recipe} profiles={profiles} />;
      </RoutedModal>
    </EquipmentFormContainer>
  );
};
