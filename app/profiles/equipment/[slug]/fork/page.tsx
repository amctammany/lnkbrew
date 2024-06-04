import { auth } from "@/app/auth";
import { EquipmentProfileForm } from "../../_components/EquipmentProfileForm";
import { getEquipmentProfile } from "../../queries";
import { redirect } from "next/navigation";
import Unauthorized from "@/app/admin/_components/Unauthorized";
import { ExtendedEquipmentProfile } from "@/types/Profile";
type EquipmentProfileForkPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: EquipmentProfileForkPageProps) {
  return Promise.resolve({
    title: `LNK EquipmentProfile: ${params.slug}`,
  });
}

export default async function EquipmentProfileForkPage({
  params: { slug },
}: EquipmentProfileForkPageProps) {
  const session = await auth();
  if (!session)
    return redirect(`/admin/login?returnUrl=/profiles/equipment/${slug}/fork`);

  const { id, name, ...equipmentProfile } = await getEquipmentProfile(slug);
  //if (equipmentProfile?.owner?.id !== session?.user?.id)
  //return <Unauthorized returnUrl={`/profiles/equipment/${slug}`} />;
  const forkedProfile: Omit<ExtendedEquipmentProfile, "id"> = {
    ...equipmentProfile,
    name: `${session?.user?.name}-${name}`,
    userId: session?.user?.id!,
    forkedFrom: id,
  };
  return <EquipmentProfileForm profile={forkedProfile} />;
}
