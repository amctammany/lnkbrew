import { auth } from "@/app/auth";
import { EquipmentProfileForm } from "../../_components/EquipmentProfileForm";
import { getEquipmentProfile } from "../../queries";
import { redirect } from "next/navigation";
import Unauthorized from "@/app/admin/_components/Unauthorized";
import {
  EquipmentProfileInput,
  ExtendedEquipmentProfile,
} from "@/types/Profile";
import { createEquipmentProfile } from "../../actions";
import { equipmentProfileMapping, mapUnits } from "@/lib/mapUnits";
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

  const { id, name, owner, origin, ...equipmentProfile } =
    await getEquipmentProfile(slug);
  //if (equipmentProfile?.owner?.id !== session?.user?.id)
  //return <Unauthorized returnUrl={`/profiles/equipment/${slug}`} />;
  const forkedProfile: EquipmentProfileInput = {
    ...equipmentProfile,
    id: undefined,
    name: `${session?.user?.name}-${name}`,
    userId: session?.user?.id!,
    forkedFrom: id ?? null,
  };
  const equip = mapUnits(
    forkedProfile,
    session?.preferences,
    equipmentProfileMapping,
    "to"
  );

  return (
    <EquipmentProfileForm
      profile={equip}
      action={createEquipmentProfile.bind(null, session?.preferences)}
    />
  );
}
