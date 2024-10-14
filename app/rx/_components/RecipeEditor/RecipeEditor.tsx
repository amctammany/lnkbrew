import { Section } from "@/components/Section";
import React from "react";
import { EquipmentSection } from "./Equipment/EquipmentSection";
import { FermentablesSection } from "./Fermentables/FermentablesSection";
import { ExtendedRecipe } from "@/types/Recipe";
import { HopsSection } from "./Hops/HopsSection";
import { StyleSection } from "./Style/StyleSection";
import { GeneralSection } from "./General/GeneralSection";

export type RecipeEditorProps = {
  recipe: ExtendedRecipe;
  path?: string[];
};
function RecipeEditor({ recipe, path }: RecipeEditorProps) {
  return (
    <div className="">
      <Section
        variant="primary"
        header="Recipe Editor"
        footer={<span>{path?.join(" - ")}</span>}
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 m-2">
          <GeneralSection recipe={recipe} />
          <StyleSection recipe={recipe} />
          <EquipmentSection recipe={recipe} />
          <FermentablesSection recipe={recipe} />
          <HopsSection recipe={recipe} />
        </div>
      </Section>
    </div>
  );
}

export default RecipeEditor;
