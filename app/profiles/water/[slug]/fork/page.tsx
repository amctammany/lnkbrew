import { auth } from "@/app/auth";
import { WaterProfileForm } from "../../_components/WaterProfileForm";
import { getWaterProfile } from "../../queries";
import { redirect } from "next/navigation";
import Unauthorized from "@/app/admin/_components/Unauthorized";
import { ExtendedWaterProfile } from "@/types/Profile";
type WaterProfileForkPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: WaterProfileForkPageProps) {
  return Promise.resolve({
    title: `LNK WaterProfile: ${params.slug}`,
  });
}

export default async function WaterProfileForkPage({
  params: { slug },
}: WaterProfileForkPageProps) {
  const session = await auth();
  if (!session)
    return redirect(`/admin/login?returnUrl=/profiles/water/${slug}/fork`);

  const { id, name, ...waterProfile } = await getWaterProfile(slug);
  //if (waterProfile?.owner?.id !== session?.user?.id)
  //return <Unauthorized returnUrl={`/profiles/water/${slug}`} />;
  const forkedProfile: Omit<ExtendedWaterProfile, "id"> = {
    ...waterProfile,
    name: `${session?.user?.name}-${name}`,
    userId: session?.user?.id!,
    forkedFrom: id ?? null,
  };
  return <WaterProfileForm profile={forkedProfile} />;
}
