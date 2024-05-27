import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

const section = cva(["min-w-full bg-white "], {
  variants: {
    variant: {
      primary: [""],
      warning: [""],
      alert: [""],
    },
    size: {
      small: ["te"],
      default: [""],
    },
  },
  defaultVariants: {
    variant: "primary",
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
    size: {
      small: ["te"],
      default: ["min-w-full"],
    },
  },
  defaultVariants: {
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
    size: {
      small: ["flex-grow", "m-0", "py-1", "px-2", "text-sm"],
      default: ["flex-grow", "m-0", "py-1", "px-4", "text-lg", "font-bold"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});
const sectionBody = cva([""], {
  variants: {
    variant: {
      primary: ["bg-white border-red-300"],
      paper: ["bg-paper"],
      warning: [""],
      alert: [],
    },
    size: {
      small: ["p-0", "shadow-sm", "text-sm"],
      default: ["flex-grow", "p-2", "shadow-lg", "text-lg"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});
const sectionFooter = cva([""], {
  variants: {
    variant: {
      primary: [],
      paper: [""],
      warning: [""],
      alert: [],
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
    display: "default",
  },
});

export type SectionProps = VariantProps<typeof section> &
  ComponentProps<"div"> & {
    header?: string;
    icon?: any;
    actions?: React.ReactNode | React.ReactNode[];
    children?: React.ReactNode | React.ReactNode[];
    footer?: React.ReactNode | React.ReactNode[];
  };

export const Section = ({
  header: title,
  icon,
  actions,
  children,
  footer,
  size,
  variant,
  className,
  title: _title,
}: SectionProps) => {
  return (
    <div className={clsx(section({ size, variant }), className)}>
      <div className={sectionHeader({ size, variant })}>
        <div className="flex-shrink">{icon}</div>
        <h4 className={sectionTitle({ size, variant })}>{_title || title}</h4>
        <div className="grid">{actions}</div>
      </div>

      <div className={sectionBody({ size, variant })}>{children}</div>
      <div
        className={sectionFooter({
          size,
          variant,
          display: footer ? "footer" : "default",
        })}
      >
        {footer}
      </div>
    </div>
  );
};
