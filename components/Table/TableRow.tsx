import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import clsx from "clsx";

export type TableRowProps<T extends Record<string, any>> = VariantProps<
  typeof tableRowStyles
> &
  ComponentProps<"tr"> & {};
const tableRowStyles = cva([""], {
  variants: {
    variant: {
      default: [""],
    },
    active: {
      selected: ["underline"],
      default: [""],
    },
  },
  defaultVariants: {
    variant: "default",
    active: "default",
  },
});

export function TableRow<T extends Record<string, any> = Record<string, any>>({
  children,
  className,
  //data,
  //columns,
  variant,
  active,
  ...props
}: TableRowProps<T>) {
  return (
    <tr className={clsx(className, tableRowStyles({ variant, active }))}>
      {children}
    </tr>
  );
}
