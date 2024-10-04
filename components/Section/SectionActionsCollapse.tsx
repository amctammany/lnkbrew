"use client";
import { useClickAway, useMediaQuery } from "@/hooks";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { IconButton } from "../Button";
import { MinimizeIcon } from "../Icon/MinimizeIcon";
import { MaximizeIcon } from "../Icon/MaximizeIcon";
import ChevronDownIcon from "../Icon/ChevronDownIcon";
import ChevronLeftIcon from "../Icon/ChevronLeftIcon";

export type SectionActionsCollapseProps = VariantProps<
  typeof collapseStyles
> & {
  children?: React.ReactNode[] | React.ReactNode;
  collapsible?: boolean;
  className?: string;
};
const containerStyles = cva(["relative flex flex-row "], {
  variants: {
    variant: {
      default: [],
      primary: [" "],
      secondary: [""],
      paper: ["bg-paper"],
      warning: [""],
      alert: [],
      inner: [""],
    },
    open: {
      open: [""],
      closed: [""],
    },
  },
  defaultVariants: {
    variant: "default",
    open: "closed",
  },
});

const collapseStyles = cva("flex bg-primary-300 ", {
  variants: {
    variant: {
      default: [""],
      primary: [" "],
      secondary: [""],
      paper: [""],
      warning: [""],
      alert: [],
      inner: [""],
    },
    open: {
      open: ["flex-grow-0"],
      closed: ["flex-shrink"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
  compoundVariants: [
    {
      variant: ["default", "warning", "alert"],
      open: "open",
      class: "bg-slate-700",
    },
    {
      variant: ["paper", "secondary", "primary"],
      open: "open",
      class: "bg-slate-200",
    },
  ],
});
export function SectionActionsCollapse({
  children,
  variant,
  collapsible = false,
  className,
}: SectionActionsCollapseProps) {
  const isSmall = useMediaQuery("(max-width: 641px)");
  const [open, setOpen] = useState(!isSmall);
  const handler = useCallback(() => {
    if (isSmall) {
      setOpen(() => false);
    }
  }, [isSmall, setOpen]);
  const ref = useClickAway(handler);
  const handleToggle: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = () => {
    if (isSmall) setOpen((o) => !o);
  };

  if (!collapsible || !isSmall) {
    return (
      <div
        //ref={ref}
        className={containerStyles({ variant, open: open ? "open" : "closed" })}
        //onClick={handler}
      >
        {children}
      </div>
    );
  }
  return !children ? (
    <></>
  ) : (
    <div
      className={clsx(
        collapseStyles({ variant, open: open ? "open" : "closed" }),
        className
      )}
    >
      <div
        ref={ref}
        className={containerStyles({ variant, open: open ? "open" : "closed" })}
        onClick={handler}
      >
        {children}
      </div>
      <div className={clsx("flex items-end", { hidden: !isSmall })}>
        <IconButton
          name="Minimize"
          className="group-focus-within:bg-blue-400"
          Icon={open ? ChevronDownIcon : ChevronLeftIcon}
          iconSize="small"
          //iconVariant="warning"
          onClick={handleToggle}
          //onTouchStart={handleToggle as any}
        />
      </div>
    </div>
  );
}

export default SectionActionsCollapse;
