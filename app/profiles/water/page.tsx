import { Metadata } from "next";
import { getWaterProfiles } from "@/app/profiles/water/queries";
import { WaterProfileSearch } from "./_components/WaterProfileSearch/WaterProfileSearch";
export const metadata: Metadata = {
  title: "LNK Profiles",
};

export default async function WaterProfilesIndex() {
  const profiles = await getWaterProfiles();
  return <WaterProfileSearch profiles={profiles} />;
}
