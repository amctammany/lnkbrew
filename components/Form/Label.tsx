import { type SchemaFieldError } from "@/lib/validateSchema";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

export type LabelProps = {
  children?: React.ReactNode;
  error?: SchemaFieldError;
  label?: string | React.ReactNode;
} & VariantProps<typeof labelStyles> &
  ComponentProps<"label">;
const labelStyles = cva(["block "], {
  variants: {
    variant: {
      default: ["m-0"],
      error: ["border-warning-500 border-2"],
    },
    size: {
      default: ["mx-0 mb-2", "p-2"],
      small: ["p-0"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});
const labelLabelStyles = cva(["block capitalize"], {
  variants: {
    variant: {
      default: ["text-gray-600"],
      error: ["text-warning-400"],
    },
    size: {
      default: ["h-6"],
      small: ["h-4"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});
const errorStyles = cva(["capitalize text-warning-400"], {
  variants: {
    variant: {
      default: ["hidden"],
      error: ["block"],
    },
    size: {
      default: [""],
      small: [""],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export const Label = ({
  children,
  error,
  label,
  variant,
  size,
  className,
}: LabelProps) => {
  return (
    <label
      className={clsx(
        labelStyles({ variant: error ? "error" : variant, size }),
        className
      )}
    >
      <span
        className={labelLabelStyles({
          variant: error ? "error" : variant,
          size,
        })}
      >
        {label}
      </span>
      {children}
      <span
        className={errorStyles({ variant: error ? "error" : variant, size })}
      >
        {error?.message}
      </span>
    </label>
  );
};
