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
  id?: number;
};
export function RemoveFermentableIngredientButton({
  id,
}: RemoveFermentableIngredientButtonProps) {
  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (id) removeFermentableIngredientById(id);
  };
  return <IconButton Icon={DeleteIcon} onClick={handleRemove} />;
}

export default RemoveFermentableIngredientButton;
