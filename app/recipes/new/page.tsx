import { prisma } from "@/lib/client";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getRecipeUrl } from "@/lib/utils";
//import { updateRecipeVitals } from "../actions";
type RecipeCreatorProps = {};

//export function generateMetadata({ params }: RecipeCreatorProps) {
//return {
//title: `LNK Recipe: ${params.id}`,
//};
//}

export default async function RecipeCreator({}: RecipeCreatorProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await prisma.recipe.create({
    data: {
      ownerEmail: session?.user.email,
      ownerUsername: session?.user.username,
      //mashProfileId: session?.preferences.mashProfileId,
      //equipmentProfileId: session?.preferences.equipmentProfileId,
      //waterProfileId: session?.preferences.sourceWaterProfileId,

      name: `Recipe-${session?.user.recipeCounter}`,
      slug: `recipe-${session?.user.recipeCounter}`,
    },
  });
  const user = await prisma.user.update({
    where: {
      username: recipe.ownerUsername,
    },
    data: { recipeCounter: session?.user.recipeCounter + 1 },
  });
  //const r = await updateRecipeVitals(recipe.id);
  return redirect(getRecipeUrl(recipe.id));
}
TypeError;
