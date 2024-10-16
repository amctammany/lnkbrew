import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import {
  addFermentableIngredientToRecipe,
  updateRecipe,
} from "@/app/recipes/actions";
import { FermentablesModal } from "@/app/rx/_components/RecipeEditor/Fermentables/FermentablesModal";
import { getFermentables } from "@/app/ingredients/fermentables/queries";
import { ExtendedFermentableIngredient } from "@/types/Recipe";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorFermentablesPageProps = {
  params: {
    recipeId: string;
    //id: string;
    //path?: string[];
  };
};

//export function generateMetadata({ params }: RecipeEditorProps) {
//return {
//title: `LNK Recipe: ${params.id}`,
//};
//}

export default async function RecipeEditorNewFermentablePage({
  params: { recipeId },
}: RecipeEditorFermentablesPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ id: recipeId });
  const fermentables = await getFermentables();

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }
  const id =
    (recipe.fermentables.map(({ id }) => id).sort()[
      recipe.fermentables.length - 1
    ] ?? 0) + 1;

  return (
    <FermentablesModal
      action={addFermentableIngredientToRecipe.bind(null, session.preferences)}
      src={
        {
          id,
          recipeId: recipe.id,
        } as ExtendedFermentableIngredient
      }
      fermentables={fermentables}
    />
  );
}
