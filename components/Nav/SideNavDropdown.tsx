"use client";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { useState } from "react";
import SideNavLink from "./SideNavLink";
import { DownIcon } from "../Icon/DownIcon";
import { UpIcon } from "../Icon/UpIcon";
import { MaximizeIcon } from "../Icon/MaximizeIcon";
import { MinimizeIcon } from "../Icon/MinimizeIcon";
//import clsx from "clsx";
//import NavLink from "./NavLink";
export type SideNavDropdownProps = {
  label?: React.ReactNode | string;
  Icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
} & VariantProps<typeof sideNavDropdownStyles>;
const sideNavDropdownButtonStyles = cva(
  [
    "hover:text-gray-1000 relative flex w-full cursor-pointer items-center justify-between rounded-md py-1 pl-2 text-left text-gray-1000 text-sm font-semibold bg-transparent dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
    //"flex flex-row items-center w-full px-4 py-2 mt-2",
  ],
  {
    variants: {
      variant: {
        default: [""],
        warning: [""],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
const sideNavDropdownStyles = cva(
  [
    "last-of-type:mb-0 mr-6 border-l border-gray-200 pl-3 dark:border-gray-300 ml-4",
  ],
  //"absolute right-0 w-full origin-top-right rounded-md shadow-lg px-2"],
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
  label = "DropDown",
  children,
  variant,
  open,
  Icon,
  className,
}: SideNavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SideNavLink
        className="relative h-fit"
        variant="dropdown"
        onClick={() => setIsOpen((o) => !o)}
        label={
          <div className="flex flex-row">
            {Icon ? Icon : null}
            <span className="ml-0">{label}</span>
          </div>
        }
      >
        <MaximizeIcon className={clsx({ hidden: !isOpen, block: isOpen })} />
        <MinimizeIcon className={clsx({ hidden: isOpen, block: !isOpen })} />
      </SideNavLink>
      <ul
        className={clsx(
          sideNavDropdownStyles({ variant }),
          { hidden: !isOpen, block: isOpen },
          className
        )}
      >
        {children}
      </ul>
    </>
  );
};
export default SideNavDropdown;
