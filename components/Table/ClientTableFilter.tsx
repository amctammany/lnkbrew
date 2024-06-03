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
export function ClientTableFilter<T extends Record<string, any>>({
  filter,
  table,
  variant,
  className,
  children,
}: ClientTableFilterProps<T>) {
  const filterComps: Record<
    TableFilterType,
    React.FC<{
      className?: string;
      name: keyof T extends string ? string : never;
      options?: Record<string, string>;
      children?: any;
      type: TableFilterType;
      table: Table<T>;
    }>
  > = {
    text: TextFilter,
    select: SelectFilter,
  };
  children;

  const Comp = filterComps[filter.type];
  return (
    <Comp
      table={table}
      {...filter}
      className={clsx(className, clientTableFilterStyles({ variant }))}
    >
      {children}
    </Comp>
  );
}

export default ClientTableFilter;
