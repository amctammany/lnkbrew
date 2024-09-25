import { ListItem } from "@/components/List/ListItem";
import { ListItemActions } from "@/components/List/ListItemActions";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Prop } from "@/components/Prop";
import AmountProp from "@/components/Prop/AmountProp";
import { getRecipeUrl } from "@/lib/utils";
import { ExtendedHopIngredient } from "@/types/Recipe";
import { HopIngredient } from "@prisma/client";

export type HopIngredientListItemProps = {
  src: ExtendedHopIngredient;
};
export const HopIngredientListItem = ({ src }: HopIngredientListItemProps) => {
  return (
    <ListItem
      innerClassName="grid grid-cols-5 lg:grid-cols-8"
      border="none"
      href={getRecipeUrl(src.recipeId, "hops", src.id)}
    >
      <ListItemText size="small" className="w-full text-center">
        <Prop unit={src.amountType} value={src.amount} />
      </ListItemText>
      <ListItemText
        className="col-span-3 lg:col-span-6 w-full"
        primary={src.hop.name}
        secondary={<span>IBU: {0}</span>}
      />
      <ListItemText size="small">
        <Prop
          //className="text-sm "
          unit={src.durationType}
          value={src.duration}
        />
      </ListItemText>
    </ListItem>
  );
};
