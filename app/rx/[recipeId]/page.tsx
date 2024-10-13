import { prisma } from "@/lib/client";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import RecipeEditor from "@/app/rx/_components/RecipeEditor/RecipeEditor";
import { mapUnits, recipeMapping } from "@/lib/mapUnits";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorPageProps = {
  params: {
    recipeId: string;
  };
};

//export function generateMetadata({ params }: RecipeEditorProps) {
//return {
//title: `LNK Recipe: ${params.id}`,
//};
//}
//export async function generateStaticParams() {
//return []
//}
//export const dynamic = 'force-static'
export default async function RecipeEditorPage({
  params: { recipeId },
}: RecipeEditorPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ id: recipeId });

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    //redirect(`/recipes/${recipe?.id}`);
  }

  const rec = mapUnits(recipe, session?.preferences, recipeMapping, "from", 2);
  //const r = await updateRecipeVitals(recipe.id);
  return <RecipeEditor recipe={recipe} />;
}
