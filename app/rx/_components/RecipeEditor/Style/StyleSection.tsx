import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { Prop } from "@/components/Prop";
import { IconButtonLink } from "@/components/Button";
import { RecipeIcon } from "@/components/Icon/RecipeIcon";
import { ExtendedRecipe } from "@/types/Recipe";
import { getRecipeUrl } from "@/lib/utils";
import { EditIcon } from "@/components/Icon/EditIcon";

interface StyleSectionProps {
  recipe: ExtendedRecipe;
}

export const StyleSection: FC<StyleSectionProps> = ({ recipe }) => {
  return (
    <Section
      className="col-span-2 lg:col-span-1"
      variant="secondary"
      header="Style"
      actions={
        <>
          <IconButtonLink
            href={getRecipeUrl(recipe.id, "style")}
            scroll={false}
            Icon={EditIcon}
          >
            ?
          </IconButtonLink>
        </>
      }
    >
      <Prop label="Style Name" value={recipe?.style?.name} />
      <Prop label="Style Identifier" value={recipe?.style?.identifier} />
    </Section>
  );
};
