import { redirect } from "next/navigation";
import { MashProfileForm } from "../../_components/MashProfileForm";
import { getMashProfile } from "../../queries";
import Unauthorized from "@/app/admin/_components/Unauthorized";
import { auth } from "@/app/auth";
import { MashProfileInput } from "@/types/Profile";
type MashProfileEditorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: MashProfileEditorPageProps) {
  return Promise.resolve({
    title: `LNK MashProfile: ${params.slug}`,
  });
}

export default async function MashProfileEditorPage({
  params: { slug },
}: MashProfileEditorPageProps) {
  const session = await auth();
  if (!session)
    return redirect(`/admin/login?returnUrl=/profiles/mash/${slug}/edit`);

  const mashProfile = await getMashProfile(slug);
  if (mashProfile?.userId !== session?.user?.id)
    return <Unauthorized returnUrl={`/profiles/mash/${slug}`} />;

  return (
    <MashProfileForm
      profile={mashProfile as MashProfileInput}
      userPreferences={session?.user.UserPreferences}
    />
  );
}
