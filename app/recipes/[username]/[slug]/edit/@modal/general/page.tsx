import { prisma } from "@/lib/client";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import RecipeEditor from "@/app/recipes/_components/RecipeEditor/RecipeEditor";
import GeneralForm, {
  GeneralFormContainer,
} from "@/app/recipes/_components/RecipeEditor/General/GeneralForm";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import { ExtendedRecipe } from "@/types/Recipe";
import { getRecipeUrl } from "@/lib/utils";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorGeneralPageProps = {
  params: {
    username: string;
    slug: string;
    //path?: string[];
  };
};

//export function generateMetadata({ params }: RecipeEditorProps) {
//return {
//title: `LNK Recipe: ${params.id}`,
//};
//}

export default async function RecipeEditorGeneralPage({
  params: { username, slug },
}: RecipeEditorGeneralPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ ownerUsername: username, slug });

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }
  return (
    <GeneralFormContainer>
      <RoutedModal returnUrl={getRecipeUrl(recipe, true)} hidden={false}>
        <GeneralForm recipe={recipe} />;
      </RoutedModal>
    </GeneralFormContainer>
  );
}
