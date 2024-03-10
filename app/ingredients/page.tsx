import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
//import { AdminPage } from "./AdminPage";
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
      //ingredients: { select: { name: true, id: true, styleIdentifer: true } },
    },
  });
  return <div>Ingredients Page</div>;
}
