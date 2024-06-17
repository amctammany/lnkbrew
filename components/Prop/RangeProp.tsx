import Prop from "./Prop";
import { Range } from "../Range";

export type RangePropProps = {
  label?: string | null;
  value?: string | number | null;
  unit?: string | null;
  range?: [number | undefined | null, number | null | undefined] | null;
  min?: number | null;
  max?: number | null;
  children?: React.ReactNode;
};
export const RangeProp = ({
  min = 0,
  max = 100,
  range = [0, 100],
  label,
  value,
  unit,
  //children,
}: RangePropProps) => {
  console.log({ range, min, max, value, unit, label });
  return (
    <Prop label={label ?? ""}>
      <Range
        range={range ?? [0, 100]}
        value={parseFloat(value?.toString() ?? "")}
        min={min!}
        max={max!}
      />
    </Prop>
  );
};
export default RangeProp;
