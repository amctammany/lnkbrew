"use client";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { useState } from "react";
import SideNavLink from "./SideNavLink";
import { DownIcon } from "../Icon/DownIcon";
import { UpIcon } from "../Icon/UpIcon";
import { MaximizeIcon } from "../Icon/MaximizeIcon";
import { MinimizeIcon } from "../Icon/MinimizeIcon";
import { Label } from "../Label";
import { usePathname } from "next/navigation";
import ChevronLeftIcon from "../Icon/ChevronLeftIcon";
import ChevronDownIcon from "../Icon/ChevronDownIcon";
//import clsx from "clsx";
//import NavLink from "./NavLink";
export type SideNavDropdownProps = {
  label?: React.ReactNode | string;
  Icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  className?: string;
} & VariantProps<typeof sideNavDropdownStyles>;
const styles = cva(
  [
    "outline-none block px-4 py-2 mt-2 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:text-gray-200 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
  ],
  {
    variants: {
      variant: {
        default: [],
        warning: [],
      },
      active: {
        default: [
          "hover:text-gray-900 hover:bg-gray-200 bg-transparent text-gray-900  ",
        ],
        active: ["text-gray-900 bg-gray-200"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
const sideNavDropdownButtonStyles = cva(
  [
    "relative flex w-full text-sm  lg:text-lg cursor-pointer justify-between rounded-md  text-left focus:outline-none focus:shadow-outline",
  ],
  {
    variants: {
      variant: {
        default: [""],
        warning: [""],
      },
      active: {
        default: [
          "text-gray-1000 font-semibold bg-transparent dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:focus:bg-gray-600 focus:text-gray-900 focus:bg-gray-200 ",
        ],
        active: [
          "text-sm font-semibold bg-transparent dark-mode:bg-transparent  ",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      active: "default",
    },
  }
);
const sideNavDropdownStyles = cva(
  [
    "last-of-type:mb-0 mr-6 border-l border-gray-200 pl-3 dark:border-gray-300 ml-4 bg-inherit",
  ],
  //"absolute right-0 w-full origin-top-right rounded-md shadow-lg px-2"],
  {
    variants: {
      variant: {
        default: ["bg-white"],
        warning: ["bg-warning-200"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export const SideNavDropdown = ({
  label = "DropDown",
  children,
  href,
  variant,
  //open,
  Icon,
  className,
}: SideNavDropdownProps) => {
  const pathname = usePathname();
  const open =
    (href?.length ?? 0) > 1 && href === pathname.slice(0, href?.length ?? 0);
  const active = open ? "active" : "default";

  const [isOpen, setIsOpen] = useState(open);
  return (
    <>
      <li className={styles({ variant, active })}>
        <Label
          className={sideNavDropdownButtonStyles({ variant, active })}
          onClick={() => setIsOpen((o) => !o)}
          text={label}
          suffix={
            <>
              <ChevronLeftIcon
                className={clsx({ hidden: isOpen, block: !isOpen })}
              />
              <ChevronDownIcon
                className={clsx({ hidden: !isOpen, block: isOpen })}
              />
            </>
          }
        >
          {Icon}
        </Label>
      </li>
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
