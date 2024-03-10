"use client";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinkStyles = cva(["block text-center font-bold hover:text-red-500"], {
  variants: {
    variant: {
      default: ["text-blue-400"],
      subnav: ["text-green-300"],
    },
    active: {
      active: ["text-yellow-500"],
      default: [""],
    },
    size: {
      small: ["p-0"],
      default: ["py-2 px-4"],
    },
  },
  defaultVariants: {
    active: "active",
    size: "default",
  },
});
export type NavLinkProps = VariantProps<typeof navLinkStyles> & {
  href: string;
  children: React.ReactNode;
  className?: string;
};
export const NavLink = ({ children, href, className, size }: NavLinkProps) => {
  const pathname = usePathname();
  const active = href === pathname.slice(0, href.length) ? "active" : "default";
  const c = clsx(navLinkStyles({ active, size }), className);
  return (
    <Link href={href} className={c}>
      {children}
    </Link>
  );
};
export default NavLink;
