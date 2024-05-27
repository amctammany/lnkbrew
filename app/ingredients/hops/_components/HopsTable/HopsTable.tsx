import { Hop } from "@prisma/client";
import Link from "next/link";
export type HopsTableProps = {
  hops: Hop[];
};
export const HopsTable = ({ hops }: HopsTableProps) => {
  //console.log(hops);
  return (
    <div>
      HopsTable
      {hops.map((hop) => (
        <div key={hop.id}>
          {hop.name}
          <Link href={`/ingredients/hops/${hop.slug}`}>Display</Link>
        </div>
      ))}
    </div>
  );
};
