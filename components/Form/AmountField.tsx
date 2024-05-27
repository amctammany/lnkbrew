import { ComponentProps, forwardRef } from "react";
import { Label } from "./Label";
import { cva } from "class-variance-authority";
import {
  //TimeUnit,
  UserMassPreference,
  UserVolumePreference,
  //YeastAmountType,
} from "@prisma/client";
import clsx from "clsx";
import { AmtField } from "./AmtField";
import { LbOzField } from "./LbOzField";
import { InputProps } from "./Input";
import { UseFormRegisterReturn } from "react-hook-form";
const massFactors: Record<UserMassPreference, number> = {
  Kg: 1,
  g: 1000,
  Lb: 2.20462,
  LbOz: 2.20462,
  Oz: 2.20462 * 16,
};
export function getAmount(value: number | undefined, type: UserMassPreference) {
  return value === undefined ? 0 : value * massFactors[type];
}

export type AmountFieldProps = {
  amountType?:
    | UserMassPreference
    //| TimeUnit
    //| YeastAmountType
    | UserVolumePreference
    | "%"
    | "PPG"
    | "ppm"
    | "°L"
    | "°Lintner"
    | "gal/hr";
  amountTypes?: Record<string, string>;
  amountTypeProps?: UseFormRegisterReturn;
  options?: any;
  step?: number;
} & InputProps;
export const amountFieldStyles = cva("input", {
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
      default: ["w-full"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export const AmountField = forwardRef<HTMLInputElement, AmountFieldProps>(
  function AmountField(
    {
      name,
      label,
      amountType,
      options,
      step,
      defaultValue,
      disabled,
      onBlur,
      onChange,
      value,
      variant,
      size,
      error,
      className,
      amountTypes,
      amountTypeProps,
      children,
    }: AmountFieldProps,
    ref
  ) {
    //const translatedValue = getAmount(value, amountType);
    const Comp = amountType === "LbOz" ? LbOzField : AmtField;
    const opts = Array.isArray(options)
      ? options
      : Object.entries(options || {});
    return (
      <Label
        className={clsx("", className)}
        label={label || name}
        error={error}
      >
        <Comp
          disabled={disabled || false}
          className={amountFieldStyles({
            variant: error ? "error" : variant,
            size,
          })}
          amountType={amountType}
          amountTypes={amountTypes}
          amountTypeProps={amountTypeProps}
          //options={opts}
          //type="number"
          step={step || 1}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
        >
          {children}
        </Comp>
      </Label>
    );
  }
);
