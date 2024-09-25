"use client";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinkStyles = cva(["flex text-center font-bold "], {
  variants: {
    variant: {
      active: [
        "text-red-500 hover:text-slate-400 hover:fill-slate-400 fill-red-500",
      ],
      default: ["text-white hover:text-slate-400 hover:fill-slate-400 "],
      sidenav: [
        "text-black hover:text-white hover:fill-white border border-black px-0 py-2 text-lg",
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
  const active = href === pathname.slice(0, href.length) ? "active" : variant;
  const c = clsx(navLinkStyles({ size, variant: active }), className);
  return (
    <Link href={href} className={c}>
      {children}
    </Link>
  );
};
export default NavLink;
