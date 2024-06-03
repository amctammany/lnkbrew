import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import React, { ComponentProps, useState } from "react";
import { TableFilter, TableFilterType } from "./types";
import TextFilter from "./TextFilter";
import SelectFilter from "./SelectFilter";
import { Table } from "@tanstack/react-table";

const clientTableFilterStyles = cva("", {
  variants: {
    variant: {
      default: [],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type ClientTableFilterProps<T extends Record<string, any>> =
  VariantProps<typeof clientTableFilterStyles> &
    ComponentProps<"td"> & {
      children?: React.ReactNode;
      filter: TableFilter<T>;
      table: Table<T>;
    };
const filterComps: Record<TableFilterType, any> = {
  text: TextFilter,
  select: SelectFilter,
};
export function ClientTableFilter<T extends Record<string, any>>({
  filter,
  table,
  variant,
  className,
  children,
}: ClientTableFilterProps<T>) {
  const Comp = filterComps[filter.type];
  return (
    <div className={clsx(className, clientTableFilterStyles({ variant }))}>
      <Comp table={table} {...filter} />
      {children}
    </div>
  );
}

export default ClientTableFilter;
