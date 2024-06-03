import { Metadata } from "next";
import { getEquipmentProfiles } from "@/app/profiles/equipment/queries";
import { EquipmentProfileList } from "./_components/EquipmentProfileList/EquipmentProfileList";
export const metadata: Metadata = {
  title: "LNK Profiles",
};

export default async function EquipmentProfilesIndex() {
  const profiles = await getEquipmentProfiles();
  return <EquipmentProfileList profiles={profiles} />;
}
