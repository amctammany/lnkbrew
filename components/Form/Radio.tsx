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
  //name: string;
  label?: string;
  error?: SchemaFieldError;
  //defaultValue?: any;
  //disabled?: boolean;
  //children?: React.ReactNode | React.ReactNode[];
  option?: string;
  //options?: Record<string | number, string | number>;
  //onChange?: React.ChangeEventHandler<HTMLInputElement>;
  //onChange?: (e: SyntheticEvent) => void;
  //onBlur?: (e: SyntheticEvent) => void;
  //value?: any;
  //ref?: any;
} & VariantProps<typeof radioStyles> &
  ComponentProps<"input">;

const radioLabelStyles = cva(
  "block align-middle text-center w-full px-2 py-2 text-lg m-auto peer-checked:bg-info-400 ",
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
  name,
  option,
  inputSize,
  variant,
  className,
  ...props
}: RadioProps) {
  return (
    <label className="group relative flex-grow select-none block w-full">
      <input
        type="radio"
        name={name}
        className="absolute opacity-0 cursor-pointer h-0 w-0 peer"
        {...props}
      />
      <span className={radioLabelStyles({ inputSize, variant })}>{label}</span>
    </label>
  );
}
