import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { Children, ComponentProps } from "react";

export type ToolbarProps = VariantProps<typeof toolbarStyles> &
  ComponentProps<"div"> & {
    children?: React.ReactNode | React.ReactNode[];
  };
const toolbarStyles = cva("flex min-w-full flex-row-reverse", {
  variants: {
    variant: {
      default: ["bg-default-100"],
      warning: ["bg-warning-100"],
    },
    size: {
      default: ["py-1 px-2"],
      small: ["p-0"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
export const Toolbar = ({ children, variant, className }: ToolbarProps) => {
  return (
    <div className={clsx(toolbarStyles({ variant }), className)}>
      {Array.isArray(children)
        ? Children.map(children!, (c) => c)!.reverse()
        : children}
    </div>
  );
};
