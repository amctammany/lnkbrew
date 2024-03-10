import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

const listItemButtonStyles = cva(
  ["flex items-center text-center text-bold justify-center  "],
  {
    variants: {
      variant: {
        default: [],
        button: ["rounded-full w-12 h-12 p-1 border-2 border-black"], // "w-12", "h-12", "p-1.5"],
      },
      color: {
        default: [" hover:color-primary-500/10"],
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
export type ListItemButtonProps = VariantProps<typeof listItemButtonStyles> &
  ComponentProps<"div"> & {
    children?: React.ReactNode;
  };
export const ListItemButton = ({
  children,
  variant,
  className,
}: ListItemButtonProps) => {
  return (
    <div className={clsx(listItemButtonStyles({ variant }), className)}>
      <div className="my-auto">{children}</div>
    </div>
  );
};
