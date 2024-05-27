import { Hop } from "@prisma/client";
import Link from "next/link";

export type HopDisplayProps = {
  hop: Hop | null;
};
export function HopDisplay({ hop }: HopDisplayProps) {
  return (
    <div>
      HopDisplay {hop?.name}
      <Link href={`/ingredients/hops/${hop?.slug}/edit`}>Edit</Link>
    </div>
  );
}

export default HopDisplay;
