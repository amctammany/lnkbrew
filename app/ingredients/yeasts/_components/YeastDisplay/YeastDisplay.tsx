import { ClientSection } from "@/components/Section";
import { Yeast } from "@prisma/client";
import Link from "next/link";
import OverviewSection from "./OverviewSection";
import { Toolbar } from "@/components/Toolbar";
import { IconButton } from "@/components/Button/IconButton";
import { IconButtonLink } from "@/components/Button";

export type YeastDisplayProps = {
  yeast: Yeast | null;
};
export function YeastDisplay({ yeast }: YeastDisplayProps) {
  console.log(yeast);
  return (
    <div>
      <Toolbar variant="topbar" title={yeast?.name}>
        <IconButtonLink
          href={`/ingredients/yeasts/${yeast?.slug}/edit`}
          iconType="EditIcon"
        >
          Edit
        </IconButtonLink>
      </Toolbar>
      <div className="p-4">
        <OverviewSection yeast={yeast} />
      </div>
    </div>
  );
}

export default YeastDisplay;
