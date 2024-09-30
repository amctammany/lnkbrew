import { auth } from "@/app/auth";
import { WaterProfileForm } from "@/app/profiles/water/_components/WaterProfileForm";
import { WaterProfile } from "@prisma/client";
import { redirect } from "next/navigation";
import { createWaterProfile } from "../actions";
type WaterProfileCreatorProps = {};

export function generateMetadata({}: WaterProfileCreatorProps) {
  return {
    title: `LNK WaterProfile: New`,
  };
}

export default async function WaterProfileCreator({}: WaterProfileCreatorProps) {
  const session = await auth();
  if (!session) return redirect("/admin/login?returnUrl=/profiles/water/new");
  const waterProfile = { userId: session?.user?.id } as WaterProfile;
  return (
    <WaterProfileForm profile={waterProfile} action={createWaterProfile} />
  );
}
