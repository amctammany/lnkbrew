import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { Prop } from "@/components/Prop";
import { IconButtonLink } from "@/components/Button";
import { RecipeIcon } from "@/components/Icon/RecipeIcon";
import { ExtendedRecipe } from "@/types/Recipe";
import { EditIcon } from "@/components/Icon/EditIcon";
import AmountProp from "@/components/Prop/AmountProp";
import { AddIcon } from "@/components/Icon/AddIcon";
import { List } from "@/components/List/List";
import { FermentableIngredientListItem } from "./FermentableIngredientListItem";
import { getRecipeUrl } from "@/lib/utils";

interface FermentablesSectionProps {
  recipe: ExtendedRecipe;
}

export const FermentablesSection: FC<FermentablesSectionProps> = ({
  recipe,
}) => {
  return (
    <Section
      className="col-span-1"
      variant="secondary"
      header="Fermentables"
      actions={
        <>
          <IconButtonLink
            href={getRecipeUrl(recipe.id, "fermentables", "new")}
            scroll={false}
            Icon={AddIcon}
          />
        </>
      }
    >
      <List>
        {recipe?.fermentables.map((f) => (
          <FermentableIngredientListItem key={`fermentable-${f.id}`} src={f} />
        ))}
      </List>
    </Section>
  );
};
