import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "./Table";
import { DataColumnProps } from "./types";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { fuzzyFilter } from "@/lib/fuzzyFilter";

const meta: Meta<typeof Table<D>> = {
  component: Table,
};
export default meta;
type D = { name: string; description: string };

type Story = StoryObj<typeof Table<D>>;

export const Basic: Story = {
  render: () => {
    const columns = useMemo<ColumnDef<D, any>[]>(
      () => [
        {
          id: "name",
          accessorKey: "name",
          cell: (info) => info.getValue(),
        },
        {
          accessorKey: "description",
          cell: (info) => info.getValue(),
        },
      ],
      []
    );
    const data: D[] = [
      { name: "alex", description: "desc" },
      { name: "lex", description: "desc" },
      { name: "ex", description: "desc" },
    ];
    const table = useReactTable({
      data,
      columns,
      filterFns: {
        fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
      },

      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(), //client side filtering
      getSortedRowModel: getSortedRowModel(),
    });

    return <Table table={table} />;
  },
};
