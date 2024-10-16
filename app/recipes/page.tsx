//import { auth } from "@/app/auth";
//import { redirect } from "next/navigation";
//import { prisma } from "@/lib/client";
////import { AdminPage } from "./AdminPage";
////const AdminModal = dynamic(
////() => import("./AdminModal").then((s) => s.AdminModal),
////{ ssr: false }
////);

////import { auth } from "@/app/auth";
//export default async function Page() {
//const session = await auth();

//if (!session) return redirect("/");
//const user = await prisma.user.findFirst({
//where: { email: session?.user?.email },
//include: {
////recipes: { select: { name: true, id: true, styleIdentifer: true } },
//},
//});

//return <div>Recipes Page</div>;
//}
import { Metadata } from "next";
import { RecipeList } from "@/app/recipes/_components/RecipeList/RecipeList";
import { getRecipes } from "@/app/recipes/queries";
export const metadata: Metadata = {
  title: "LNK Recipes",
};

export default async function RecipesIndex() {
  const recipes = await getRecipes();
  return <RecipeList recipes={recipes} />;
}
