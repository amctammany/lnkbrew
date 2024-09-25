import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

export type PropProps = VariantProps<typeof propStyles> & {
  label?: string | null;
  value?: string | number | null;
  unit?: string | null;
  className?: string;
  children?: React.ReactNode;
};
const propStyles = cva(["relative flex gap-2 sm:grid sm:grid-cols-2 p-2 "], {
  variants: {
    variant: {
      default: ["border-b-2"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const propLabelStyles = cva(["capitalize text-black text-md font-bold"], {
  variants: {
    variant: {
      default: [],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const propInnerStyles = cva(["sm:col-span-2 md:indent-2 my-auto"], {
  variants: {
    variant: {
      default: ["w-full text-right md:text-center"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const Prop = ({
  label,
  value,
  unit,
  children,
  variant,
  className,
}: PropProps) => {
  return (
    <div className={clsx(propStyles({ variant }), className)}>
      <h4
        className={clsx(propLabelStyles({ variant }), {
          hidden: !label,
        })}
      >
        {label}
      </h4>
      <div className={propInnerStyles({ variant })}>
        {children ?? (
          <div className="w-full my-auto">
            <span className="pr-1">{value}</span>
            <span>{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Prop;
