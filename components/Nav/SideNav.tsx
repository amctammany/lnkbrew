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
} & VariantProps<typeof sideNavStyles>;
const sideNavStyles = cva(["md:flex-nowrap md:py-0 h-full min-h-40"], {
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
}: SideNavProps) => {
  return (
    <div className="grid grid-flow-col grid-cols-4 m-0">
      <nav className={clsx(sideNavStyles({ variant, color }), className)}>
        <div className="grid grid-flow-row font-medium p-2 md:p-0  md:pace-x-8">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </nav>

      <Body className="col-span-3 bg-paper p-4">{body}</Body>
    </div>
  );
};
