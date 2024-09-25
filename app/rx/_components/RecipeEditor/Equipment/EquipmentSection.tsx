"use client";
import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { Prop } from "@/components/Prop";
import { IconButtonLink } from "@/components/Button";
import { RecipeIcon } from "@/components/Icon/RecipeIcon";
import { ExtendedRecipe } from "@/types/Recipe";
import { EditIcon } from "@/components/Icon/EditIcon";
import AmountProp from "@/components/Prop/AmountProp";
import { getRecipeUrl } from "@/lib/utils";

interface EquipmentSectionProps {
  recipe: ExtendedRecipe;
}

export const EquipmentSection: FC<EquipmentSectionProps> = ({ recipe }) => {
  return (
    <Section
      className="col-span-1"
      variant="secondary"
      header="Equipment"
      actions={
        <>
          <IconButtonLink
            href={getRecipeUrl(recipe.id, "equipment")}
            scroll={false}
            Icon={EditIcon}
          />
        </>
      }
    >
      <Prop label="Profile Name" value={recipe?.equipmentProfile?.name} />
      <AmountProp
        label="Batch Volume"
        value={recipe?.batchVolume}
        unitType="volume"
      />
      <AmountProp
        label="Boil Volume"
        value={recipe?.boilVolume}
        unitType="volume"
        precision={0}
      />
      <AmountProp
        label="Boil Time"
        value={recipe?.boilTime}
        unitType="time"
        precision={0}
      />

      <AmountProp
        label="Mash Efficiency"
        value={recipe?.mashEfficiency}
        unitType="percent"
        precision={0}
      />
      <AmountProp
        label="Brew Efficiency"
        value={recipe?.brewEfficiency}
        unitType="percent"
        precision={0}
      />
    </Section>
  );
};
