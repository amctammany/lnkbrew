export type PropProps = {
  label?: string | null;
  value?: string | number | null;
  unit?: string | null;
  children?: React.ReactNode;
};
export const Prop = ({ label, value, unit, children }: PropProps) => {
  return (
    <div className="relative sm:grid sm:grid-cols-3 p-2 border-b-4">
      <h4 className="uppercase text-black text-md font-bold">{label}</h4>
      <div className="sm:col-span-2">
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
