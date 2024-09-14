import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import { updateRecipe } from "@/app/recipes/actions";
import { EquipmentModal } from "@/app/recipes/_components/RecipeEditor/Equipment/EquipmentModal";
import { getEquipmentProfileOptions } from "@/app/profiles/equipment/queries";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorEquipmentPageProps = {
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

export default async function RecipeEditorEquipmentPage({
  params: { username, slug },
}: RecipeEditorEquipmentPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ ownerUsername: username, slug });
  const profiles = await getEquipmentProfileOptions();

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }

  return (
    <EquipmentModal action={updateRecipe} recipe={recipe} profiles={profiles} />
  );
}
