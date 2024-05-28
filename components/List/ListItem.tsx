import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";
import { ListItemActions } from "./ListItemActions";

export type ListItemProps = VariantProps<typeof listItemStyles> &
  ComponentProps<"div"> & {
    children?: React.ReactNode;
    href?: string;
    //secondaryAction?: any;
    //actions?: React.ReactNode | React.ReactNode[];
    scroll?: boolean;
  };
const listItemInnerStyles = cva(["flex px-0 py-0 items-center flex-grow"], {
  variants: {
    variant: {
      default: ["group-hove:bg-primary-500/10"],
      warning: ["group-hovr:bg-warning-500/10"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const listItemStyles = cva(
  ["group relative box-border justify-start flex flex-row w-full"],
  {
    variants: {
      variant: {
        default: ["group-hover:bg-primary-500/10"],
        warning: ["group-hover:bg-warning-500/10"],
        //default: [""],
        //warning: [""],
      },
      border: {
        none: [""],
        black: [
          "border-2 border-spacing-2 [&:not(:last-of-type)]:border-b-0 border-black",
        ],
        red: [
          "border-2 border-spacing-2 [&:not(:last-of-type)]:border-b-0 border-red",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      border: "black",
    },
  }
);

export const ListItem = ({
  href,
  scroll,
  //actions,
  onClick,
  children,
  variant,
  border,
  className,
}: ListItemProps) => {
  const cn = clsx(listItemInnerStyles({ variant }), className);
  const child = href ? (
    <Link
      //{...props}
      href={href || ""}
      scroll={scroll ?? false}
      className={cn}
    >
      {children}
    </Link>
  ) : (
    <div onClick={onClick} className={cn}>
      {children}
    </div>
  );

  return <li className={listItemStyles({ variant, border })}>{child}</li>;
};
