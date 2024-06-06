import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { IconButton } from "../Button/IconButton";
import clsx from "clsx";
import { StarIcon } from "../Icon/StarIcon";

const listItemActionMenuButtonStyles = cva(
  ["group-focus-within:bg-green-400 bg-blue-400"],
  {
    variants: {
      variant: {
        default: ["bg-blue-200"],
        warning: ["bg-warning-500"],
      },
      //open: {
      //open: ["bg-red-200"],
      //closed: ["bg-blue-400"],
      //},
    },

    defaultVariants: {
      variant: "default",
      //open: "closed",
    },
  }
);

const listItemActionsStyles = cva(
  ["transition ease-linear duration-200 hidden group-focus-within:flex "],
  {
    variants: {
      //variant: {
      //default: ["bg-inherit"],
      //warning: ["bg-warning-500"],
      //},
      //open: {
      //open: ["block"],
      //closed: ["hidden"],
      //},
    },
    defaultVariants: {
      //variant: "default",
      //open: "closed",
    },
  }
);

const listItemActionsMenuStyles = cva(["group flex flex-row "], {
  variants: {
    variant: {
      default: ["bg-inherit"],
      warning: ["bg-warning-500"],
    },
    //open: {
    //open: ["block"],
    //closed: ["hidden"],
    //},
  },
  defaultVariants: {
    variant: "default",
    //open: "closed",
  },
});
type ListItemActionMenuProps = VariantProps<typeof listItemActionsMenuStyles> &
  ComponentProps<"div"> & {
    children?: React.ReactNode | React.ReactNode[];
  };
export const ListItemActionsMenu = ({
  children,
  variant,
  className,
}: ListItemActionMenuProps) => {
  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (document.activeElement === e.currentTarget) {
      e.currentTarget.blur();
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };
  return (
    <div className={clsx(listItemActionsMenuStyles({ variant }), className)}>
      <div className={listItemActionsStyles({})}>{children}</div>
      <IconButton
        className={listItemActionMenuButtonStyles({})}
        Icon={StarIcon}
        onMouseDown={handleToggle}
      />
    </div>
  );
};
