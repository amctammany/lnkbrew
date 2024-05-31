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
//
//
//import { ClientTable } from "@/components/ClientTable";
import { Select, TextField } from "@/components/Form";
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
} from "@tanstack/react-table";
import { VariantProps, cva } from "class-variance-authority";
//import { AppIcon } from "@/components/AppIcon";
//import { TableHeader } from "@/components/Table/TableHeader";
import { fuzzyFilter } from "@/lib/fuzzyFilter";
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
        cell: (info) => info.getValue(),
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
      },
      {
        accessorKey: "beta",
        cell: (info) => info.getValue(),
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

      <Table variant={variant} table={table}></Table>
    </div>
  );
  /**
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
  */
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
