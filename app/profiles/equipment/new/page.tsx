import { auth } from "@/app/auth";
import { EquipmentProfileForm } from "@/app/profiles/equipment/_components/EquipmentProfileForm";
import { EquipmentProfile } from "@prisma/client";
import { signIn } from "next-auth/react";
import { RedirectType, redirect } from "next/navigation";
type EquipmentProfileCreatorPageProps = {};

export function generateMetadata({}: EquipmentProfileCreatorPageProps) {
  return {
    title: `LNK EquipmentProfile: New`,
  };
}

export default async function EquipmentProfileCreatorPage({}: EquipmentProfileCreatorPageProps) {
  const session = await auth();
  console.log(session);
  if (!session) return redirect("/api/auth/signin");
  const equipmentProfile = { userId: session?.user?.id } as EquipmentProfile;
  return <EquipmentProfileForm profile={equipmentProfile} />;
}
