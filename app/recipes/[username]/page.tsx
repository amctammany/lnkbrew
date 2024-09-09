import { Metadata } from "next";
import { RecipeList } from "@/app/recipes/_components/RecipeList/RecipeList";
import { getRecipes } from "@/app/recipes/queries";
export type RecipesByUserPageProps = {
  params: {
    username: string;
  };
};
export const metadata: Metadata = {
  title: "LNK Recipes",
};

export default async function RecipesByUserPage({
  params: { username },
}: RecipesByUserPageProps) {
  const recipes = await getRecipes({ ownerUsername: username });
  return <RecipeList recipes={recipes} />;
}
