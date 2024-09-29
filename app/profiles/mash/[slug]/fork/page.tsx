import { auth } from "@/app/auth";
import { MashProfileForm } from "../../_components/MashProfileForm";
import { getMashProfile } from "../../queries";
import { redirect } from "next/navigation";
import Unauthorized from "@/app/admin/_components/Unauthorized";
import { ExtendedMashProfile, MashProfileInput } from "@/types/Profile";
import { createMashProfile, updateMashProfile } from "../../actions";
import { UnitPreferences } from "@prisma/client";
type MashProfileForkPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: MashProfileForkPageProps) {
  return Promise.resolve({
    title: `LNK MashProfile: ${params.slug}`,
  });
}

export default async function MashProfileForkPage({
  params: { slug },
}: MashProfileForkPageProps) {
  const session = await auth();
  if (!session)
    return redirect(`/admin/login?returnUrl=/profiles/mash/${slug}/fork`);

  const { id, name, ...mashProfile } = await getMashProfile(slug);
  //if (mashProfile?.owner?.id !== session?.user?.id)
  //return <Unauthorized returnUrl={`/profiles/mash/${slug}`} />;
  const forkedProfile: MashProfileInput = {
    id: undefined,
    ...mashProfile,
    name: `${session?.user?.name}-${name}`,
    userId: session?.user?.id!,
    forkedFrom: id ?? null,
  };
  return (
    <MashProfileForm
      profile={forkedProfile}
      action={updateMashProfile.bind(
        null,
        session.user.UserPreferences as any //Omit<UnitPreferences, "id">
      )}
    />
  );
}
