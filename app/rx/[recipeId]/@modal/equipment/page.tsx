import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
import { updateRecipeEquipment } from "@/app/rx/actions";
import { EquipmentModal } from "@/app/rx/_components/RecipeEditor/Equipment/EquipmentModal";
import {
  getEquipmentProfileOptions,
  getEquipmentProfiles,
} from "@/app/profiles/equipment/queries";
import {
  equipmentProfileMapping,
  mapUnits,
  recipeMapping,
} from "@/lib/mapUnits";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorEquipmentPageProps = {
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

export default async function RecipeEditorEquipmentPage({
  params: { recipeId },
}: RecipeEditorEquipmentPageProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ id: recipeId });
  const profiles = await getEquipmentProfiles();

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }
  const equip = mapUnits(
    recipe,
    session?.preferences,
    recipeMapping,
    "from",
    2
  );
  console.log(equip);

  return (
    <EquipmentModal
      action={updateRecipeEquipment.bind(null, session?.preferences)}
      recipe={recipe}
      profiles={profiles}
    />
  );
}
