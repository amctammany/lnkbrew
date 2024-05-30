/**
import { Fermentable } from "@prisma/client";
import Link from "next/link";
export type FermentablesTableProps = {
  fermentables: Fermentable[];
};
export const FermentablesTable = ({ fermentables }: FermentablesTableProps) => {
  //console.log(fermentables);
  return (
    <div>
      FermentablesTable
      {fermentables.map((fermentable) => (
        <div key={fermentable.id}>
          {fermentable.name}
          <Link href={`/ingredients/fermentables/${fermentable.slug}`}>Display</Link>
        </div>
      ))}
    </div>
  );
};
*/
"use client";
import { ClientTable } from "@/components/ClientTable";
import { Direction, DataColumnProps } from "@/components/Table/types";
import { Fermentable } from "@prisma/client";

export type FermentablesTableProps = {
  fermentables: Fermentable[];
  sort?: keyof Fermentable;
  direction?: Direction;
};
const columns: DataColumnProps<Fermentable>[] = [
  {
    name: "name",
    href: (src: Fermentable) => `/ingredients/fermentables/${src.slug}`,
  },
  { name: "country" },
  { name: "maxUsage" },
  { name: "color" },
  { name: "potential" },
];

export const FermentablesTable = ({
  fermentables,
  sort,
  direction,
}: FermentablesTableProps) => (
  <ClientTable
    src={fermentables}
    filters={{ name: "string" }}
    columns={columns}
    selectActions={{
      Compare: "/ingredients/fermentables/compare",
      Combine: "/ingredients/fermentables/combine",
    }}
  />
);
