import { WaterProfileForm } from "@/app/profiles/water/_components/WaterProfileForm";
import { WaterProfile } from "@prisma/client";
type WaterProfileDisplayProps = {};

export function generateMetadata({}: WaterProfileDisplayProps) {
  return {
    title: `LNK WaterProfile: New`,
  };
}

export default async function WaterProfileDisplay({}: WaterProfileDisplayProps) {
  const waterProfile = {} as WaterProfile;
  return <WaterProfileForm profile={waterProfile} />;
}
