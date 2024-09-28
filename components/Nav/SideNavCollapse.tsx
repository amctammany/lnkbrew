"use client";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { IconButton } from "../Button";
import { useCallback, useMemo, useState } from "react";
import { useClickAway } from "@/lib/useClickAway";
import { MaximizeIcon } from "../Icon/MaximizeIcon";
import { MinimizeIcon } from "../Icon/MinimizeIcon";
import SideNavLink from "./SideNavLink";
//import Link from "next/link";
//import { usePathname } from "next/sideNavigation";

const containerStyles = cva(["bg-slae-800 flex-grow"], {
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
const sideNavCollapseStyles = cva(
  ["group/sidenav text-center font-bold relative z-20"],
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
export type SideNavCollapseProps = VariantProps<
  typeof sideNavCollapseStyles
> & {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
};
export const SideNavCollapse = ({
  variant,
  children,
  className,
  title,
  size,
}: SideNavCollapseProps) => {
  const [open, setOpen] = useState(true);
  const handler = useCallback(() => setOpen((o) => false), [setOpen]);
  const ref = useClickAway<HTMLDivElement>(handler);
  //const pathname = usePathname();
  //const active = href === pathname.slice(0, href.length) ? "active" : variant;
  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setOpen((o) => !o);
  };

  const c = clsx(
    sideNavCollapseStyles({ size, variant, open: open ? "open" : "closed" }),
    className
  );
  return (
    <div ref={ref} className={c}>
      <div className="flex flex-grow items-center w-full">
        <SideNavLink label={title} onClick={handleToggle} className="flex-grow">
          <MaximizeIcon className={clsx({ hidden: !open, block: open })} />
          <MinimizeIcon className={clsx({ hidden: open, block: !open })} />
        </SideNavLink>
      </div>
      <div
        className={clsx(
          containerStyles({ variant, open: open ? "open" : "closed" }),
          "sm:hidden"
        )}
        onClick={handleToggle as any}
      >
        {children}
      </div>
      <div
        className={clsx(
          containerStyles({ variant, open: "open" }),
          "hidden sm:block"
        )}
        //onClick={handleToggle as any}
      >
        {children}
      </div>
    </div>
  );
};
export default SideNavCollapse;
