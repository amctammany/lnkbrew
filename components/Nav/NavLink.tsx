"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};
export const NavLink = ({ children, href, className }: NavLinkProps) => {
  const pathname = usePathname();
  const active = href === pathname.slice(0, href.length);
  console.log({ pathname, active });
  const c = clsx(
    "block text-center py-2 px-4 font-bold -white hover:text-red-500 ",
    active ? "text-yellow-200 " : "text-white",
    className
  );
  return (
    <Link href={href} className={c}>
      {children}
    </Link>
  );
};
export default NavLink;
