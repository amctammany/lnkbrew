/**
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
*/
"use client";
import { ClientTable } from "@/components/ClientTable";
import { Direction, DataColumnProps } from "@/components/Table/types";
import { Hop, HopUsage } from "@prisma/client";
import { memo } from "react";

export type HopsTableProps = {
  hops: Hop[];
  sort?: keyof Hop;
  direction?: Direction;
};
const columns: DataColumnProps<Hop>[] = [
  { name: "name", href: (src: Hop) => `/ingredients/hops/${src.slug}` },
  { name: "country" },
  { name: "usage" },
  { name: "alpha" },
  { name: "beta" },
];

const HopFilters = { name: "string", usage: { enum: HopUsage } } as any;
export const HopsTable = ({ hops, sort, direction }: HopsTableProps) => (
  <ClientTable
    src={hops}
    filters={HopFilters}
    columns={columns}
    selectActions={{
      Compare: "/ingredients/hops/compare",
      Combine: "/ingredients/hops/combine",
    }}
  />
);
export const MemoHopsTable = memo(HopsTable, function (oldProps, newProps) {
  console.log({ oldProps, newProps });
  return true;
});
