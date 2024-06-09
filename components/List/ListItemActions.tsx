import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";
const ListItemActionsStyles = cva(
  ["flex-none m-auto p-0 grid grid-flow-col "],
  {
    variants: {
      variant: {
        default: ["bg-inherit"],
        warning: ["bg-warning-500"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ListItemActionsProps = VariantProps<typeof ListItemActionsStyles> &
  ComponentProps<"div"> & {
    children?: React.ReactNode | React.ReactNode[];
  };
export const ListItemActions = ({
  children,
  variant,
  className,
}: ListItemActionsProps) => {
  /*if (Array.isArray(children)) {*/
  /*console.log("menu", children.length);*/
  /*}*/
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    /*console.log("click inside actions");*/
    //e.preventDefault();
    e.stopPropagation();
    return false;
  };
  return (
    <div
      className={clsx(ListItemActionsStyles({ variant }), className)}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
