import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

const listItemTextStyles = cva(["grid px-2 pr-12"], {
  variants: {
    variant: {
      default: [""],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type ListItemTextProps = VariantProps<typeof listItemTextStyles> &
  ComponentProps<"div"> & {
    primary?: string | React.ReactNode;
    secondary?: string | React.ReactNode;
    children?: React.ReactNode;
  };
export const ListItemText = ({
  children,
  primary,
  secondary,
  variant,
  className,
}: ListItemTextProps) => {
  return (
    <div className={clsx(listItemTextStyles({ variant }), className)}>
      <div className="block text-lg whitespace-nowrap">
        {primary || children}
      </div>
      {secondary && (
        <div className="block text-xs whitespace-nowrap">{secondary}</div>
      )}
    </div>
  );
};
