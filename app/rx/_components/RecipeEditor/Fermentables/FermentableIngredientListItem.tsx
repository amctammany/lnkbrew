import { getRecipe } from "@/app/recipes/queries";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import AmountProp from "@/components/Prop/AmountProp";
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
      <ListItemIcon>
        <AmountProp unitType="fermentableMass">{src.amount}</AmountProp>
      </ListItemIcon>
      <ListItemText className="flex-grow">
        <div className="flex-grow">{src.fermentable.name}</div>
      </ListItemText>
    </ListItem>
  );
};
