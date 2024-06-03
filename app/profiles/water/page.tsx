import { Metadata } from "next";
import { getWaterProfiles } from "@/app/profiles/water/queries";
import { WaterProfileList } from "./_components/WaterProfileList/WaterProfileList";
export const metadata: Metadata = {
  title: "LNK Profiles",
};

export default async function WaterProfilesIndex() {
  const profiles = await getWaterProfiles();
  return <WaterProfileList profiles={profiles} />;
}
