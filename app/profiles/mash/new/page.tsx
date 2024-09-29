import { auth } from "@/app/auth";
import { MashProfileForm } from "@/app/profiles/mash/_components/MashProfileForm";
import { MashProfileInput } from "@/types/Profile";
import { MashProfile } from "@prisma/client";
import { redirect } from "next/navigation";
import { createMashProfile } from "../actions";
type MashProfileCreatorProps = {};

export function generateMetadata({}: MashProfileCreatorProps) {
  return {
    title: `LNK MashProfile: New`,
  };
}

export default async function MashProfileCreator({}: MashProfileCreatorProps) {
  const session = await auth();
  if (!session) return redirect("/admin/login?returnUrl=/profiles/mash/new");
  const mashProfile = { userId: session?.user?.id } as MashProfileInput;
  return (
    <MashProfileForm
      profile={mashProfile}
      action={createMashProfile.bind(null, session.user.UserPreferences as any)}
    />
  );
}
