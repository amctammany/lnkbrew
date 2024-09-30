"use client";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { Input, inputStyles, InputProps } from "./Input";
import clsx from "clsx";
import { UnitPreferences, UserPreferences } from "@prisma/client";
import { AmountType, UnitTypes } from "@/lib/amountConversions";
import { useSession } from "next-auth/react";
type Preferences = Omit<UnitPreferences, "id"> & {
  mass?: UnitTypes;
  percent?: UnitTypes;
  potential?: UnitTypes;
  unit?: UnitTypes;
  percentage?: UnitTypes;
};

export type PrefAmountFieldProps = {
  //name: string;
  //label?: string;
  //defaultValue?: any;
  //error?: SchemaFieldError;
  step?: number;
  type: keyof Preferences;
  //value?: any;
  //ref: any;
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
  ...props
}: PrefAmountFieldProps) {
  const sesh = useSession();
  const prefs = (sesh.data?.preferences || {}) as Preferences;
  const unit = prefs[type];
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
        value={value}
        {...props}
      />
    </Label>
  );
}
