import { prisma } from "@/lib/client";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import RecipeEditor from "@/app/recipes/_components/RecipeEditor/RecipeEditor";
import GeneralForm from "@/app/recipes/_components/RecipeEditor/General/GeneralForm";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import { ExtendedRecipe } from "@/types/Recipe";
import { getRecipeUrl } from "@/lib/utils";
import StyleForm, {
  StyleFormContainer,
} from "@/app/recipes/_components/RecipeEditor/Style/StyleForm";
import { getStyleOptions } from "@/app/styles/queries";
import StyleModal from "@/app/recipes/_components/RecipeEditor/Style/StyleModal";
import { updateRecipe } from "@/app/recipes/actions";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorStylePageProps = {
  params: {
    username: string;
    slug: string;
  };
};

//export function generateMetadata({ params }: RecipeEditorProps) {
//return {
//title: `LNK Recipe: ${params.id}`,
//};
//}

export default async function RecipeEditorStylePage({
  params: { username, slug },
}: RecipeEditorStylePageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({
    ownerUsername: username,
    slug,
  });

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }
  const styles = await getStyleOptions();

  //return <StyleModal recipe={recipe} styles={styles} />;
  //const r = await updateRecipeVitals(recipe.id);
  return (
    <StyleFormContainer action={updateRecipe}>
      <RoutedModal returnUrl={getRecipeUrl(recipe, true)} hidden={false}>
        <StyleForm recipe={recipe} styles={styles} />;
      </RoutedModal>
    </StyleFormContainer>
  );
}
