import { Metadata } from "next";
import { getMashProfiles } from "@/app/profiles/mash/queries";
import { MashProfileList } from "./_components/MashProfileList/MashProfileList";
export const metadata: Metadata = {
  title: "LNK Profiles",
};

export default async function MashProfilesIndex() {
  const profiles = await getMashProfiles();
  return <MashProfileList profiles={profiles} />;
}
