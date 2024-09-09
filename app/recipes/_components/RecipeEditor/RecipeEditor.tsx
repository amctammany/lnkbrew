import { Section } from "@/components/Section";
import { Recipe } from "@prisma/client";
import React from "react";

export type RecipeEditorProps = {
  recipe?: Recipe | null;
};
function RecipeEditor({ recipe }: RecipeEditorProps) {
  return (
    <div className="">
      <Section header="Recipe Editor">Recipe {JSON.stringify(recipe)}</Section>
    </div>
  );
}

export default RecipeEditor;
