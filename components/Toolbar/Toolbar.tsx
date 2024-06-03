import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { Children, ComponentProps } from "react";

export type ToolbarProps = VariantProps<typeof toolbarStyles> &
  ComponentProps<"div"> & {
    children?: React.ReactNode | React.ReactNode[];
  };
const toolbarTitleStyles = cva("flex-grow my-auto", {
  variants: {
    variant: {
      default: ["text-black"],
      warning: ["text-warning-100"],
      topbar: ["font-bold text-2xl"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const toolbarStyles = cva("flex", {
  variants: {
    variant: {
      default: ["bg-default-100 py-1 px-4"],
      warning: ["bg-warning-100"],
      topbar: ["bg-info-300 py-2 px-8 "],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export const Toolbar = ({
  title,
  children,
  variant,
  className,
}: ToolbarProps) => {
  return (
    <div className={clsx(toolbarStyles({ variant }), className)}>
      <div className={toolbarTitleStyles({ variant })}>{title}</div>
      <div className="flex flex-row-reverse">
        {Array.isArray(children)
          ? Children.map(children!, (c) => c)!.reverse()
          : children}
      </div>
    </div>
  );
};
