import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { getRecipeUrl } from "@/lib/utils";
import { ExtendedHopIngredient } from "@/types/Recipe";
import { HopIngredient } from "@prisma/client";

export type HopIngredientListItemProps = {
  src: ExtendedHopIngredient;
};
export const HopIngredientListItem = ({ src }: HopIngredientListItemProps) => {
  return (
    <ListItem border="none" href={getRecipeUrl(src.recipeId, "hops", src.id)}>
      <ListItemIcon variant="icon">
        <div className="text-lg ">{src.id}</div>
      </ListItemIcon>
      <ListItemText
        className="flex-grow"
        primary={src.hop.name}
        secondary={src.amount}
      />
    </ListItem>
  );
};
