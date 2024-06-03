import { EquipmentProfileForm } from "../../_components/EquipmentProfileForm";
import { getEquipmentProfile } from "../../queries";
type EquipmentProfileEditorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: EquipmentProfileEditorPageProps) {
  return Promise.resolve({
    title: `LNK EquipmentProfile: ${params.slug}`,
  });
}

export default async function EquipmentProfileEditorPage({
  params: { slug },
}: EquipmentProfileEditorPageProps) {
  const equipmentProfile = await getEquipmentProfile(slug);
  return <EquipmentProfileForm profile={equipmentProfile} />;
}
