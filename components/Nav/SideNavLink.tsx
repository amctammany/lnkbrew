"use client";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Label } from "../Label";

const sideNavLinkStyles = cva(
  [
    "outline-none block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
  ],
  {
    variants: {
      variant: {
        default: [""],
        blue: [],
        danger: ["text-warning-500"],
        dropdown: ["flex-row-reverse px-0 text-gray-900 bg-gray-200"],
      },
      active: {
        default: [],
        active: [
          //"outline-none block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
          //"block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
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
  }
);
export type SideNavLinkProps = VariantProps<typeof sideNavLinkStyles> & {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  label?: string | React.ReactNode;
  onClick?: any;
};
export const SideNavLink = ({
  variant,
  children,
  href = "",
  className,
  onClick,
  label,
  size,
}: SideNavLinkProps) => {
  const pathname = usePathname();
  const active =
    href?.length > 1 && href === pathname.slice(0, href.length)
      ? "active"
      : "default";
  const c = clsx(sideNavLinkStyles({ size, variant, active }), className);
  const body =
    href !== "" ? (
      <Link href={href} className={c}>
        <Label text={label || href}>{children}</Label>
      </Link>
    ) : (
      <Label
        variant="subnav"
        onClick={onClick}
        text={label || href}
        className={c}
      >
        {children}
      </Label>
    );
  return <li className="">{body}</li>;
};
export default SideNavLink;
