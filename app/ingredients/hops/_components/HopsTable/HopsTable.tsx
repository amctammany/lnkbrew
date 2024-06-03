"use client";
import { NumberField, Select, TextField } from "@/components/Form";
import { Table, tableStyles } from "@/components/Table";
import { Direction, DataColumnProps } from "@/components/Table/types";
import { Hop, HopUsage } from "@prisma/client";
import { memo, useMemo, useState } from "react";
const HopUsageWithBlank = { "": "", ...HopUsage };

export type HopsTableProps = VariantProps<typeof tableStyles> & {
  hops: Hop[];
  sort?: keyof Hop;
  direction?: Direction;
};
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
  FilterFn,
} from "@tanstack/react-table";
import { VariantProps, cva } from "class-variance-authority";
//import { AppIcon } from "@/components/AppIcon";
//import { TableHeader } from "@/components/Table/TableHeader";
import { fuzzyFilter } from "@/lib/fuzzyFilter";
import Link from "next/link";
export const HopsTable = ({
  hops,
  sort,
  direction,
  variant,
}: HopsTableProps) => {
  const columns = useMemo<ColumnDef<Hop, any>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        //accessorFn: (row) => [row.name, row.slug],
        //enableGlobalFilter: false,
        filterFn: "includesString",
        cell: ({ cell, row }) => (
          <Link
            className="underline visited:text-violet-300"
            href={`/ingredients/hops/${row.original.slug}`}
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        accessorKey: "country",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "usage",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "alpha",
        cell: (info) => info.getValue(),
        filterFn: "inNumberRange",
      },
      {
        accessorKey: "beta",
        cell: (info) => info.getValue(),
        filterFn: "inNumberRange",
      },
    ],
    []
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: hops,
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
      <TextField
        name="query"
        value={globalFilter ?? ""}
        onChange={({ target: { value } }) => setGlobalFilter(String(value))}
        className="p-2 font-lg shadow border border-block"
        placeholder="Search all columns..."
      />

      <TextField
        name="name"
        value={table.getColumn("name")?.getFilterValue()}
        onChange={({ target: { value } }) =>
          table.getColumn("name")?.setFilterValue(value)
        }
        className="p-2 font-lg shadow border border-block"
        placeholder="Search name column"
      />
      <Select
        name="usage"
        value={table.getColumn("usage")?.getFilterValue()}
        onChange={({ target: { value } }) =>
          table.getColumn("usage")?.setFilterValue(value)
        }
        className="p-2 font-lg shadow border border-block"
        options={HopUsageWithBlank}
      />
      <div>
        <NumberField
          name="minAlpha"
          value={
            (
              table.getColumn("alpha")?.getFilterValue() as [number, number]
            )?.[0] ?? ""
          }
          onChange={({ target: { value } }) =>
            table
              .getColumn("alpha")
              ?.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          className="p-2 font-lg shadow border border-block"
        />
        <NumberField
          name="maxAlpha"
          value={
            (
              table.getColumn("alpha")?.getFilterValue() as [number, number]
            )?.[1] ?? ""
          }
          onChange={({ target: { value } }) =>
            table
              .getColumn("alpha")
              ?.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          className="p-2 font-lg shadow border border-block"
        />
      </div>

      <div className="overflow-x-scroll">
        <Table variant={variant} table={table}></Table>
      </div>
    </div>
  );
};
