import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";

export type ListItemProps = VariantProps<typeof listItemStyles> &
  ComponentProps<"div"> & {
    children?: React.ReactNode;
    href?: string;
    secondaryAction?: any;
    menuItems?: any[];
    scroll?: boolean;
  };
const listItemInnerStyles = cva(["flex px-2 py-1 items-center flex-grow"], {
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

const listItemStyles = cva(["group relative flex flex-row w-full"], {
  variants: {
    variant: {
      default: ["group-hover:bg-primary-500/10"],
      warning: ["group-hover:bg-warning-500/10"],
      //default: [""],
      //warning: [""],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const listItemSecondaryStyles = cva(["flex-shink-0 m-auto px-2"], {
  variants: {
    variant: {
      default: ["group-hovr:bg-primary-500/10"],
      warning: ["group-hoer:bg-warning-500/10"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const ListItem = ({
  href,
  scroll,
  secondaryAction,
  onClick,
  children,
  variant,
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

  return (
    <div className="group">
      <li className={listItemStyles({ variant })}>
        {child}
        <div className={listItemSecondaryStyles({ variant })}>
          {secondaryAction}
        </div>
      </li>
    </div>
  );
};
