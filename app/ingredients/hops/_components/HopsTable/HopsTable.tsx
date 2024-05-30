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
//import { ClientTable } from "@/components/ClientTable";
import { TextField } from "@/components/Form";
import { Table, MemoTable } from "@/components/Table";
import { Direction, DataColumnProps } from "@/components/Table/types";
import { Hop, HopUsage } from "@prisma/client";
import { memo, useMemo, useState } from "react";

export type HopsTableProps = VariantProps<typeof tableStyles> & {
  hops: Hop[];
  sort?: keyof Hop;
  direction?: Direction;
};
const columns: DataColumnProps<Hop>[] = [
  { name: "name", href: (src: Hop) => `/ingredients/hops/${src.slug}` },
  { name: "country" },
  { name: "usage" },
  { name: "alpha" },
  { name: "beta" },
];
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
const tableStyles = cva(
  ["w-full table table-auto border border-collapse border-slate-400"],
  {
    variants: {
      variant: {
        default: [""],
      },
      //active: {
      //ASC: ["underline"],
      //DESC: ["underline"],
      //},
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
const tableHeaderStyles = cva(["uppercase border border-slate-500"], {
  variants: {
    variant: {
      default: [""],
    },
    active: {
      ASC: ["underline"],
      DESC: ["underline"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const HopFilters = { name: "string", usage: { enum: HopUsage } } as any;
export const HopsTable = ({
  hops,
  sort,
  direction,
  variant,
}: HopsTableProps) => {
  const [query, setQuery] = useState("");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };
  const columns = useMemo<ColumnDef<Hop, any>[]>(
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

  const table = useReactTable({
    data: hops,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
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
      <table className={tableStyles({ variant })}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={tableHeaderStyles({ variant })}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="border border-slate-400" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
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
