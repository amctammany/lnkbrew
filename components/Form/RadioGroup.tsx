import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";
import { Label } from "./Label";
import { InputProps } from "./Input";
import { Radio } from "./Radio";
export type RadioGroupProps = { options?: Record<string, any> } & VariantProps<
  typeof radioGroupStyles
> &
  InputProps;
const radioGroupStyles = cva(
  "grid grid-flow-col auto-cols-auto border border-black",
  {
    variants: {
      variant: {
        default: [],
        inline: [],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export function RadioGroup({
  label,
  error,
  options = {},
  className,
  variant,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <Label error={error} label={label} variant={variant}>
      <div className={clsx(radioGroupStyles({ variant }), className)}>
        {Object.entries(options).map(([k, v]) => (
          <Radio key={k} label={v} value={v} {...props} />
        ))}
      </div>
    </Label>
  );
}
export default RadioGroup;
