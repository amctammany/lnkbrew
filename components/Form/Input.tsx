import { ComponentProps, SyntheticEvent, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import clsx from "clsx";

export type InputProps = {
  name?: string;
  label?: string | React.ReactNode;
  defaultValue?: any;
  disabled?: boolean;
  error?: SchemaFieldError;
  //onChange?: (e: SyntheticEvent) => void;
  //onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref?: any;
} & ComponentProps<"input"> &
  VariantProps<typeof inputStyles>;

export const inputStyles = cva(
  "disabled:bg-slate-50 disabled:shadow-none disabled:text-slate-500 disabled:border-slate-200",
  {
    variants: {
      variant: {
        error: ["border-2 border-red-500"],
        inline: ["inline-block"],
        default: ["block"],
      },
      inputSize: {
        default: [],
        full: ["w-full"],
        small: ["w-8"],
      },
    },
    defaultVariants: { inputSize: "default", variant: "default" },
  }
);
export function Input({
  //name,
  //onChange,
  //onBlur,
  //value,
  error,
  className,
  //disabled,
  label,
  //defaultValue,
  variant,
  inputSize,
  //ref,
  ...props
}: InputProps) {
  return (
    <input
      className={clsx(
        inputStyles({
          variant: error ? "error" : variant,
          inputSize,
        }),
        className
      )}
      type={props.type ?? "text"}
      {...props}
    />
  );
}
