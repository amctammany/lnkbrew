import { Section } from "@/components/Section";
import { Hop } from "@prisma/client";
import OverviewSection from "./OverviewSection";
import DetailsSection from "./DetailsSection";
import { IconButtonLink } from "@/components/Button";
import { EditIcon } from "@/components/Icon/EditIcon";

export type HopDisplayProps = {
  hop: Hop | null;
};
export function HopDisplay({ hop }: HopDisplayProps) {
  return (
    <Section
      title={hop?.name}
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
      </div>
    </Section>
  );
}

export default HopDisplay;
