import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
//import { prisma } from "@/lib/client";
//import { Dashboard } from "../_components/Dashboard";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/");
  return redirect("/admin/dash/home");
  //const user = await prisma.user.findFirst({
  //where: { email: session?.user?.email },
  //include: {
  //recipes: { select: { name: true, id: true, styleIdentifer: true } },
  //},
  //});
  //return <Dashboard src={user} />;
}
