import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, useState } from "react";
import { IconButton } from "../Button/IconButton";

const listItemActionMenuButtonStyles = cva([""], {
  variants: {
    variant: {
      default: ["bg-inherit"],
      warning: ["bg-warning-500"],
    },
    open: {
      open: ["bg-red-200"],
      closed: ["bg-blue-400"],
    },
  },

  defaultVariants: {
    variant: "default",
    open: "closed",
  },
});

const listItemActionsStyles = cva(
  ["flex transition ease-linear duration-200"],
  {
    variants: {
      //variant: {
      //default: ["bg-inherit"],
      //warning: ["bg-warning-500"],
      //},
      open: {
        open: ["block"],
        closed: ["hidden"],
      },
    },
    defaultVariants: {
      //variant: "default",
      open: "closed",
    },
  }
);

const listItemActionsMenuStyles = cva(["flex flex-row"], {
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
  const [open, setOpen] = useState(false);

  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setOpen((o) => !o);
  };
  return (
    <div className={listItemActionsMenuStyles({ variant })}>
      <div
        className={listItemActionsStyles({ open: open ? "open" : "closed" })}
      >
        {children}
      </div>
      <IconButton
        className={listItemActionMenuButtonStyles({
          open: open ? "open" : "closed",
        })}
        iconType="StarIcon"
        onClick={handleToggle}
      />
    </div>
  );
};
