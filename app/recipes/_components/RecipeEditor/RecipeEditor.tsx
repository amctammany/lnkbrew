import { Section } from "@/components/Section";
import { Recipe } from "@prisma/client";
import React from "react";
import { GeneralContainer } from "./General";
import { StyleContainer } from "./Style";
import { EquipmentSection } from "./Equipment/EquipmentSection";

export type RecipeEditorProps = {
  recipe?: Recipe | null;
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 m-2">
          <GeneralContainer recipe={recipe} path={path} />
          <StyleContainer recipe={recipe} path={path} />
          <EquipmentSection recipe={recipe} />
        </div>
      </Section>
    </div>
  );
}

export default RecipeEditor;
