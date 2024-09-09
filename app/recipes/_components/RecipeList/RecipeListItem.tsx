import { RecipeIcon } from "@/components/Icon/RecipeIcon";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Recipe } from "@prisma/client";

export type RecipeListItemProps = {
  recipe?: Recipe;
};
export const RecipeListItem = ({ recipe }: RecipeListItemProps) => {
  return (
    <ListItem
      key={recipe?.id}
      href={`/recipes/${recipe?.ownerUsername}/${recipe?.slug}`}
    >
      <ListItemIcon>
        <RecipeIcon />
      </ListItemIcon>
      <ListItemText primary={recipe?.name} secondary={recipe?.description!} />
    </ListItem>
  );
};
