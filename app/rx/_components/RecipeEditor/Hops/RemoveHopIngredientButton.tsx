import {
  removeHopIngredient,
  removeHopIngredientById,
} from "@/app/recipes/actions";
import { IconButton } from "@/components/Button";
import { DeleteIcon } from "@/components/Icon/DeleteIcon";
import { RemoveButton } from "@/components/RemoveButton/RemoveButton";
import { ID } from "@/types/App";

export type RemoveHopIngredientButtonProps = {
  id?: number;
};
export function RemoveHopIngredientButton({
  id,
}: RemoveHopIngredientButtonProps) {
  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (id) removeHopIngredientById(id);
  };
  return <IconButton Icon={DeleteIcon} onClick={handleRemove} />;
}

export default RemoveHopIngredientButton;
