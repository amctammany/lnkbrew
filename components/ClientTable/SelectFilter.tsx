import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import React, { ChangeEventHandler, ComponentProps, useState } from "react";
//import { TableFilter, TableFilterType } from "./types";
import { Table } from "@tanstack/react-table";
import { Select } from "../Form";
import { debounce } from "@/lib/utils";

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
    options?: Record<string, string>;
    //children?: React.ReactNode;
    //filter: TableFilter<T>;
  };
export function SelectFilter<T extends Record<string, any>>({
  table,
  name,
  options = {},
  variant,
  className,
  children,
}: SelectFilterProps<T>) {
  const debouncedFn = debounce(
    (n, v) => table.getColumn(n)?.setFilterValue(v),
    100
  );
  const [filterValue, setFilterValue] = useState(
    table.getColumn(name)?.getFilterValue()
  );
  const handleChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { name, value },
  }) => {
    setFilterValue(value);
    debouncedFn(name, value);
  };

  return (
    <Select
      name={name}
      value={filterValue as any}
      onChange={handleChange}
      className={clsx("p-2 font-lg border-block", className)}
      options={options}
      //placeholder="Search name column"
    />
  );
}
//<div className={clsx(className, selectFilterStyles({ variant }))}>
//     {children}
//   </div>

export default SelectFilter;
