import { Prop, PropProps } from "./Prop";
import {
  //MassConverter,
  //type Converter,
  type AmountType,
  converters,
  UnitTypes,
} from "./amountConversions";
export type AmountPropProps = PropProps & {
  value?: any;
  unit?: UnitTypes;
  unitType?: AmountType;
};
export function AmountProp({
  value,
  unit,
  unitType,
  ...props
}: AmountPropProps) {
  const converter = unitType ? converters[unitType] : () => (v: number) => v;
  const convertedValue = converter(unit)?.(value) ?? "error";
  return <Prop value={convertedValue} unit={unit} {...props} />;
}

export default AmountProp;
