import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";
import { IconNames } from "../Icon";
//import { AppIcon} from "../AppIcon";
import { Icon as IconClass } from "../Icon/Icon";
import SectionActionsCollapse from "./SectionActionsCollapse";

const section = cva(["mn-w-full bg-white "], {
  variants: {
    variant: {
      primary: [""],
      secondary: [""],
      warning: [""],
      alert: [""],
      inner: [""],
    },
    collapsed: {
      default: [],
      collapsed: [""],
    },

    size: {
      small: ["te"],
      default: [""],
    },
  },
  defaultVariants: {
    variant: "primary",
    collapsed: "default",
    size: "default",
  },
});

const sectionHeader = cva(["flex items-center "], {
  variants: {
    variant: {
      primary: ["bg-primary-200"],
      secondary: ["bg-secondary-200"],
      warning: ["bg-warning-200"],
      alert: ["bg-red-500"],
      inner: ["overflow-x-scroll"],
    },
    collapsed: {
      default: [],
      collapsed: [""],
    },

    size: {
      small: ["te"],
      default: ["min-w-full"],
    },
  },
  defaultVariants: {
    collapsed: "default",
    variant: "primary",
    size: "default",
  },
});

const sectionTitle = cva("truncate", {
  variants: {
    variant: {
      primary: ["border-red-300"],
      secondary: ["border-green-300"],
      warning: ["text-black"],
      alert: ["text-white"],
      inner: [""],
    },
    collapsed: {
      default: [],
      collapsed: [""],
    },

    size: {
      small: ["flex-grow", "m-0", "py-1", "px-2", "text-sm"],
      default: ["flex-grow", "m-0", "py-1", "px-4", "text-lg", "font-bold"],
    },
  },
  defaultVariants: {
    collapsed: "default",
    variant: "primary",
    size: "default",
  },
});

const sectionBody = cva(["w-f"], {
  variants: {
    variant: {
      primary: ["bg-white "],
      secondary: ["bg-white"],
      paper: ["bg-paper"],
      warning: [""],
      alert: [],
      inner: [""],
    },
    collapsed: {
      default: [],
      collapsed: ["hidden m-4"],
    },
    size: {
      small: ["p-0", "shadow-sm", "text-sm"],
      default: ["flex-grow", "p-0", "shadow-lg", "text-lg"],
    },
  },
  defaultVariants: {
    variant: "primary",
    collapsed: "default",
    size: "default",
  },
});
const sectionFooter = cva(["m-0 p-0"], {
  variants: {
    variant: {
      primary: [],
      secondary: [""],
      paper: [""],
      warning: [""],
      alert: [],
      inner: [""],
    },
    collapsed: {
      default: [],
      collapsed: ["hidden"],
    },

    size: {
      small: [],
      default: [],
    },
    display: {
      footer: ["block"],
      default: ["hidden"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    collapsed: "default",
    display: "default",
  },
});

export type SectionProps = VariantProps<typeof section> &
  ComponentProps<"div"> & {
    header?: string | React.ReactNode;
    icon?: IconNames | React.ReactNode;
    Icon?: typeof IconClass;
    collapsible?: boolean;
    actions?: React.ReactNode | React.ReactNode[];
    children?: React.ReactNode | React.ReactNode[];
    footer?: React.ReactNode | React.ReactNode[];
  };

export const Section = ({
  header: title,
  Icon,
  actions,
  children,
  collapsed,
  collapsible,
  footer,
  size,
  variant,
  className,
  title: _title,
}: SectionProps) => {
  return (
    <div className={clsx(section({ size, variant, collapsed }), className)}>
      <div className={sectionHeader({ size, variant, collapsed })}>
        <div className="flex-shrink pl-2 md:pl-4">
          {!!Icon ? <Icon /> : <></>}
        </div>
        <div className={sectionTitle({ size, variant, collapsed })}>
          {_title || title}
        </div>
        <SectionActionsCollapse collapsible={collapsible} variant={variant}>
          {actions}
        </SectionActionsCollapse>
      </div>

      <div className={sectionBody({ size, variant, collapsed })}>
        {children}
      </div>
      <div
        className={sectionFooter({
          size,
          collapsed,
          variant,
          display: footer ? "footer" : "default",
        })}
      >
        {footer}
      </div>
    </div>
  );
};
