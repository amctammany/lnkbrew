import { auth } from "@/app/auth";
import { EquipmentProfileDisplay } from "../_components/EquipmentProfileDisplay";
import { getEquipmentProfile } from "../queries";
import { toggleUserFavorite } from "@/app/admin/actions";
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
  //const session = await auth();
  return (
    <EquipmentProfileDisplay
      profile={equipmentProfile}
      //preferences={session?.user?.UserPreferences}
      //action={toggleUserFavorite}
    />
  );
}
