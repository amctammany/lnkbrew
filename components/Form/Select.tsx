"use client";
import { ComponentProps, SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";

type ErrorType = {
  type: string;
  path: string;
  message?: string;
};
export type SelectProps = {
  name: string;
  label?: string;
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
const selectStyles = cva("input w-full", {
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
    },
    size: {
      default: [""],
      small: [""],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export function Select({
  name,
  label,
  error,
  children,
  options,
  disabled,
  defaultValue,
  value,
  onChange,
  onBlur,
  variant,
  className,
  size,
  ref,
}: SelectProps) {
  const opts = options
    ? Object.entries(options).map(([k, v]) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))
    : children;
  return (
    <Label
      className={className}
      error={error}
      size={size}
      label={label === undefined ? name : label}
    >
      <select
        disabled={disabled}
        className={selectStyles({ size, variant })}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      >
        {opts}
      </select>
    </Label>
  );
}
