"use client";
import { Table } from "@/components/Table";
import { Direction } from "@/components/Table/types";
import { fuzzyFilter } from "@/lib/fuzzyFilter";
import { Fermentable, Hop } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

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
        accessorKey: "name",
        cell: (info) => info.getValue(),
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
  );
};
