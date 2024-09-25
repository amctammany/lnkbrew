"use client";
import {
  removeFermentableIngredient,
  removeFermentableIngredientById,
} from "@/app/recipes/actions";
import { IconButton } from "@/components/Button";
import { DeleteIcon } from "@/components/Icon/DeleteIcon";
import { RemoveButton } from "@/components/RemoveButton/RemoveButton";
import { ID } from "@/types/App";

export type RemoveFermentableIngredientButtonProps = {
  recipeId?: string;
  id?: number;
};
export function RemoveFermentableIngredientButton({
  recipeId,
  id,
}: RemoveFermentableIngredientButtonProps) {
  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (recipeId && id !== undefined)
      removeFermentableIngredientById(recipeId, id);
  };
  return <IconButton Icon={DeleteIcon} onClick={handleRemove} />;
}

export default RemoveFermentableIngredientButton;
