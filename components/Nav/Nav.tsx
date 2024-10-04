import Link from "next/link";
import { AdminNav } from "@/app/admin/_components/AdminNav";
import Loading from "@/app/loading";
import { Suspense } from "react";
import { IconButton } from "../Button/IconButton";
import NavCollapse from "./NavCollapse";
import { Searchbar } from "../Searchbar";
import { SearchIcon } from "../Icon/SearchIcon";
//import clsx from "clsx";
//import NavLink from "./NavLink";

export type NavProps = {
  children?: React.ReactNode;
};
export const Nav = ({ children }: NavProps) => {
  return (
    <nav className="flex items-center md:justify-between flex-wrap md:flex-nowrap px-5 md:py-2 bg-slate-700">
      <div className="flex flex-grow items-end ">
        <div className="flex-grow md:flex-none m-auto py-1 md:py-2 px-0 md:px-1 ">
          <Link
            href="/"
            className="flex-grow md:hidden text-slate-200 font-extrabold text-sm lg:text-xl py-1 px-4 mr-4"
          >
            LNK
          </Link>

          <Link
            href="/"
            className="flex-none hidden md:block text-slate-200 font-extrabold text-sm lg:text-xl py-1 px-4 mr-4"
          >
            LNK Brewing
          </Link>
        </div>
        <div className="flex-grow grid justify-items-end my-auto ">
          <div className="text-right inline-flex h-8 bg-slate-200">
            <SearchIcon
              size="medium"
              className="my-auto flex-shrink border-r-0 text-black font-bold mx-1"
            />
            <input type="search" className="md:w-48" />
          </div>
        </div>
        <div className="flex-shrink m-auto">
          <Suspense fallback={<Loading />}>
            <AdminNav />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};
