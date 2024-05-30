//import Link from "next/link";
import { Suspense } from "react";
import Body from "./Body";
import Loading from "@/app/loading";
import ClientBreadcrumbs from "../Breadcrumbs/ClientBreadcrumbs";
//import clsx from "clsx";
//import NavLink from "./NavLink";

export type SubNavProps = {
  body?: React.ReactNode;
  children?: React.ReactNode;
};
export const SubNav = ({ body, children }: SubNavProps) => {
  return (
    <>
      <nav className="flex items-center md:justify-between flex-wrap md:flex-nowrap px-5 md:py-0 bg-orange-200 ">
        <div className="flex flex-grow items-center flex-row font-medium p-2 md:p-0  md:space-x-8">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </nav>
      <ClientBreadcrumbs />

      <Body>{body}</Body>
    </>
  );
};
