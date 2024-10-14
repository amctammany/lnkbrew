import { auth } from "@/app/auth";
import { MashProfileForm } from "../../_components/MashProfileForm";
import { getMashProfile } from "../../queries";
import { redirect } from "next/navigation";
import Unauthorized from "@/app/admin/_components/Unauthorized";
import { ExtendedMashProfile, MashProfileInput } from "@/types/Profile";
import { createMashProfile, updateMashProfile } from "../../actions";
import { UnitPreferences } from "@prisma/client";
import { mapUnits, mashProfileStepMapping } from "@/lib/mapUnits";
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
  const steps = mashProfile.steps.map((step) =>
    mapUnits(step, session?.preferences, mashProfileStepMapping, "from", 2)
  );
  const forkedProfile: MashProfileInput = {
    id: undefined,
    ...mashProfile,
    steps,
    name: `${session?.user?.name}-${name}`,
    userId: session?.user?.id!,
    forkedFrom: id ?? null,
  };
  return (
    <MashProfileForm
      profile={forkedProfile}
      action={createMashProfile.bind(null, session?.preferences)}
    />
  );
}
