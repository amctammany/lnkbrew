import { Box } from "@/components/Box";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { MashProfileIcon } from "@/components/Icon/MashProfileIcon";
import { WaterProfileIcon } from "@/components/Icon/WaterProfileIcon";
import { Section } from "@/components/Section";
export default function ProfilesIndex() {
  return (
    <Section header="Profiles Index">
      <div className="grid w-full h-full grid-cols-2 gap-10 p-10">
        <Box Icon={EquipmentProfileIcon} href="/profiles/equipment">
          Equipment Profiles
        </Box>
        <Box Icon={WaterProfileIcon} href="/profiles/water">
          Water Profiles
        </Box>
        <Box Icon={MashProfileIcon} href="/profiles/mash">
          Mash Profiles
        </Box>
      </div>
    </Section>
  );
}
