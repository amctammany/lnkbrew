import { Metadata } from "next";
import { getMashProfiles } from "@/app/profiles/mash/queries";
import { MashProfileSearch } from "./_components/MashProfileSearch";
export const metadata: Metadata = {
  title: "LNK Profiles",
};

export default async function MashProfilesIndex() {
  const profiles = await getMashProfiles();
  return <MashProfileSearch profiles={profiles} />;
}
