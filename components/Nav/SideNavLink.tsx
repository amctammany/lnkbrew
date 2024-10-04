"use client";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Label } from "../Label";

const sideNavLinkStyles = cva(
  [
    "outline-none block px-4 py-2 mt-2 text-sm lg:text-lg font-semibold rounded-lg  focus:outline-none focus:shadow-outline",
  ],
  {
    variants: {
      variant: {
        default: [""],
        title: ["font-bold text-lg "],
        blue: [],
        danger: ["text-warning-500"],
        dropdown: ["flex-row-reverse px-0 text-gray-900 bg-gray-200"],
      },
      active: {
        default: [
          "text-gray-900 bg-transparent dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200",
        ],
        active: ["text-gray-200 bg-gray-400"],
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
      <Link href={href} prefetch={false} className={"flex-grow m-0"}>
        <Label text={label || href} textClassName={"m-0"}>
          {children}
        </Label>
      </Link>
    ) : (
      <Label
        //variant="subnav"
        //order="reverse"
        onClick={onClick}
        text={label || href}
        textClassName={"m-0"}
      >
        {children}
      </Label>
    );
  return <li className={c}>{body}</li>;
};
export default SideNavLink;
