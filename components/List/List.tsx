import { type VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { type ComponentProps } from "react";

export type ListProps = VariantProps<typeof listStyles> &
  ComponentProps<"ul"> & {
    children?: React.ReactNode;
  };
const listStyles = cva(["list-none w-full"], {
  variants: {
    variant: {
      default: [""],
      warning: [""],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const listContainerStyles = cva(["w-full"], {
  variants: {
    variant: {
      default: ["bg-white"],
      warning: ["bg-warning-500"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export const List = ({ children, variant, className }: ListProps) => {
  return (
    <div className={clsx(listContainerStyles({ variant }), className)}>
      <ul className={listStyles({ variant })}>{children}</ul>
    </div>
  );
};
