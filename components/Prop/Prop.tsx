import clsx from "clsx";

export type PropProps = {
  label?: string | null;
  value?: string | number | null;
  unit?: string | null;
  className?: string;
  children?: React.ReactNode;
};
export const Prop = ({
  label,
  value,
  unit,
  children,
  className,
}: PropProps) => {
  return (
    <div
      className={clsx(
        "relative sm:grid sm:grid-cols-3 p-2 border-b-4",
        className
      )}
    >
      <h4 className="capitalize text-black text-md font-bold">{label}</h4>
      <div className="sm:col-span-2 indent-2">
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
