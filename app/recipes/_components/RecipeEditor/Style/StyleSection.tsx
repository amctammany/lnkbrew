import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { Prop } from "@/components/Prop";
import { IconButtonLink } from "@/components/Button";
import { RecipeIcon } from "@/components/Icon/RecipeIcon";
import { ExtendedRecipe } from "@/types/Recipe";

interface StyleSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const StyleSection: FC<StyleSectionProps> = ({ recipe }) => {
  return (
    <Section
      className="col-span-2"
      variant="secondary"
      header="Style"
      actions={
        <>
          <IconButtonLink
            href={`/recipes/${recipe?.ownerUsername}/${recipe?.slug}/edit/style`}
            Icon={RecipeIcon}
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
