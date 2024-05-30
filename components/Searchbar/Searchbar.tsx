import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { Children, ComponentProps } from "react";
import Icon from "../Icon/Icon";
import { SearchIcon } from "../Icon/SearchIcon";

export type SearchbarProps = VariantProps<typeof searchbarStyles> &
  ComponentProps<"input"> & {
    children?: React.ReactNode | React.ReactNode[];
  };
const searchbarStyles = cva("inline-flex w-full h-full rounded border-2 ", {
  variants: {
    variant: {
      default: ["bg-default-100"],
      warning: ["bg-warning-100"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export const Searchbar = ({
  children,
  variant,
  className,
  ...props
}: SearchbarProps) => {
  return (
    <div className={clsx(searchbarStyles({ variant }), className)}>
      <SearchIcon size="large" className="my-auto flex-shrink border-r-0" />
      <input type="search" className="flex-grow" {...props} />
      {children}
    </div>
  );
};
