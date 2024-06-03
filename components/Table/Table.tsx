import React, { ComponentProps, memo } from "react";
import { TableRow } from "./TableRow";
import { HeaderProps, TableHeader, TableHeaderProps } from "./TableHeader";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { Direction } from "./types";
//import { genericMemo } from "@/lib/utils";
import { Table as ReactTable, flexRender } from "@tanstack/react-table";
import TableCell from "./TableCell";
export type TableProps<T extends Record<string, any>> = VariantProps<
  typeof tableStyles
> &
  ComponentProps<"table"> & { table: ReactTable<T> };
export const tableStyles = cva(
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

export function Table<T extends Record<string, any>>({
  table,
  variant,
  className,
  ...props
}: TableProps<T>) {
  return (
    <table className={clsx(className, tableStyles({ variant }))}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeader
                header={header}
                key={header.id}
                variant={variant}
                active={
                  header.column
                    .getIsSorted()
                    .valueOf()
                    .toString()
                    .toUpperCase() as Direction
                }
              />
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell className="border border-slate-400 px-2" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <TableRow key={footerGroup.id}>
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
          </TableRow>
        ))}
      </tfoot>
    </table>
  );
}
