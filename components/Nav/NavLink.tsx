"use client";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinkStyles = cva(["block text-center font-bold "], {
  variants: {
    variant: {
      default: ["text-white hover:text-red-500"],
      subnav: ["text-blue-500 hover:text-blue-700 hover:underline"],
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
    variant: "default",
    active: "active",
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
  const c = clsx(navLinkStyles({ active, size, variant }), className);
  return (
    <Link href={href} className={c}>
      {children}
    </Link>
  );
};
export default NavLink;
