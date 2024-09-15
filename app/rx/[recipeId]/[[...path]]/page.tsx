import { prisma } from "@/lib/client";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import RecipeEditor from "@/app/rx/_components/RecipeEditor/RecipeEditor";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorPageProps = {
  params: {
    recipeId: string;
    path?: string[];
  };
};

//export function generateMetadata({ params }: RecipeEditorProps) {
//return {
//title: `LNK Recipe: ${params.id}`,
//};
//}

export default async function RecipeEditorPage({
  params: { recipeId, path },
}: RecipeEditorPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ id: recipeId });

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }

  //const r = await updateRecipeVitals(recipe.id);
  return <RecipeEditor recipe={recipe} path={path} />;
}
