"use client";
import { useClickAway } from "@/hooks";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { IconButton } from "../Button";
import { MinimizeIcon } from "../Icon/MinimizeIcon";
import { MaximizeIcon } from "../Icon/MaximizeIcon";

export type SectionActionsCollapseProps = VariantProps<
  typeof collapseStyles
> & {
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
};
const containerStyles = cva(["relative flex flex-row"], {
  variants: {
    variant: {
      default: [],
      primary: ["bg-white "],
      secondary: ["bg-white"],
      paper: ["bg-paper"],
      warning: [""],
      alert: [],
    },
    open: {
      open: ["block"],
      closed: ["hidden"],
    },
  },
  defaultVariants: {
    variant: "default",
    open: "closed",
  },
});

const collapseStyles = cva("flex", {
  variants: {
    variant: {
      default: [""],
      primary: [" "],
      secondary: [""],
      paper: [""],
      warning: [""],
      alert: [],
    },
    open: {
      open: [""],
      closed: [""],
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
  className,
}: SectionActionsCollapseProps) {
  const [open, setOpen] = useState(false);
  const handler = useCallback(() => setOpen(() => false), [setOpen]);
  const ref = useClickAway(handler);
  const handleToggle: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = () => {
    setOpen((o) => !o);
  };

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
        onClick={handleToggle}
      >
        {children}
      </div>
      <div className="flex items-start">
        <IconButton
          className="group-focus-within:bg-blue-400"
          Icon={open ? MinimizeIcon : MaximizeIcon}
          onClick={handleToggle}
          //onTouchStart={handleToggle as any}
        />
      </div>
    </div>
  );
}

export default SectionActionsCollapse;
