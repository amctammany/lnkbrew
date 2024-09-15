import { ListItem } from "@/components/List/ListItem";
import { ListItemActions } from "@/components/List/ListItemActions";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import AmountProp from "@/components/Prop/AmountProp";
import { getRecipeUrl } from "@/lib/utils";
import { ExtendedHopIngredient } from "@/types/Recipe";
import { HopIngredient } from "@prisma/client";

export type HopIngredientListItemProps = {
  src: ExtendedHopIngredient;
};
export const HopIngredientListItem = ({ src }: HopIngredientListItemProps) => {
  return (
    <ListItem border="none" href={getRecipeUrl(src.recipeId, "hops", src.id)}>
      <ListItemIcon>
        <AmountProp unitType="hopMass">{src.amount}</AmountProp>
      </ListItemIcon>
      <ListItemText
      //primary={src.hop.name}
      //secondary={src.amount}
      >
        <div className="flex-grow">
          {src.hop.name} <i>{src.hop.alpha}%</i>
        </div>
        <div className="inline-flex">
          <AmountProp className="w-full" unitType="time">
            {src.duration}
          </AmountProp>
        </div>
      </ListItemText>
    </ListItem>
  );
};
