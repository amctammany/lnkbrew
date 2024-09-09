import Link, { LinkProps } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { URL } from "url";

const buttonStyles = cva(
  [
    "flex items-center  text-bold justify-center border-2 border-black disabled:bg-red-900",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-default-500",
          "hover:bg-default-200",
          "text-contrast-default",
          "hover:text-default-900",
        ],
        primary: [
          "bg-primary-500",
          "hover:bg-primary-200",
          "text-contrast-primary",
          "hover:text-primary-900",
        ],
        success: ["bg-success-500", "hover:bg-success-100"],
        warning: [
          "bg-warning-700",
          "hover:bg-warning-200",
          "text-black",
          "hover:text-warning-800",
        ],
        dark: ["bg-green-900", "hover:bg-slate-800", "text-white"],
        toolbar: [
          "bg-default-400 font-bold hover:bg-default-100 text-white hover:text-black",
        ],
      },
      size: {
        default: ["rounded", "m-2", "px-2", "py-1"],
        button: ["rounded", "h-10", "w-32"],
        tiny: ["p-1", "m-1", "text-xs"],
        tinyIcon: ["p-1", "m-1", "text-xs", "rounded-lg"],
        toolbar: ["px-2", "py-1", "mx-2", "text-xs"],
        icon: ["rounded-full", "w-20", "h-20", "p-2.5"],
        iconSmall: ["rounded-full", "w-10", "h-10", "p-1.5"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = VariantProps<typeof buttonStyles> &
  ComponentProps<"button"> & { disabled?: boolean };

//"bg-primary-button",
export const Button = ({
  variant,
  disabled,
  size,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        buttonStyles({
          variant,
          size,
          //disabled: disabled ? "disabled" : "default",
        }),
        className
      )}
    />
  );
};

export default Button;
