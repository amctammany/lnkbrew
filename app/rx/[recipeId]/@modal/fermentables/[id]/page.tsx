import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import {
  updateFermentableIngredient,
  updateRecipe,
} from "@/app/recipes/actions";
import { FermentablesModal } from "@/app/rx/_components/RecipeEditor/Fermentables/FermentablesModal";
import { getFermentables } from "@/app/ingredients/fermentables/queries";
import { fermentableIngredientMapping, mapUnits } from "@/lib/mapUnits";
import { ExtendedFermentableIngredient } from "@/types/Recipe";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorFermentablesPageProps = {
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

export default async function RecipeEditorFermentablesPage({
  params: { recipeId, id },
}: RecipeEditorFermentablesPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ id: recipeId });
  const fermentables = await getFermentables();
  const src = recipe.fermentables.find((f) => f.id === parseInt(id));

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    //redirect(`/recipes/${recipe?.id}`);
  }
  if (!src) throw new Error("no source");
  const fermentable = mapUnits(
    src,
    session.preferences,
    fermentableIngredientMapping,
    "from",
    2
  );

  return (
    <FermentablesModal
      action={updateFermentableIngredient.bind(null, session.preferences)}
      src={fermentable as ExtendedFermentableIngredient}
      //recipe={recipe}
      fermentables={fermentables}
    />
  );
}
