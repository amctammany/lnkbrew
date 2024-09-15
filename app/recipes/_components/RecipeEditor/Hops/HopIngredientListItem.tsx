import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { HopIngredient } from "@prisma/client";

export type HopIngredientListItemProps = {
  src: HopIngredient;
};
export const HopIngredientListItem = ({
  src: hopIngredient,
}: HopIngredientListItemProps) => {
  return (
    <ListItem border="none" href={`/hopIngredients/${hopIngredient.id}`}>
      <ListItemIcon variant="icon">
        <div className="text-lg ">{hopIngredient.id}</div>
      </ListItemIcon>
      <ListItemText
        className="flex-grow"
        primary={hopIngredient.hopId}
        secondary={hopIngredient.amount}
      />
    </ListItem>
  );
};
