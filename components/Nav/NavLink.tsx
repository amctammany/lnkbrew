"use client";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinkStyles = cva(["flex text-center font-bold "], {
  variants: {
    variant: {
      //active: [
      //"text-red-500 hover:text-slate-400 hover:fill-slate-400 fill-red-500",
      //],
      default: [" text-white hover:text-slate-400 hover:fill-slate-400 "],
      sidenav: [
        "outline-none block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline target:bg-red-400",
      ],
      subnav: ["text-black hover:text-white hover:fill-white"],
      danger: ["text-red-400 hover:text-red-700 hover:underline"],
    },
    active: {
      active: ["underline fill-red-400 stroke-red-800"],
      default: [""],
    },
    size: {
      small: ["p-0"],
      default: ["py-2 px-4"],
    },
  },
  defaultVariants: {
    variant: "default",
    active: "default",
    size: "default",
  },
});
export type NavLinkProps = VariantProps<typeof navLinkStyles> & {
  href: string;
  children: React.ReactNode;
  className?: string;
};
export const NavLink = ({
  variant,
  children,
  href,
  className,
  size,
}: NavLinkProps) => {
  const pathname = usePathname();
  const active = href === pathname.slice(0, href.length) ? "active" : "default";
  const c = clsx(navLinkStyles({ size, variant, active }), className);
  return (
    <Link id={href.slice(1)} href={href} className={c}>
      {children}
    </Link>
  );
};
export default NavLink;
