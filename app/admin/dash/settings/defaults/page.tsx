import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { AdminSettingsDefaults } from "./AdminSettingsDefaults";
import { updateUserPreferences } from "@/app/admin/actions";
import {
  getWaterProfileOptions,
  getWaterProfiles,
} from "@/app/profiles/water/queries";
import {
  getMashProfileOptions,
  getMashProfiles,
} from "@/app/profiles/mash/queries";
import {
  getEquipmentProfileOptions,
  getEquipmentProfiles,
} from "@/app/profiles/equipment/queries";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/");
  const waterProfiles = await getWaterProfileOptions();
  const mashProfiles = await getMashProfileOptions();
  const equipmentProfiles = await getEquipmentProfileOptions();
  const user = await prisma.user.findFirst({
    where: { username: session?.user?.username },
    include: {
      UserPreferences: true,
      //recipes: { select: { name: true, id: true, styleIdentifer: true } },
    },
  });
  return (
    <AdminSettingsDefaults
      src={user?.UserPreferences ?? ({ userId: user?.id } as any)}
      action={updateUserPreferences}
      waterProfiles={waterProfiles}
      mashProfiles={mashProfiles}
      equipmentProfiles={equipmentProfiles}
    />
  );
}
