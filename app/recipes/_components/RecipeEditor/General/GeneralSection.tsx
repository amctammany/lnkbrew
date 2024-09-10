import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { Prop } from "@/components/Prop";
import { IconButtonLink } from "@/components/Button";
import { RecipeIcon } from "@/components/Icon/RecipeIcon";
import { ExtendedRecipe } from "@/types/Recipe";

interface GeneralSectionProps {
  recipe?: ExtendedRecipe | null;
}

export const GeneralSection: FC<GeneralSectionProps> = ({ recipe }) => {
  return (
    <Section
      className="col-span-2"
      header="General"
      actions={
        <>
          <IconButtonLink
            href={`/recipes/${recipe?.ownerUsername}/${recipe?.slug}/edit/general`}
            Icon={RecipeIcon}
          >
            ?
          </IconButtonLink>
        </>
      }
    >
      <Prop label="Name" value={recipe?.name} />
      <Prop label="Author" value={recipe?.owner?.name} />
      <Prop label="Description" value={recipe?.description} />
    </Section>
  );
};
