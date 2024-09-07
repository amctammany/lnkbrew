import { cva, VariantProps } from "class-variance-authority";

export type LabelProps = VariantProps<typeof labelStyles> & {
  children?: React.ReactNode;
  text?: string;
};
const labelStyles = cva(["inline-flex gap-1"], {
  variants: {
    variant: {
      default: "",
      warning: "text-warning-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export const Label = ({ text, variant, children }: LabelProps) => {
  return (
    <div className={labelStyles({ variant })}>
      {children}
      <span>{text}</span>
    </div>
  );
};

export default Label;
