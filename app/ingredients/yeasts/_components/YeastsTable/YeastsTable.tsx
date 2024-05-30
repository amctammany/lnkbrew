"use client";
import { ClientTable } from "@/components/ClientTable";
//import { Section } from "@/components/Section";
//import { Table } from "@/components/Table";
import { DataColumnProps, Direction } from "@/components/Table/types";
import { Yeast, YeastFlocculation, YeastForm, YeastType } from "@prisma/client";
const columns: DataColumnProps<Yeast>[] = [
  { name: "name", href: (src: Yeast) => `/ingredients/yeasts/${src.slug}` },
  { name: "manufacturer" },
  { name: "type" },
  { name: "form" },
  { name: "tempLow" },
  { name: "tempHigh" },
  { name: "attenuation" },
  { name: "flocculation" },
  { name: "usage" },
];

export type YeastsTableProps = {
  yeasts: Yeast[];
  sort?: keyof Yeast;
  direction?: Direction;
};
export const YeastsTable = ({ yeasts, sort, direction }: YeastsTableProps) => (
  <ClientTable
    src={yeasts}
    filters={{
      name: "string",
      type: { "": "", ...YeastType },
      flocculation: { "": "", ...YeastFlocculation },
      form: { "": "", ...YeastForm } as any,
    }}
    columns={columns}
    sort={sort}
    direction={direction}
  />
);
