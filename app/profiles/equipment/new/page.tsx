import { auth } from "@/app/auth";
import { EquipmentProfileForm } from "@/app/profiles/equipment/_components/EquipmentProfileForm";
import { EquipmentProfile } from "@prisma/client";
import { redirect } from "next/navigation";
import { createEquipmentProfile } from "../actions";
type EquipmentProfileCreatorPageProps = {};

export function generateMetadata({}: EquipmentProfileCreatorPageProps) {
  return {
    title: `LNK EquipmentProfile: New`,
  };
}

export default async function EquipmentProfileCreatorPage({}: EquipmentProfileCreatorPageProps) {
  const session = await auth();
  if (!session)
    return redirect("/admin/login?returnUrl=/profiles/equipment/new");
  const equipmentProfile = { userId: session?.user?.id } as EquipmentProfile;

  return (
    <EquipmentProfileForm
      profile={equipmentProfile}
      action={createEquipmentProfile.bind(
        null,
        session.user.UserPreferences as any
      )}
    />
  );
}
