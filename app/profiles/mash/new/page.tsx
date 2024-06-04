import { auth } from "@/app/auth";
import { MashProfileForm } from "@/app/profiles/mash/_components/MashProfileForm";
import { MashProfile } from "@prisma/client";
import { redirect } from "next/navigation";
type MashProfileCreatorProps = {};

export function generateMetadata({}: MashProfileCreatorProps) {
  return {
    title: `LNK MashProfile: New`,
  };
}

export default async function MashProfileCreator({}: MashProfileCreatorProps) {
  const session = await auth();
  if (!session) return redirect("/admin/login?returnUrl=/profiles/mash/new");
  const mashProfile = { userId: session?.user?.id } as MashProfile;
  return <MashProfileForm profile={mashProfile} />;
}
