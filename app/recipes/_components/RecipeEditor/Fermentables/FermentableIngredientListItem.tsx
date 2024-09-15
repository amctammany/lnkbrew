import { getRecipe } from "@/app/recipes/queries";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { getRecipeUrl } from "@/lib/utils";
import { ExtendedFermentableIngredient } from "@/types/Recipe";
//import { FermentableIngredient } from "@prisma/client";

export type FermentableIngredientListItemProps = {
  src: ExtendedFermentableIngredient;
};
export const FermentableIngredientListItem = ({
  src,
}: FermentableIngredientListItemProps) => {
  return (
    <ListItem
      border="none"
      href={getRecipeUrl(src?.recipeId, "fermentables", src.id)}
      //href={`/fermentableIngredients/${fermentableIngredient.id}`}
    >
      <ListItemIcon variant="icon">
        <div className="text-lg ">{src.id}</div>
      </ListItemIcon>
      <ListItemText
        className="flex-grow"
        primary={src.fermentable.name}
        secondary={src.amount}
      />
    </ListItem>
  );
};
