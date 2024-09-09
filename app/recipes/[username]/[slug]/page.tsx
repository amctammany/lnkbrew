import { Metadata } from "next";
import { getRecipe } from "@/app/recipes/queries";
import RecipeDisplay from "../../_components/RecipeDisplay/RecipeDisplay";
export type RecipesByUserPageProps = {
  params: {
    username: string;
    slug: string;
  };
};
export const metadata: Metadata = {
  title: "LNK Recipes",
};

export default async function RecipeDisplayPage({
  params: { slug, username },
}: RecipesByUserPageProps) {
  const recipe = await getRecipe(username, slug);
  return <RecipeDisplay recipe={recipe} />;
}
