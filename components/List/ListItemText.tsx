import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

const listItemTextStyles = cva(["grid m-auto py-1 px-2 flex-auto"], {
  variants: {
    variant: {
      default: [""],
      warning: ["bg-warning-500"],
    },
    size: {
      default: [""],
      small: [""],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
const listItemTextPrimaryStyles = cva(["block witespace-nowrap"], {
  variants: {
    size: {
      default: [""],
      small: ["text-sm"],
    },
    variant: {
      default: [""],
      warning: ["bg-warning-500"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
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
  size,
  variant,
  className,
}: ListItemTextProps) => {
  return (
    <div className={clsx(listItemTextStyles({ variant, size }), className)}>
      <div className={listItemTextPrimaryStyles({ variant, size })}>
        {primary || children}
      </div>
      {secondary && (
        <div className="block text-xs hitespace-nowrap">{secondary}</div>
      )}
    </div>
  );
};
