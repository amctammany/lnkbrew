import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import { addHopIngredientToRecipe, updateRecipe } from "@/app/recipes/actions";
import { HopsModal } from "@/app/rx/_components/RecipeEditor/Hops/HopsModal";
import { getHops } from "@/app/ingredients/hops/queries";
import { ExtendedHopIngredient } from "@/types/Recipe";
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

export default async function RecipeEditorNewHopPage({
  params: { recipeId },
}: RecipeEditorHopsPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ id: recipeId });
  const hops = await getHops();

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }
  const id =
    (recipe.hops.map(({ id }) => id).sort()[recipe.hops.length - 1] ?? 0) + 1;

  return (
    <HopsModal
      action={addHopIngredientToRecipe.bind(null, session.preferences)}
      src={{ id, recipeId } as ExtendedHopIngredient}
      hops={hops}
    />
  );
}
