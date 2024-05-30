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
