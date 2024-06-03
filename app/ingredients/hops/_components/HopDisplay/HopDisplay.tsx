import { ClientSection, Section } from "@/components/Section";
import { Hop } from "@prisma/client";
import OverviewSection from "./OverviewSection";
import { IconButtonLink } from "@/components/Button";

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
          iconType="EditIcon"
        >
          Edit
        </IconButtonLink>
      }
    >
      <div className="p-4">
        <OverviewSection hop={hop} />
      </div>
    </Section>
  );
}

export default HopDisplay;
