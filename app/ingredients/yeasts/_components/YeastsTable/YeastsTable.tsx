"use client";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
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
const YeastTypeWithBlank = { "": "", ...YeastType };
const YeastFormWithBlank = { "": "", ...YeastForm };
const YeastFlocculationWithBlank = { "": "", ...YeastFlocculation };
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
        //accessorFn: (row) => [row.name, row.slug],
        cell: ({ cell, row }) => (
          <Link
            className="underline visited:text-violet-300"
            href={`/ingredients/yeasts/${row.original.slug}`}
          >
            {cell.getValue()}
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
      {globalFilter}
      <TextField
        name="query"
        value={globalFilter ?? ""}
        onChange={({ target: { value } }) => setGlobalFilter(String(value))}
        className="p-2 font-lg shadow border border-block"
        placeholder="Search all columns..."
      />
      <Select
        name="type"
        value={table.getColumn("type")?.getFilterValue()}
        onChange={({ target: { value } }) =>
          table.getColumn("type")?.setFilterValue(value)
        }
        className="p-2 font-lg shadow border border-block"
        options={YeastTypeWithBlank}
      />
      <Select
        name="form"
        value={table.getColumn("form")?.getFilterValue()}
        onChange={({ target: { value } }) =>
          table.getColumn("form")?.setFilterValue(value)
        }
        className="p-2 font-lg shadow border border-block"
        options={YeastFormWithBlank}
      />

      <Select
        name="flocculation"
        value={table.getColumn("flocculation")?.getFilterValue()}
        onChange={({ target: { value } }) =>
          table.getColumn("flocculation")?.setFilterValue(value)
        }
        className="p-2 font-lg shadow border border-block"
        options={YeastFlocculationWithBlank}
      />

      <div className="overflow-x-scroll">
        <Table variant={variant} table={table}></Table>
      </div>
    </div>
  );
};
