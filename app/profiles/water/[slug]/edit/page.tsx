import { WaterProfileForm } from "../../_components/WaterProfileForm";
import { getWaterProfile } from "../../queries";
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
  const waterProfile = await getWaterProfile(slug);
  return <WaterProfileForm profile={waterProfile} />;
}
