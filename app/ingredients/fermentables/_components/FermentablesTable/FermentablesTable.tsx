"use client";
import { Select, TextField } from "@/components/Form";
import { Table } from "@/components/Table";
import { Direction } from "@/components/Table/types";
import { fuzzyFilter } from "@/lib/fuzzyFilter";
import { Fermentable } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
const FermentableUsageWithBlank = { "": "" }; //{ "": "", ...FermentableUsage };

export type FermentablesTableProps = {
  fermentables: Fermentable[];
  sort?: keyof Fermentable;
  direction?: Direction;
};
export const FermentablesTable = ({
  fermentables,
  sort,
  direction,
}: FermentablesTableProps) => {
  const columns = useMemo<ColumnDef<Fermentable, any>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        filterFn: "includesString",
        cell: ({ cell, row }) => (
          <Link
            className="underline visited:text-violet-300"
            href={`/ingredients/fermentables/${row.original.slug}`}
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
        accessorKey: "maxUsage",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "color",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "potential",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: fermentables,
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
      <Select
        name="usage"
        value={table.getColumn("usage")?.getFilterValue()}
        onChange={({ target: { value } }) =>
          table.getColumn("usage")?.setFilterValue(value)
        }
        className="p-2 font-lg shadow border border-block"
        options={FermentableUsageWithBlank}
      />

      <Table
        table={table}
        //src={fermentables}
        //filters={{ name: "string" }}
        //columns={columns}
        //selectActions={{
        //Compare: "/ingredients/fermentables/compare",
        //Combine: "/ingredients/fermentables/combine",
        //}}
      />
    </div>
  );
};
