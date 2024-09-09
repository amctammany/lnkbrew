import { prisma } from "@/lib/client";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getExtendedRecipe } from "@/app/recipes/queries";
//import { updateRecipeVitals } from "../actions";
type RecipeEditorProps = {
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

export default async function RecipeEditor({
  params: { username, slug },
}: RecipeEditorProps) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");
  const recipe = await getExtendedRecipe({ ownerUsername: username, slug });

  if (recipe?.ownerEmail !== session?.user.email) {
    //console.error("Unauthorized User");
    redirect(`/recipes/${recipe?.id}`);
  }

  //const r = await updateRecipeVitals(recipe.id);
  return redirect(`/recipes/${recipe.ownerUsername}/${recipe.slug}/edit`);
}
