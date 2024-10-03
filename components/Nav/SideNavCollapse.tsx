"use client";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { Fragment, useCallback, useMemo, useState } from "react";
import { useClickAway } from "@/lib/useClickAway";
import SideNavLink from "./SideNavLink";
import { useMediaQuery } from "@/hooks";
import ChevronDownIcon from "../Icon/ChevronDownIcon";
import ChevronRightIcon from "../Icon/ChevronRightIcon";
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
  ["group/sidenav text-center font-bold relative md:col-span-1 lg:col-span-2"],
  {
    variants: {
      variant: {
        default: ["text-slate-900 hover:text-red-500 "],
      },
      size: {
        small: ["p-0"],
        default: ["py-0 px-0"],
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
  const isSmall = useMediaQuery("(max-width: 641px)");
  const [open, setOpen] = useState(false);

  const handler = useCallback(() => {
    if (!isSmall) return;
    setOpen(() => false);
  }, [isSmall]);
  const ref = useClickAway<HTMLDivElement>(handler);
  //const pathname = usePathname();
  //const active = href === pathname.slice(0, href.length) ? "active" : variant;
  const handleToggle: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isSmall) return;
    setOpen((o) => !o);
  };

  const c = clsx(
    sideNavCollapseStyles({ size, variant, open: open ? "open" : "closed" }),
    className
  );
  return (
    <div className={c} ref={ref}>
      <div className="flex flex-grow items-center w-full border-b-2 border-black">
        <SideNavLink
          variant="title"
          label={title}
          onClick={handleToggle}
          className="flex-grow"
        >
          <div className="block md:hidden">
            <ChevronDownIcon className={clsx({ hidden: !open, block: open })} />
            <ChevronRightIcon
              className={clsx({ hidden: open, block: !open })}
            />
          </div>
        </SideNavLink>
      </div>
      <div
        className={clsx(
          containerStyles({ variant, open: open ? "open" : "closed" })
          //"sm:hidden"
        )}
        onClick={handleToggle}
      >
        {children}
      </div>
    </div>
  );
};
export default SideNavCollapse;
