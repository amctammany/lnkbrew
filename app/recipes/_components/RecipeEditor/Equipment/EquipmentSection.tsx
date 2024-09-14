import React, { FC } from "react";
import { Section } from "@/components/Section/Section";
import { Prop } from "@/components/Prop";
import { IconButtonLink } from "@/components/Button";
import { RecipeIcon } from "@/components/Icon/RecipeIcon";
import { ExtendedRecipe } from "@/types/Recipe";
import { EditIcon } from "@/components/Icon/EditIcon";

interface EquipmentSectionProps {
  recipe?: ExtendedRecipe | null;
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
            href={`/recipes/${recipe?.ownerUsername}/${recipe?.slug}/edit/equipment`}
            Icon={EditIcon}
          />
        </>
      }
    >
      <Prop label="Profile Name" value={recipe?.equipmentProfile?.name} />
      <Prop label="Batch Volume" value={recipe?.batchVolume} />
      <Prop label="Boil Time" value={recipe?.boilTime} />
    </Section>
  );
};
