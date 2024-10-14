import { Metadata } from "next";
import { RecipeList } from "@/app/recipes/_components/RecipeList/RecipeList";
import { getRecipes } from "@/app/recipes/queries";
export const metadata: Metadata = {
  title: "LNK Recipes",
};

export default async function RecipesLibrary() {
  const recipes = await getRecipes();
  return <RecipeList recipes={recipes} />;
}
