import { cva, VariantProps } from "class-variance-authority";

export type LabelProps = VariantProps<typeof labelStyles> & {
  children?: React.ReactNode;
  text?: string;
};
const labelStyles = cva(["flex mx-auto"], {
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
export const Label = ({ text, variant, order, children }: LabelProps) => {
  return (
    <div className={labelStyles({ variant, order })}>
      {children}
      <span className="hidden sm:block ml-2">{text}</span>
    </div>
  );
};

export default Label;
