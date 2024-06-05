import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

export type InlinePropProps = {
  label?: React.ReactNode;
  value?: React.ReactNode;
  unit?: React.ReactNode;
} & VariantProps<typeof inlinePropStyles> &
  ComponentProps<"div">;
const inlinePropStyles = cva(["grid grid-cols-2"], {
  variants: {
    variant: {
      default: ["border border-black"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export function InlineProp({
  label,
  value,
  unit,
  variant,
  className,
}: InlinePropProps) {
  return (
    <div className={clsx(inlinePropStyles({ variant }), className)}>
      <b>{label}</b>
      <span>{value}</span>
    </div>
  );
}
