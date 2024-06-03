import { WaterProfileDisplay } from "../_components/WaterProfileDisplay";
import { getWaterProfile } from "../queries";
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
  const waterProfile = await getWaterProfile(slug);
  return <WaterProfileDisplay profile={waterProfile} />;
}
