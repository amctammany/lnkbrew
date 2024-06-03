"use client";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { IconButton } from "../Button";
//import Link from "next/link";
//import { usePathname } from "next/navigation";

const navCollapseStyles = cva(["sm:hidden group flex text-center font-bold "], {
  variants: {
    variant: {
      default: ["text-white hover:text-red-500 "],
    },
    size: {
      small: ["p-0"],
      default: ["py-2 px-4"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
export type NavCollapseProps = VariantProps<typeof navCollapseStyles> & {
  children: React.ReactNode;
  className?: string;
};
export const NavCollapse = ({
  variant,
  children,
  className,
  size,
}: NavCollapseProps) => {
  //const pathname = usePathname();
  //const active = href === pathname.slice(0, href.length) ? "active" : variant;
  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (document.activeElement === e.currentTarget) {
      e.currentTarget.blur();
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  const c = clsx(navCollapseStyles({ size, variant }), className);
  return (
    <div className={c}>
      <IconButton
        className="group-focus-within:bg-blue-400"
        iconType="MinimizeIcon"
        onMouseDown={handleToggle}
      />

      <div className="hidden group-focus-within:block">{children}</div>
    </div>
  );
};
export default NavCollapse;
