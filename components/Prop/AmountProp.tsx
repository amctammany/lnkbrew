"use client";
import { useContext } from "react";
import { Prop, PropProps } from "./Prop";
import {
  //MassConverter,
  //type Converter,
  type AmountType,
  //converters,
  UnitTypes,
  getConverters,
  getConverterUnits,
} from "./amountConversions";
import { UserContext } from "@/app/UserProvider";
export type AmountPropProps = PropProps & {
  value?: any;
  unit?: UnitTypes;
  unitType: AmountType;
  precision?: number;
};
export function AmountProp({
  value,
  unit,
  unitType,
  children,
  precision = 2,
  ...props
}: AmountPropProps) {
  const userPrefs = useContext(UserContext);
  const converters = getConverters(userPrefs);
  const converter = converters[unitType]; //unitType ? converters[unitType] : (v: any) => v;
  const convertedValue = converter(value ?? children) ?? "error";
  return (
    <Prop
      value={convertedValue.toFixed(precision)}
      //unit={unit}
      {...props}
      unit={getConverterUnits(userPrefs)[unitType]}
    />
  );
}

export default AmountProp;
