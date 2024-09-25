import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
//import { AdminSettings } from "./AdminSettings";
import { updateUnitPreferences } from "../../actions";
import AdminUnits from "./AdminUnits";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/");
  const user = await prisma.user.findFirst({
    where: { username: session?.user?.username },
    include: {
      UserPreferences: { include: { UnitPreferences: true } },
      //recipes: { select: { name: true, id: true, styleIdentifer: true } },
    },
  });
  return (
    <AdminUnits
      src={
        user?.UserPreferences?.UnitPreferences ?? ({ userId: user?.id } as any)
      }
      action={updateUnitPreferences}
    />
  );
}
