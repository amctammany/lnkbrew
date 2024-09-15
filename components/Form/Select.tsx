"use client";
import { ComponentProps, SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { inputStyles } from "./Input";

type ErrorType = {
  type: string;
  path: string;
  message?: string;
};
export type SelectProps = {
  name: string;
  label?: string | React.ReactNode;
  error?: SchemaFieldError;
  defaultValue?: any;
  disabled?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  options?: Record<string | number, string | number>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;

  //onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref?: any;
} & VariantProps<typeof selectStyles> &
  ComponentProps<"select">;
const selectStyles = cva("", {
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

export function Select({
  //name,
  label,
  error,
  //children,
  options,
  //disabled,
  //defaultValue,
  //value,
  inputSize,
  //onChange,
  //onBlur,
  variant,
  className,
  ...props
  //size,
  //ref,
}: SelectProps) {
  const opts = options
    ? Object.entries(options).map(([k, v]) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))
    : props.children;
  return (
    <Label
      className={className}
      error={error}
      inputSize={inputSize}
      //variant="inline"
      label={label === undefined ? props.name : label!}
    >
      <select {...props} className={selectStyles({ inputSize, variant })}>
        {opts}
      </select>
    </Label>
  );
}
