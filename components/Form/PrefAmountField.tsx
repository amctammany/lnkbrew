"use client";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { Input, inputStyles, InputProps } from "./Input";
import clsx from "clsx";
import { UnitPreferences, UserPreferences } from "@prisma/client";
import { AmountType, UnitTypes } from "@/lib/amountConversions";
import { useSession } from "next-auth/react";
import { UnitPrefs } from "@/types/User";

export type PrefAmountFieldProps = {
  //name: string;
  //label?: string;
  //defaultValue?: any;
  //error?: SchemaFieldError;
  step?: number;
  type: keyof UnitPrefs;
  //value?: any;
  //ref: any;
  unit?: UnitTypes;
} & InputProps &
  VariantProps<typeof prefAmountFieldStyles>;

const prefAmountFieldStyles = cva("input ", {
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
      default: ["w-auto"],
      small: ["w-auto"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export function PrefAmountField({
  name,
  label,
  variant,
  size,
  className,
  type,
  inputSize = "full",
  error,
  suffix,
  defaultValue,
  value,
  unit: _unit,
  ...props
}: PrefAmountFieldProps) {
  const sesh = useSession();
  const prefs = (sesh.data?.preferences || {}) as UnitPrefs;
  const unit = _unit ?? prefs[type];
  return (
    <Label
      //classname={clsx(prefAmountFieldStyles({ variant, size }))}
      suffix={unit}
      variant={variant}
      inputSize={inputSize}
      className={className}
      label={label !== null ? label || name : ""}
      error={error}
    >
      <Input
        className="w-full"
        type="number"
        name={name}
        error={error}
        variant={variant}
        inputSize={inputSize}
        value={value?.toFixed(2)}
        {...props}
      />
    </Label>
  );
}
