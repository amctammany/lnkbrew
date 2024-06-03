import { EquipmentProfileDisplay } from "../_components/EquipmentProfileDisplay";
import { getEquipmentProfile } from "../queries";
type EquipmentProfileDisplayPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: EquipmentProfileDisplayPageProps) {
  return Promise.resolve({
    title: `LNK EquipmentProfile: ${params.slug}`,
  });
}

export default async function EquipmentProfileDisplayPage({
  params: { slug },
}: EquipmentProfileDisplayPageProps) {
  const equipmentProfile = await getEquipmentProfile(slug);
  return <EquipmentProfileDisplay profile={equipmentProfile} />;
}
