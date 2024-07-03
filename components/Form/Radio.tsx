"use client";
import { ComponentProps, SyntheticEvent, forwardRef, useMemo } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { inputStyles } from "./Input";
import clsx from "clsx";

type ErrorType = {
  type: string;
  path: string;
  message?: string;
};
export type RadioProps = {
  name: string;
  label?: string;
  error?: SchemaFieldError;
  defaultValue?: any;
  disabled?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  options?: Record<string | number, string | number>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  //onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref?: any;
} & VariantProps<typeof radioStyles> &
  ComponentProps<"input">;
const radioInputStyles = cva("absolute opacity-0 cursor-pointer h-0 w-0 peer", {
  variants: {
    variant: {
      default: [],
      inline: [],
    },
    inputSize: {
      default: [],
      full: [],
      small: [],
    },
  },
  defaultVariants: {
    variant: "default",
    inputSize: "default",
  },
});

const radioGroupStyles = cva(
  "grid grid-flow-col auto-cols-auto border border-black",
  {
    variants: {
      variant: {
        default: [],
        inline: [],
      },
      inputSize: {
        default: [],
        full: [],
        small: [],
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);
const radioLabelStyles = cva(
  "block align-middle text-center w-full px-2 py-4 text-xl m-auto peer-checked:bg-info-400 ",
  {
    variants: {
      variant: {
        default: [],
        inline: [],
      },
      inputSize: {
        default: [],
        full: [],
        small: [],
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

const radioStyles = cva("", {
  variants: {
    variant: {
      default: [
        "block",
        "disabled:bg-slate-50",
        "disabled:text-slate-500",
        "disabled:border-slate-200",
        "disabled:shadow-none",
        "invalid:bg-black",
      ],
      inline: ["inline-block"],
    },
    inputSize: {
      default: ["w-full content-center"],
      full: ["w-full"],
      small: [""],
    },
  },
  defaultVariants: { inputSize: "default", variant: "default" },
});

export function Radio({
  label,
  error,
  name,
  //children,
  options = {},
  //disabled,
  //defaultValue,
  value,
  inputSize,
  onChange,
  onBlur,
  variant,
  className,
  ...props
  //size,
  //ref,
}: RadioProps) {
  const inputs = useMemo(
    () =>
      Object.entries(options).map(([k, op]) => (
        <label key={k} className="relative flex-grow select-none block w-full">
          <input
            type="radio"
            name={name}
            className={radioInputStyles({ inputSize, variant })}
            onChange={onChange}
            onBlur={onBlur}
            value={op}
            checked={value === op}
          />
          <span className={radioLabelStyles({ inputSize, variant })}>{op}</span>
        </label>
      )),
    [options, name, inputSize, onBlur, onChange, value, variant]
  );
  return (
    <Label
      className={clsx("block relative", className)}
      error={error}
      inputSize={inputSize}
      variant="inline"
      label={label === undefined ? name : label!}
    >
      <div className={radioGroupStyles({ variant, inputSize })}>{inputs}</div>
    </Label>
  );
}
