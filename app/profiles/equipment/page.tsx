import { Metadata } from "next";
import { getEquipmentProfiles } from "@/app/profiles/equipment/queries";
import { EquipmentProfileSearch } from "./_components/EquipmentProfileSearch";
export const metadata: Metadata = {
  title: "LNK Profiles",
};

export default async function EquipmentProfilesIndex() {
  const profiles = await getEquipmentProfiles();
  return <EquipmentProfileSearch profiles={profiles} />;
}
