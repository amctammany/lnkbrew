"use client";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { IconButton } from "../Button";
import { useCallback, useMemo, useState } from "react";
import { useClickAway } from "@/lib/useClickAway";
import { MaximizeIcon } from "../Icon/MaximizeIcon";
import { MinimizeIcon } from "../Icon/MinimizeIcon";
//import Link from "next/link";
//import { usePathname } from "next/navigation";

const containerStyles = cva(["absolute bg-slate-800 top-4 right-12"], {
  variants: {
    variant: {
      default: [],
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
const navCollapseStyles = cva(
  ["sm:hidden group flex text-center font-bold relative z-20"],
  {
    variants: {
      variant: {
        default: ["text-slate-900 hover:text-red-500 "],
      },
      size: {
        small: ["p-0"],
        default: ["py-2 px-1"],
      },
      open: {
        open: [""],
        closed: [],
      },
    },
    defaultVariants: {
      variant: "default",
      open: "closed",
      size: "default",
    },
  }
);
export type NavCollapseProps = VariantProps<typeof navCollapseStyles> & {
  children: React.ReactNode;
  className?: string;
};
export const NavCollapse = ({
  variant,
  children,
  className,
  size,
}: NavCollapseProps) => {
  const [open, setOpen] = useState(false);
  const handler = useCallback(() => setOpen(() => false), [setOpen]);
  const ref = useClickAway<HTMLDivElement>(handler);
  //const pathname = usePathname();
  //const active = href === pathname.slice(0, href.length) ? "active" : variant;
  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setOpen((o) => !o);
  };

  const c = clsx(
    navCollapseStyles({ size, variant, open: open ? "open" : "closed" }),
    className
  );
  return (
    <div className={c}>
      <div
        ref={ref}
        className={containerStyles({ variant, open: open ? "open" : "closed" })}
        onClick={handleToggle as any}
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
};
export default NavCollapse;
