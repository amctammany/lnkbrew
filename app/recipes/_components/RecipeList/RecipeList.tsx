import { List } from "@/components/List/List";
import { Recipe } from "@prisma/client";
import { RecipeListItem } from "./RecipeListItem";
import { Section } from "@/components/Section";
import { RecipeIcon } from "@/components/Icon/RecipeIcon";
import { AddIcon } from "@/components/Icon/AddIcon";
import { IconButtonLink } from "@/components/Button";
const RecipeActions = () => {
  return (
    <>
      <IconButtonLink Icon={AddIcon} href="/recipes/new">
        New
      </IconButtonLink>
    </>
  );
};

export type RecipeListProps = {
  recipes?: Recipe[];
};
export const RecipeList = ({ recipes }: RecipeListProps) => {
  return (
    <Section
      header="Recipes List"
      Icon={RecipeIcon}
      actions={<RecipeActions />}
    >
      <List className="p-6">
        {(recipes || []).map((recipe) => (
          <RecipeListItem key={recipe?.id} recipe={recipe} />
        ))}
      </List>
    </Section>
  );
};
