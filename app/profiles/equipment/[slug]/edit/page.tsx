import { auth } from "@/app/auth";
import { EquipmentProfileForm } from "../../_components/EquipmentProfileForm";
import { getEquipmentProfile } from "../../queries";
import { redirect } from "next/navigation";
import Unauthorized from "@/app/admin/_components/Unauthorized";
import { updateEquipmentProfile } from "../../actions";
import { equipmentProfileMapping, mapUnits } from "@/lib/mapUnits";
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
  const session = await auth();
  if (!session)
    return redirect(`/admin/login?returnUrl=/profiles/equipment/${slug}/edit`);

  const equipmentProfile = await getEquipmentProfile(slug);
  if (equipmentProfile?.userId !== session?.user?.id)
    return <Unauthorized returnUrl={`/profiles/equipment/${slug}`} />;
  const equip = mapUnits(
    equipmentProfile,
    session?.preferences,
    equipmentProfileMapping,
    "to"
  );
  return (
    <EquipmentProfileForm
      profile={equip}
      action={updateEquipmentProfile.bind(null, session?.preferences)}
    />
  );
}
