import { ClientSection, Section } from "@/components/Section";
import { Fermentable } from "@prisma/client";
import Link from "next/link";
import OverviewSection from "./OverviewSection";
import { Toolbar } from "@/components/Toolbar";
import { IconButton } from "@/components/Button/IconButton";
import { IconButtonLink } from "@/components/Button";
import { EditIcon } from "@/components/Icon/EditIcon";
import { GrainIcon } from "@/components/Icon/GrainIcon";

export type FermentableDisplayProps = {
  fermentable: Fermentable | null;
};
export function FermentableDisplay({ fermentable }: FermentableDisplayProps) {
  return (
    <Section
      title={fermentable?.name}
      Icon={GrainIcon}
      actions={
        <IconButtonLink
          href={`/ingredients/fermentables/${fermentable?.slug}/edit`}
          Icon={EditIcon}
        >
          Edit
        </IconButtonLink>
      }
    >
      <div className="p-4">
        <OverviewSection fermentable={fermentable} />
      </div>
    </Section>
  );
}

export default FermentableDisplay;
