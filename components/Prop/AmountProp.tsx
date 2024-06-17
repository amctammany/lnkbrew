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
} from "./amountConversions";
import { UserContext } from "@/app/UserProvider";
export type AmountPropProps = PropProps & {
  value?: any;
  unit?: UnitTypes;
  unitType: AmountType;
};
export function AmountProp({
  value,
  unit,
  unitType,
  children,
  ...props
}: AmountPropProps) {
  const userPrefs = useContext(UserContext);
  const converters = getConverters(userPrefs);
  const converter = converters[unitType];
  const convertedValue = converter(value ?? children) ?? "error";
  //console.log({ userPrefs, converter, converters });
  return <Prop value={convertedValue} unit={unit} {...props} />;
}

export default AmountProp;
