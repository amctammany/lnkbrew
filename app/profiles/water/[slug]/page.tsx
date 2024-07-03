import { auth } from "@/app/auth";
import { WaterProfileDisplay } from "../_components/WaterProfileDisplay";
import { getWaterProfile } from "../queries";
import { toggleUserFavorite } from "@/app/admin/actions";
type WaterProfileDisplayPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: WaterProfileDisplayPageProps) {
  return Promise.resolve({
    title: `LNK WaterProfile: ${params.slug}`,
  });
}

export default async function WaterProfileDisplayPage({
  params: { slug },
}: WaterProfileDisplayPageProps) {
  const session = await auth();
  const waterProfile = await getWaterProfile(slug);
  return (
    <WaterProfileDisplay
      profile={waterProfile}
      preferences={session?.user?.UserPreferences}
      action={toggleUserFavorite}
    />
  );
}
