import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import React, { ChangeEventHandler, ComponentProps, useState } from "react";
//import { TableFilter, TableFilterType } from "../Table/types";
import { Table } from "@tanstack/react-table";
import { TextField } from "../Form";

const textFilterStyles = cva("", {
  variants: {
    variant: {
      default: [],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type TextFilterProps<T extends Record<string, any>> = VariantProps<
  typeof textFilterStyles
> &
  ComponentProps<"td"> & {
    //TableFilter<T> & {
    table: Table<T>;
    name: keyof T extends string ? string : never;
    //children?: React.ReactNode;
    //filter: TableFilter<T>;
  };
export function TextFilter<T extends Record<string, any>>({
  table,
  name,
  variant,
  className,
  children,
}: TextFilterProps<T>) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    table.getColumn(name)?.setFilterValue(value);
  };
  return (
    <TextField
      name={name}
      value={table.getColumn(name)?.getFilterValue() ?? ""}
      onChange={handleChange}
      className="p-2 font-lg "
      placeholder="Search name column"
    />
  );
}
//<div className={clsx(className, textFilterStyles({ variant }))}>
//     {children}
//   </div>

export default TextFilter;
