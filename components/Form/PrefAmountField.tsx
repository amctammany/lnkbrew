"use client";
import {
  ComponentProps,
  SyntheticEvent,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { Input, inputStyles, InputProps } from "./Input";
import clsx from "clsx";
import { UnitPreferences, UserPreferences } from "@prisma/client";

export type PrefAmountFieldProps = {
  //name: string;
  //label?: string;
  //defaultValue?: any;
  //error?: SchemaFieldError;
  step?: number;
  type: keyof Omit<UnitPreferences, "id">;
  preferences?: Omit<UnitPreferences, "id">;
  //disabled?: oolean;
  //onChange?: (e: SyntheticEvent) => void;
  //onBlur?: (e: SyntheticEvent) => void;
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
  preferences = {
    time: "min",
    temperature: "F",
    color: "L",
    volume: "gal",
    fermentableMass: "Lb",
    hopMass: "Oz",
    gravity: "SG",
  },
  className,
  type,
  inputSize = "full",
  error,
  suffix,
  defaultValue,
  value,
  ...props
}: PrefAmountFieldProps) {
  const unit = preferences[type];
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

export function PrefAmountFieldRaw({
  //className,
  //size,
  //variant,
  type,
  error,
  ...props
}: PrefAmountFieldProps) {
  return (
    <input type="number" onWheel={(e) => e.currentTarget.blur()} {...props} />
  );
}
