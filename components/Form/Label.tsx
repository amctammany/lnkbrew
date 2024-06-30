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
const labelStyles = cva([""], {
  variants: {
    variant: {
      default: ["mx-0 mb-2 p-2 block"],
      error: ["border-warning-500 border-2"],
      inline: ["grid grid-cols-2"],
    },
    inputSize: {
      default: ["px-2 py-1", ""],
      full: [],
      small: ["p-0"],
    },
  },
  defaultVariants: { inputSize: "default", variant: "default" },
});
const labelLabelStyles = cva(["block capitalize my-auto"], {
  variants: {
    variant: {
      default: ["text-gray-600"],
      error: ["text-warning-400"],
      inline: [""],
    },
    inputSize: {
      default: ["h-6"],
      full: [],
      small: ["h-4"],
    },
  },
  defaultVariants: { inputSize: "default", variant: "default" },
});
const errorStyles = cva(["capitalize text-warning-400"], {
  variants: {
    variant: {
      default: ["hidden"],
      error: ["block"],
      inline: [],
    },
    inputSize: {
      default: [""],
      full: ["w-full"],
      small: [""],
    },
  },
  defaultVariants: { inputSize: "default", variant: "default" },
});

export const Label = ({
  children,
  error,
  label,
  variant,
  inputSize,
  className,
}: LabelProps) => {
  return (
    <label
      className={clsx(
        labelStyles({ variant: error ? "error" : variant, inputSize }),
        className
      )}
    >
      <span
        className={labelLabelStyles({
          variant: error ? "error" : variant,
          inputSize,
        })}
      >
        {label}
      </span>
      {children}
      <span
        className={errorStyles({
          variant: error ? "error" : variant,
          inputSize,
        })}
      >
        {error?.message}
      </span>
    </label>
  );
};
