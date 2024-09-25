"use client";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sideNavLinkStyles = cva([""], {
  variants: {
    variant: {
      default: [
        "outline-none block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline target:bg-red-400",
      ],
      blue: [],
    },
    active: {
      default: [],
      active: [
        "block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
      ],
    },
    size: {
      default: [],
      small: [],
      large: [],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    active: "default",
  },
});
export type SideNavLinkProps = VariantProps<typeof sideNavLinkStyles> & {
  href: string;
  children: React.ReactNode;
  className?: string;
};
export const SideNavLink = ({
  variant,
  children,
  href,
  className,
  size,
}: SideNavLinkProps) => {
  const pathname = usePathname();
  const active =
    href.length > 1 && href === pathname.slice(0, href.length)
      ? "active"
      : "default";
  const c = clsx(sideNavLinkStyles({ size, variant, active }), className);
  return (
    <Link id={href.slice(1)} href={href} className={c}>
      {children}
    </Link>
  );
};
export default SideNavLink;
