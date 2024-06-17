import {
  MassConverter,
  type Converter,
  type AmountType,
  converters,
  UnitTypes,
} from "./amountConversions";
export type AmountPropProps = {
  value?: any;
  unit?: UnitTypes;
  unitType?: AmountType;
};
export function AmountProp({ value, unit, unitType }: AmountPropProps) {
  const converter = unitType ? converters[unitType] : () => (v: number) => v;
  const convertedValue = converter(unit)?.(value) ?? "error";
  return (
    <div>
      Amoutn Prop
      {convertedValue}
    </div>
  );
}

export default AmountProp;
