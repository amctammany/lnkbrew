import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import GeneralForm, {
  GeneralFormContainer,
} from "@/app/rx/_components/RecipeEditor/General/GeneralForm";
import { RoutedModal } from "@/components/Modal/RoutedModal";
//import { ExtendedRecipe } from "@/types/Recipe";
import { getRecipeUrl } from "@/lib/utils";
import { updateRecipeGeneral } from "@/app/rx/actions";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorGeneralPageProps = {
  params: {
    recipeId: string;
    //path?: string[];
  };
};

//export function generateMetadata({ params }: RecipeEditorProps) {
//return {
//title: `LNK Recipe: ${params.id}`,
//};
//}

export default async function RecipeEditorGeneralPage({
  params: { recipeId },
}: RecipeEditorGeneralPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ id: recipeId });

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }
  return (
    <RoutedModal returnUrl={getRecipeUrl(recipeId)} hidden={false}>
      <GeneralForm action={updateRecipeGeneral} recipe={recipe} />;
    </RoutedModal>
  );
}
