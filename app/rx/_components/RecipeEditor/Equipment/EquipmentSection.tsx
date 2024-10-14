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
import { PrefAmountProp } from "@/components/Prop/PrefAmountProp";

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
      <div className="grid md:grid-cols-2 text-sm lg:text-lg">
        <Prop
          className="md:col-span-2"
          label="Profile Name"
          value={recipe?.equipmentProfile?.name}
        />
        <PrefAmountProp
          label="Batch Volume"
          value={recipe?.batchVolume}
          type="volume"
        />
        <PrefAmountProp
          label="Boil Volume"
          value={recipe?.boilVolume}
          type="volume"
        />
        <Prop label="Boil Time" value={recipe?.boilTime} unit="min" />

        <Prop label="Mash Efficiency" value={recipe?.mashEfficiency} unit="%" />
        <Prop label="Brew Efficiency" value={recipe?.brewEfficiency} unit="%" />
      </div>
    </Section>
  );
};
