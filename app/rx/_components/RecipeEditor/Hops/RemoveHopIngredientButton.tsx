import {
  removeHopIngredient,
  removeHopIngredientById,
} from "@/app/recipes/actions";
import { IconButton } from "@/components/Button";
import { DeleteIcon } from "@/components/Icon/DeleteIcon";
import { RemoveButton } from "@/components/RemoveButton/RemoveButton";
import { ID } from "@/types/App";

export type RemoveHopIngredientButtonProps = {
  recipeId?: string;
  id?: number;
};
export function RemoveHopIngredientButton({
  recipeId,
  id,
}: RemoveHopIngredientButtonProps) {
  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (recipeId && id !== undefined) removeHopIngredientById(recipeId, id);
  };
  return <IconButton Icon={DeleteIcon} onClick={handleRemove} />;
}

export default RemoveHopIngredientButton;
