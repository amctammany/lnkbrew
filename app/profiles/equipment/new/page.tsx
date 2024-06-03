import { EquipmentProfileForm } from "@/app/profiles/equipment/_components/EquipmentProfileForm";
import { EquipmentProfile } from "@prisma/client";
type EquipmentProfileDisplayProps = {};

export function generateMetadata({}: EquipmentProfileDisplayProps) {
  return {
    title: `LNK EquipmentProfile: New`,
  };
}

export default async function EquipmentProfileDisplay({}: EquipmentProfileDisplayProps) {
  const equipmentProfile = {} as EquipmentProfile;
  return <EquipmentProfileForm profile={equipmentProfile} />;
}
