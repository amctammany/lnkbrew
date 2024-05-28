import { ClientSection } from "@/components/Section";
import { Hop } from "@prisma/client";
import Link from "next/link";
import OverviewSection from "./OverviewSection";

export type HopDisplayProps = {
  hop: Hop | null;
};
export function HopDisplay({ hop }: HopDisplayProps) {
  console.log(hop);
  return (
    <div>
      HopDisplay {hop?.name}
      <Link href={`/ingredients/hops/${hop?.slug}/edit`}>Edit</Link>
      <OverviewSection hop={hop} />
    </div>
  );
}

export default HopDisplay;
