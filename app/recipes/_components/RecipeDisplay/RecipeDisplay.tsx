import { IconButtonLink } from "@/components/Button";
import { FavButton } from "@/components/Button/FavButton";
import { EditIcon } from "@/components/Icon/EditIcon";
import { RecipeIcon } from "@/components/Icon/RecipeIcon";
import { ForkIcon } from "@/components/Icon/ForkIcon";
import { StarIcon } from "@/components/Icon/StarIcon";
import { Prop } from "@/components/Prop";
import AmountProp from "@/components/Prop/AmountProp";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
//import { ExtendedRecipe } from "@/types/Recipe";
import { Recipe, User, UserPreferences } from "@prisma/client";
import React from "react";
type ExtendedRecipe = any;
const numberFieldNames: [keyof Recipe, string][] = [];

export type RecipeDisplayProps = {
  recipe?: ExtendedRecipe;
  preferences?: UserPreferences;
  action?: any;
};
export const RecipeDisplay = ({
  recipe,
  //preferences,
  //action,
}: RecipeDisplayProps) => {
  return (
    <Section
      Icon={RecipeIcon}
      header={recipe?.name}
      actions={
        <>
          <IconButtonLink
            href={`/recipes/${recipe.ownerUsername}/${recipe?.slug}/fork`}
            Icon={ForkIcon}
          >
            Fork
          </IconButtonLink>

          <IconButtonLink
            href={`/recipes/${recipe.ownerUsername}/${recipe?.slug}/edit`}
            Icon={EditIcon}
          >
            Edit
          </IconButtonLink>
        </>
      }
    >
      <div className="p-4">
        <Prop label="Name">{recipe?.name}</Prop>
        <Prop label="Owner">{recipe?.owner?.name}</Prop>
        <Prop label="Description">{recipe?.description}</Prop>
      </div>
    </Section>
  );
};

export default RecipeDisplay;
/**        <AmountProp
          label="Batch Volume"
          unitType="volume"
          value={recipe?.batchVolume}
        />

        <AmountProp label="Boil Time" unitType="time">
          {recipe?.boilTime}
        </AmountProp>
        <AmountProp
          value={recipe?.boilOffRate}
          label="Boil Off Rate"
          unitType="flow"
          //unit="gal/hr"
        />
        <AmountProp
          label="Trub Loss"
          unitType="volume"
          value={recipe?.trubLoss}
        />
        <AmountProp
          label="Fermenter Loss"
          unitType="volume"
          value={recipe?.fermenterLoss}
        />
        <AmountProp
          label="Mash Loss"
          unitType="volume"
          value={recipe?.mashLoss}
        />
        <AmountProp
          label="Mash Efficiency"
          unitType="percent"
          value={recipe?.mashEfficiency}
        />
        <AmountProp
          label="Brew Efficiency"
          unitType="percent"
          value={recipe?.brewEfficiency}
        />

 */
