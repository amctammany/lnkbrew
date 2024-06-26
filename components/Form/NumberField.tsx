import { ComponentProps, SyntheticEvent, forwardRef } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { Input, inputStyles, InputProps } from "./Input";
import clsx from "clsx";

export type NumberFieldProps = {
  //name: string;
  //label?: string;
  //defaultValue?: any;
  //error?: SchemaFieldError;
  step?: number;
  //disabled?: oolean;
  //onChange?: (e: SyntheticEvent) => void;
  //onBlur?: (e: SyntheticEvent) => void;
  //value?: any;
  //ref: any;
} & InputProps;

const numberFieldStyles = cva("input w-full", {
  variants: {
    variant: {
      default: [
        "block",
        "disabled:bg-slate-50",
        "disabled:text-slate-500",
        "disabled:border-slate-200",
        "disabled:shadow-none",
      ],
      error: ["bg-error-200"],
    },
    size: {
      default: [""],
      small: [""],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export function NumberField({
  name,
  label,
  className,
  size,
  error,
  ...props
}: NumberFieldProps) {
  return (
    <Label
      className={className}
      size={size}
      label={label !== null ? label || name : ""}
      error={error}
    >
      <NumberFieldRaw
        //step={step || 1}
        name={name}
        //defaultValue={defaultValue}
        //onChange={onChange}
        //onBlur={onBlur}
        //value={value}
        //ref={ref}
        {...props}
      />
    </Label>
  );
}

export function NumberFieldRaw({
  className,
  size,
  variant,
  error,
  ...props
}: NumberFieldProps) {
  return (
    <Input
      className={clsx(
        inputStyles({
          variant: error ? "error" : variant,
          size,
        }),
        className
      )}
      type="number"
      onWheel={(e) => e.currentTarget.blur()}
      {...props}
    />
  );
}
