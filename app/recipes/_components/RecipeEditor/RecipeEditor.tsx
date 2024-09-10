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
      <Section header="Recipe Editor" footer={<span>{path?.join(" - ")}</span>}>
        Recipe {JSON.stringify(recipe)}
        <div>
          <GeneralContainer recipe={recipe} path={path} />
        </div>
      </Section>
    </div>
  );
}

export default RecipeEditor;
