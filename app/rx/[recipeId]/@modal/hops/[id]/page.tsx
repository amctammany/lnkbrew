import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import { updateHopIngredient, updateRecipe } from "@/app/recipes/actions";
import { HopsModal } from "@/app/recipes/_components/RecipeEditor/Hops/HopsModal";
import { getHops } from "@/app/ingredients/hops/queries";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorHopsPageProps = {
  params: {
    recipeId: string;
    id: string;
    //path?: string[];
  };
};

//export function generateMetadata({ params }: RecipeEditorProps) {
//return {
//title: `LNK Recipe: ${params.id}`,
//};
//}

export default async function RecipeEditorHopsPage({
  params: { recipeId, id },
}: RecipeEditorHopsPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ id: recipeId });
  const hops = await getHops();
  const src = recipe.hops.find((h) => h.id === parseInt(id));

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }
  if (!src) throw new Error("no source");

  return <HopsModal action={updateHopIngredient} src={src} hops={hops} />;
}
