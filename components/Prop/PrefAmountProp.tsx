"use client";
import { Label } from "@/components/Label";
import { VariantProps, cva } from "class-variance-authority";
//import { SchemaPropError } from "@/lib/validateSchema";
import { Input, inputStyles, InputProps } from "@/components/Form/Input";
import clsx from "clsx";
import { UnitPreferences, UserPreferences } from "@prisma/client";
import { AmountType, UnitTypes } from "@/lib/amountConversions";
import { useSession } from "next-auth/react";
import { UnitPrefs } from "@/types/User";
import Prop from "./Prop";

export type PrefAmountPropProps = InputProps &
  VariantProps<typeof prefAmountPropStyles> & {
    //name: string;
    //label?: string;
    //defaultValue?: any;
    //error?: SchemaPropError;
    step?: number;
    type: keyof UnitPrefs;
    value?: any;
    //ref: any;
  };

const prefAmountPropStyles = cva("input ", {
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

export function PrefAmountProp({
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
}: PrefAmountPropProps) {
  const sesh = useSession();
  const prefs = (sesh.data?.preferences || {}) as UnitPrefs;
  const unit = prefs[type];
  return (
    <Prop
      {...props}
      label={label !== null ? label || name : ""}
      value={value.toFixed(2)}
      unit={unit}
      //variant={variant}
      className="w-full"
    />
  );
}
