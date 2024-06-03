"use client";
//import { ClientTable } from "@/components/ClientTable";
import { Table, tableStyles } from "@/components/Table";
//import { Section } from "@/components/Section";
//import { Table } from "@/components/Table";
import { DataColumnProps, Direction } from "@/components/Table/types";
import { fuzzyFilter } from "@/lib/fuzzyFilter";
import {
  Hop,
  Yeast,
  YeastFlocculation,
  YeastForm,
  YeastType,
} from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { useMemo, useState } from "react";
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

export type YeastsTableProps = VariantProps<typeof tableStyles> & {
  yeasts: Yeast[];
  sort?: keyof Yeast;
  direction?: Direction;
};
export const YeastsTable = ({
  yeasts,
  variant,
  sort,
  direction,
}: YeastsTableProps) => {
  const columns = useMemo<ColumnDef<Yeast, any>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        accessorFn: (row) => [row.name, row.slug],
        cell: (info) => (
          <Link
            className="underline visited:text-violet-300"
            href={`/ingredients/yeasts/${info.getValue()[1]}`}
          >
            {info.getValue()[0]}
          </Link>
        ),
      },
      {
        accessorKey: "type",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "form",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "attenuation",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "flocculation",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: yeasts,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    //getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div>
      <Table variant={variant} table={table}></Table>
    </div>
  );
};
