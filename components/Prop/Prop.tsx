import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

export type PropProps = VariantProps<typeof propStyles> & {
  label?: React.ReactNode;
  value?: string | number | null;
  unit?: string | null;
  className?: string;
  children?: React.ReactNode;
};
const propStyles = cva(
  [
    "relative flex gap-2",
    "p-2",
    //" sm:grid sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 p-2 lg:grid-cols-4",
  ],
  {
    variants: {
      variant: {
        default: ["border-b-2"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
const propLabelStyles = cva(["block capitalize text-black text-md font-bold"], {
  variants: {
    variant: {
      default: ["whitespace-nowrap flex-shrink"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const propInnerStyles = cva(
  [
    //"sm:col-span-1 md:col-span-2 lg:col-span-3 md:indent-2 my-auto",
    "flex-grow",
  ],
  {
    variants: {
      variant: {
        default: ["w-full text-right "],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

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
          <>
            <span className="pr-1">{value}</span>
            <span>{unit}</span>
          </>
        )}
      </div>
    </div>
  );
};
export default Prop;
