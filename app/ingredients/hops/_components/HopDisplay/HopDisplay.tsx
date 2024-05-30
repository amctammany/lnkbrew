import { ClientSection } from "@/components/Section";
import { Hop } from "@prisma/client";
import Link from "next/link";
import OverviewSection from "./OverviewSection";
import { Toolbar } from "@/components/Toolbar";
import { IconButton } from "@/components/Button/IconButton";
import { IconButtonLink } from "@/components/Button";

export type HopDisplayProps = {
  hop: Hop | null;
};
export function HopDisplay({ hop }: HopDisplayProps) {
  console.log(hop);
  return (
    <div>
      <Toolbar variant="topbar" title={hop?.name}>
        <IconButtonLink
          href={`/ingredients/hops/${hop?.slug}/edit`}
          iconType="EditIcon"
        >
          Edit
        </IconButtonLink>
      </Toolbar>
      <div className="p-4">
        <OverviewSection hop={hop} />
      </div>
    </div>
  );
}

export default HopDisplay;
