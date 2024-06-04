import { auth } from "@/app/auth";
import { EquipmentProfileForm } from "../../_components/EquipmentProfileForm";
import { getEquipmentProfile } from "../../queries";
import { redirect } from "next/navigation";
import Unauthorized from "@/app/admin/_components/Unauthorized";
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
  if (equipmentProfile?.owner?.id !== session?.user?.id)
    return <Unauthorized returnUrl={`/profiles/equipment/${slug}`} />;
  return <EquipmentProfileForm profile={equipmentProfile} />;
}
