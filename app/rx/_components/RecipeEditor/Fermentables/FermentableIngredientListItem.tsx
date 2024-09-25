import { getRecipe } from "@/app/recipes/queries";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Prop } from "@/components/Prop";
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
      innerClassName="grid grid-cols-8"
      //href={`/fermentableIngredients/${fermentableIngredient.id}`}
    >
      <ListItemText className="w-full">
        <Prop className="text-sm" value={src.amount} unit={src.amountType} />
      </ListItemText>
      <ListItemText
        className="col-span-6 w-full"
        secondary={<span>Type: t; Color: {src.color}</span>}
      >
        <div className="flex-grow">{src.fermentable.name}</div>
      </ListItemText>
      <div className="grid text-right">
        <span>%</span>
      </div>
    </ListItem>
  );
};
