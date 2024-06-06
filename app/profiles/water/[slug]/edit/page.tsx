import { redirect } from "next/navigation";
import { WaterProfileForm } from "../../_components/WaterProfileForm";
import { getWaterProfile } from "../../queries";
import Unauthorized from "@/app/admin/_components/Unauthorized";
import { auth } from "@/app/auth";
type WaterProfileEditorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: WaterProfileEditorPageProps) {
  return Promise.resolve({
    title: `LNK WaterProfile: ${params.slug}`,
  });
}

export default async function WaterProfileEditorPage({
  params: { slug },
}: WaterProfileEditorPageProps) {
  const session = await auth();
  if (!session)
    return redirect(`/admin/login?returnUrl=/profiles/water/${slug}/edit`);

  const waterProfile = await getWaterProfile(slug);
  if (waterProfile?.userId !== session?.user?.id)
    return <Unauthorized returnUrl={`/profiles/water/${slug}`} />;

  return <WaterProfileForm profile={waterProfile} />;
}
