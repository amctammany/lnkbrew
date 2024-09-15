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
import { HopIngredientListItem } from "./HopIngredientListItem";
import { getRecipeUrl } from "@/lib/utils";

interface HopsSectionProps {
  recipe: ExtendedRecipe;
}

export const HopsSection: FC<HopsSectionProps> = ({ recipe }) => {
  return (
    <Section
      className="col-span-1"
      variant="secondary"
      header="Hops"
      actions={
        <>
          <IconButtonLink
            scroll={false}
            href={getRecipeUrl(recipe.id, "hops", "new")}
            Icon={AddIcon}
          />
        </>
      }
    >
      <List>
        {recipe?.hops.map((f) => (
          <HopIngredientListItem key={`hop-${f.id}`} src={f} />
        ))}
      </List>
    </Section>
  );
};
