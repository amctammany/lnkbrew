import { ClientSection, Section } from "@/components/Section";
import { Yeast } from "@prisma/client";
import Link from "next/link";
import OverviewSection from "./OverviewSection";
import { Toolbar } from "@/components/Toolbar";
import { IconButton } from "@/components/Button/IconButton";
import { IconButtonLink } from "@/components/Button";
import { EditIcon } from "@/components/Icon/EditIcon";
import { YeastIcon } from "@/components/Icon/YeastIcon";

export type YeastDisplayProps = {
  yeast: Yeast | null;
};
export function YeastDisplay({ yeast }: YeastDisplayProps) {
  return (
    <Section
      title={yeast?.name}
      Icon={YeastIcon}
      actions={
        <IconButtonLink
          href={`/ingredients/yeasts/${yeast?.slug}/edit`}
          Icon={EditIcon}
        >
          Edit
        </IconButtonLink>
      }
    >
      <div className="p-4">
        <OverviewSection yeast={yeast} />
      </div>
    </Section>
  );
}

export default YeastDisplay;
