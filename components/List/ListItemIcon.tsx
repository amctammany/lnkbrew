import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

const listItemIconStyles = cva(
  ["flex items-center text-center text-bold justify-center  "],
  {
    variants: {
      variant: {
        default: ["h-full"],
        icon: ["rounded-full w-12 h-12 p-1 border-2 border-black"], // "w-12", "h-12", "p-1.5"],
      },
      color: {
        default: [""],
        primary: ["bg-primary-200"],
        secondary: ["bg-secondary-200"],
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  }
);
export type ListItemIconProps = VariantProps<typeof listItemIconStyles> &
  ComponentProps<"div"> & {
    children?: React.ReactNode;
  };
export const ListItemIcon = ({
  children,
  variant,
  className,
}: ListItemIconProps) => {
  return (
    <div className={clsx(listItemIconStyles({ variant }), className)}>
      {children}
    </div>
  );
};
