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
  rawConverters,
} from "@/lib//amountConversions";
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
  const converter = converters[unitType]; //[unit ?? Object.keys(converters[unitType])[0]]; //unitType ? converters[unitType] : (v: any) => v;
  //console.log(converters, converter);

  const convertedValue =
    typeof converter === "function"
      ? converter(value ?? children)
      : (value ?? (children || "0")) * converter;
  //console.log(converter);
  return (
    <Prop
      value={convertedValue.toFixed(precision)}
      //unit={unit}
      {...props}
      unit={unit ?? getConverterUnits(userPrefs)[unitType]}
    />
  );
}

export default AmountProp;
