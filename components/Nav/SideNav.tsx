//import Link from "next/link";
import { Suspense } from "react";
import Body from "./Body";
import Loading from "@/app/loading";
import ClientBreadcrumbs from "../Breadcrumbs/ClientBreadcrumbs";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
//import clsx from "clsx";
//import NavLink from "./NavLink";
export type SideNavProps = {
  body?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  listClassName?: string;
} & VariantProps<typeof sideNavStyles>;
const sideNavStyles = cva(["md:flex-nowrap md:py-0 h-full min-h-screen"], {
  variants: {
    variant: {
      default: ["bg-white"],
      warning: ["bg-warning-200"],
    },
    color: {
      default: [""],
      orange: ["bg-orange-200"],
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
  },
});
const sideNavListStyles = cva(["px-1 mb-8 last-of-type:mb-0"], {
  variants: {
    variant: {
      default: ["bg-white"],
      warning: ["bg-warning-200"],
    },
    color: {
      default: [""],
      orange: ["bg-orange-200"],
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
  },
});

export const SideNav = ({
  body,
  children,
  variant,
  color,
  className,
  listClassName,
}: SideNavProps) => {
  return (
    <div className="grid grid-flow-col grid-cols-4  lg:grid-cols-8 m-0">
      <nav className={clsx(sideNavStyles({ variant, color }), className)}>
        <ul
          className={clsx(sideNavListStyles({ variant, color }), listClassName)}
        >
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ul>
      </nav>

      <Body className="col-span-3 lg:col-span-7 bg-paper p-0">{body}</Body>
    </div>
  );
};
/*
        <div className="grid grid-flow-row font-medium p-2 md:p-0  md:pace-x-8">
        </div>
 */
