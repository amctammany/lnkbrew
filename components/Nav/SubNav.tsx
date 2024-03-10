import Link from "next/link";
//import clsx from "clsx";
//import NavLink from "./NavLink";

export type SubNavProps = {
  title?: string;
  children?: React.ReactNode;
};
export const SubNav = ({ title, children }: SubNavProps) => {
  return (
    <nav className="flex items-center md:justify-between flex-wrap md:flex-nowrap px-5 md:py-0 bg-slate-200">
      <h4>{title}</h4>
      <div className="flex flex-grow items-center flex-row font-medium p-2 md:p-0  md:space-x-8">
        {children}
      </div>
    </nav>
  );
};
