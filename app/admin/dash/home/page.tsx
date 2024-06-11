import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { updateUserPreferences } from "../../actions";
import { Dashboard } from "../../_components/Dashboard";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/");
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
    include: {
      UserPreferences: true,
      //recipes: { select: { name: true, id: true, styleIdentifer: true } },
    },
  });
  return <Dashboard src={user} />;
}
