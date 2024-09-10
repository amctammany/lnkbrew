import { Section } from "@/components/Section";
import { Recipe } from "@prisma/client";
import React from "react";
import { GeneralContainer } from "./General";

export type RecipeEditorProps = {
  recipe?: Recipe | null;
  path?: string[];
};
function RecipeEditor({ recipe, path }: RecipeEditorProps) {
  return (
    <div className="">
      <Section
        variant="secondary"
        header="Recipe Editor"
        footer={<span>{path?.join(" - ")}</span>}
      >
        <div className="grid grid-cols-2 md:grid-cols-3">
          <GeneralContainer recipe={recipe} path={path} />
        </div>
      </Section>
    </div>
  );
}

export default RecipeEditor;
