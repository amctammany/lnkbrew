import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import React, { ComponentProps, useState } from "react";
import { TableFilter, TableFilterType } from "./types";
import { Table } from "@tanstack/react-table";
import { Select } from "../Form";

const selectFilterStyles = cva("", {
  variants: {
    variant: {
      default: [],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type SelectFilterProps<T extends Record<string, any>> = VariantProps<
  typeof selectFilterStyles
> &
  ComponentProps<"td"> & {
    //TableFilter<T> & {
    table: Table<T>;
    name: keyof T extends string ? string : never;
    options: Record<string, string>;
    //children?: React.ReactNode;
    //filter: TableFilter<T>;
  };
export function SelectFilter<T extends Record<string, any>>({
  table,
  name,
  options,
  variant,
  className,
  children,
}: SelectFilterProps<T>) {
  return (
    <Select
      name={name}
      value={table.getColumn(name)?.getFilterValue() ?? ""}
      onChange={({ target: { name, value } }) =>
        table.getColumn(name)?.setFilterValue(value)
      }
      className="p-2 font-lg shadow border border-block"
      options={options}
      //placeholder="Search name column"
    />
  );
}
//<div className={clsx(className, selectFilterStyles({ variant }))}>
//     {children}
//   </div>

export default SelectFilter;
