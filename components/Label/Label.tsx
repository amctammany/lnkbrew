import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

export type LabelProps = VariantProps<typeof labelStyles> & {
  suffix?: React.ReactNode;
  children?: React.ReactNode;
  text?: string | React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
const labelStyles = cva(["group/label flex mx-auto relative"], {
  variants: {
    variant: {
      default: "text-inherit",
      subnav: "text-blue-300",
      warning: "text-warning-500",
    },
    order: {
      default: "flex-row",
      reverse: "flex-row-reverse",
    },
  },
  defaultVariants: {
    variant: "default",
    order: "default",
  },
});
const labelTooltipStyles = cva(
  [
    "group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-1/2 opacity-0 my-2 mx-auto",
  ],
  {
    variants: {
      variant: {
        default: [""],
        subnav: [""],
        warning: [""],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export const Label = ({
  text,
  variant,
  order,
  onClick,
  children,
  suffix,
  className,
}: LabelProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(labelStyles({ variant, order }), className)}
    >
      {children}
      {text && (
        <>
          <span className="block m-auto ml-2">{text}</span>
          <span className={labelTooltipStyles({ variant })}>{text}</span>
        </>
      )}
      {suffix}
    </div>
  );
};

export default Label;
