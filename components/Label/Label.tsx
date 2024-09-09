import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

export type LabelProps = VariantProps<typeof labelStyles> & {
  children?: React.ReactNode;
  text?: string;
  className?: string;
};
const labelStyles = cva(["group flex mx-auto relative"], {
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
export const Label = ({
  text,
  variant,
  order,
  children,
  className,
}: LabelProps) => {
  return (
    <div className={clsx(labelStyles({ variant, order }), className)}>
      {children}
      {text && (
        <>
          <span className="hidden sm:block m-auto ml-2">{text}</span>
          <span
            className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-sm text-gray-100 rounded-md absolute left-1/2 
        -translate-x-1/2 translate-y-1/2 opacity-0 my-2 mx-auto"
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
};

export default Label;
