import React, { ComponentProps, memo } from "react";
import { RowProps, TableRow, makeTableRow } from "./TableRow";
import { HeaderProps, TableHeader, TableHeaderProps } from "./TableHeader";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { DataColumnProps, Direction } from "./types";
import { genericMemo } from "@/lib/utils";
export type TableProps<T extends Record<string, any>> = VariantProps<
  typeof tableStyles
> &
  ComponentProps<"table"> & {
    sort?: string;
    direction?: Direction; //string; //"ASC" | "DESC";
    query?: Record<keyof T, T[keyof T]>;
    src: T[];
    columns: DataColumnProps<T>[];
    Header?: React.FC<HeaderProps>;
    Row?: React.FC<RowProps>;
  };
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

export function Table<T extends Record<string, any>>({
  src,
  columns,
  query,
  sort,
  direction,
  variant,
  Header,
  Row: _Row,
  className,
  ...props
}: TableProps<T>) {
  const Row = makeTableRow(columns, _Row);
  const f = Object.keys(query || {}).reduce(
    (acc, field) =>
      acc.filter(
        (s) =>
          s[field]?.toLowerCase().indexOf(query?.[field]?.toLowerCase()) >= 0
      ),
    //acc[field as keyof T] = query[field];
    //return acc;
    src
  );
  const filtered = sort
    ? f.sort(
        (a, b) => (a[sort] < b[sort] ? -1 : 1) * (direction === "ASC" ? -1 : 1)
      )
    : f;
  console.log("table render");
  return (
    <div className="max-w-full overflow-auto">
      <table className={clsx(tableStyles({ variant }), className)} {...props}>
        <thead>
          <tr>
            {columns.map(({ name, label }) => (
              <TableHeader
                Header={Header}
                key={name.toString()}
                variant={variant}
                name={name.toString()}
                label={label}
                active={
                  (sort === name
                    ? direction === "DESC"
                      ? "DESC"
                      : "ASC"
                    : undefined) as Direction
                }
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((row) => (
            <Row variant={variant} key={row.id} _id={row.id} data={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const MemoTable = genericMemo(Table, (oldProps, newProps) => {
  console.log({ oldProps, newProps, eq: oldProps.src === newProps.src });
  return oldProps.src === newProps.src;
});
