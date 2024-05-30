import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import React, { ComponentProps, useState } from "react";

const tableCellStyles = cva("", {
  variants: {
    variant: {
      default: [],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type TableCellProps = VariantProps<typeof tableCellStyles> &
  ComponentProps<"td"> & {
    children?: React.ReactNode;
  };
export function TableCell({ variant, className, children }: TableCellProps) {
  return (
    <td className={clsx(className, tableCellStyles({ variant }))}>
      {children}
    </td>
  );
}

export default TableCell;
