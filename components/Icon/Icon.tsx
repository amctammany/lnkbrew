import { XMarkIcon } from "@heroicons/react/24/outline";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";
export type IconProps = ComponentProps<"div"> &
  VariantProps<typeof iconStyles> & { Svg?: typeof XMarkIcon };
export const iconStyles = cva("m-auto", {
  variants: {
    variant: {
      default: [""],
      white: ["text-white"],
      warning: ["text-warning-500"],
    },
    size: {
      default: ["w-6 h-6 p-0"],
      medium: ["w-5 h-5 p-0"],
      small: ["w-4 h-4 p-0"],
      large: ["w-8 h-8 p-1"],
      xl: ["w-24 h-24 p-2"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
export function Icon({ variant, size, className, children, Svg }: IconProps) {
  return Svg ? (
    <Svg className={clsx(iconStyles({ variant, size }), className)} />
  ) : (
    <div className={clsx(iconStyles({ variant, size }), className)}>
      {children}
    </div>
  );
}
export default Icon;
