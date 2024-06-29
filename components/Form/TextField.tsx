import { ComponentProps, SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { Input, InputProps, inputStyles } from "./Input";

export type TextFieldProps = InputProps;
const textFieldStyles = cva(
  "disabled:bg-slate-50 disabled:shadow-none disabled:text-slate-500 disabled:border-slate-200",
  {
    variants: {
      variant: {
        error: ["border-2 border-red-500"],
        default: ["block"],
      },
      size: {
        default: ["w-full"],
        small: [""],
      },
    },
    defaultVariants: { size: "default", variant: "default" },
  }
);
export function TextField({
  name,
  error,
  className,
  label,
  variant,
  size,
  inputSize = "full",
  ...props
}: TextFieldProps) {
  return (
    <Label
      variant={variant}
      inputSize={inputSize}
      error={error}
      className={className}
      label={label || name}
    >
      <Input
        type="text"
        name={name}
        error={error}
        variant={variant}
        inputSize={inputSize}
        {...props}
      />
    </Label>
  );
}
