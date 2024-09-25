"use client";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { useState } from "react";
//import clsx from "clsx";
//import NavLink from "./NavLink";
export type SideNavDropdownProps = {
  label?: React.ReactNode | string;
  children?: React.ReactNode;
  className?: string;
} & VariantProps<typeof sideNavDropdownStyles>;
const sideNavDropdownStyles = cva(
  ["absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg"],
  {
    variants: {
      variant: {
        default: ["bg-white"],
        warning: ["bg-warning-200"],
      },
      open: {
        default: [""],
        open: ["bg-orange-200"],
      },
    },
    defaultVariants: {
      variant: "default",
      open: "default",
    },
  }
);
export const SideNavDropdown = ({
  label,
  children,
  variant,
  open,
  className,
}: SideNavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      >
        <span>Dropdown</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className={clsx(
          sideNavDropdownStyles({ variant }),
          { hidden: !isOpen, block: isOpen },
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
export default SideNavDropdown;
