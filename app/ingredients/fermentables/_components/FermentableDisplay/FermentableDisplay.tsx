import { ClientSection } from "@/components/Section";
import { Fermentable } from "@prisma/client";
import Link from "next/link";
import OverviewSection from "./OverviewSection";
import { Toolbar } from "@/components/Toolbar";
import { IconButton } from "@/components/Button/IconButton";
import { IconButtonLink } from "@/components/Button";

export type FermentableDisplayProps = {
  fermentable: Fermentable | null;
};
export function FermentableDisplay({ fermentable }: FermentableDisplayProps) {
  console.log(fermentable);
  return (
    <div>
      <Toolbar variant="topbar" title={fermentable?.name}>
        <IconButtonLink
          href={`/ingredients/fermentables/${fermentable?.slug}/edit`}
          iconType="EditIcon"
        >
          Edit
        </IconButtonLink>
      </Toolbar>
      <div className="p-4">
        <OverviewSection fermentable={fermentable} />
      </div>
    </div>
  );
}

export default FermentableDisplay;
