import { auth, signIn } from "@/app/auth";
import { EquipmentProfileForm } from "@/app/profiles/equipment/_components/EquipmentProfileForm";
import { SignIn } from "@/components/Button/SignInButton";
import { EquipmentProfile } from "@prisma/client";
//import { signIn } from "next-auth/react";
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
  if (!session)
    return redirect("/admin/login?returnUrl=/profiles/equipment/new");
  //return signIn("google", { redirectTo: "/profiles/equipment/new" });
  if (!session) return <SignIn redirectTo="/profiles/equipment/new" />; // redirect("/api/auth/signin");
  const equipmentProfile = { userId: session?.user?.id } as EquipmentProfile;
  return <EquipmentProfileForm profile={equipmentProfile} />;
}
