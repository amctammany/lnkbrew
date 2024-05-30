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
//import { ClientTable } from "@/components/ClientTable";
import { TextField } from "@/components/Form";
import { Table, MemoTable } from "@/components/Table";
import { Direction, DataColumnProps } from "@/components/Table/types";
import { Hop, HopUsage } from "@prisma/client";
import { memo, useState } from "react";

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
export const HopsTable = ({ hops, sort, direction }: HopsTableProps) => {
  const [query, setQuery] = useState("");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <div>
        <TextField name="query" value={query} onChange={handleChange} />
      </div>
      <MemoTable
        src={hops}
        columns={columns}
        sort={sort}
        direction={direction}
      />
    </div>
  );
}; /**
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
*/
