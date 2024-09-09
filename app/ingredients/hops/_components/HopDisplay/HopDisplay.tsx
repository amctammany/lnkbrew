import { Section } from "@/components/Section";
import OverviewSection from "./OverviewSection";
import DetailsSection from "./DetailsSection";
import { IconButtonLink } from "@/components/Button";
import { EditIcon } from "@/components/Icon/EditIcon";
import SensorySection from "./SensorySection";
import { ExtendedHop } from "@/types/Ingredient";
import { HopIcon } from "@/components/Icon/HopIcon";

export type HopDisplayProps = {
  hop: ExtendedHop | null;
};
export function HopDisplay({ hop }: HopDisplayProps) {
  return (
    <Section
      title={hop?.name}
      Icon={HopIcon}
      actions={
        <IconButtonLink
          href={`/ingredients/hops/${hop?.slug}/edit`}
          Icon={EditIcon}
        >
          Edit
        </IconButtonLink>
      }
    >
      <div className="p-4">
        <OverviewSection hop={hop} />
        <DetailsSection hop={hop} />
        <SensorySection hop={hop} />
      </div>
    </Section>
  );
}

export default HopDisplay;
