import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";
import { IconNames } from "../Icon";
//import { AppIcon} from "../AppIcon";
import { Icon as IconClass } from "../Icon/Icon";

const section = cva(["min-w-full bg-white "], {
  variants: {
    variant: {
      primary: [""],
      warning: [""],
      alert: [""],
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
      warning: ["bg-warning-200"],
      alert: ["bg-red-500"],
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

const sectionTitle = cva("h4", {
  variants: {
    variant: {
      primary: ["border-red-300"],
      warning: ["text-black"],
      alert: ["text-white"],
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
const sectionBody = cva([""], {
  variants: {
    variant: {
      primary: ["bg-white "],
      paper: ["bg-paper"],
      warning: [""],
      alert: [],
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
      paper: [""],
      warning: [""],
      alert: [],
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
  footer,
  size,
  variant,
  className,
  title: _title,
}: SectionProps) => {
  return (
    <div className={clsx(section({ size, variant, collapsed }), className)}>
      <div className={sectionHeader({ size, variant, collapsed })}>
        <div className="flex-shrink">{!!Icon ? <Icon /> : <></>}</div>
        <h4 className={sectionTitle({ size, variant, collapsed })}>
          {_title || title}
        </h4>
        <div className="flex">{actions}</div>
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
