"use client";
import { useContext, useEffect, useState } from "react";
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
  const unit1 = userPrefs[unitType];
  const converters = getConverters(userPrefs);
  const converter = converters[unitType]; //[unit ?? Object.keys(converters[unitType])[0]]; //unitType ? converters[unitType] : (v: any) => v;
  console.log(unitType, unit1, converter);

  const convertedValue =
    typeof converter === "function"
      ? converter(value ?? children)
      : (value ?? (children || "0")) * converter;
  //console.log(converter);

  const [currentAmount, setCurrentAmount] = useState(
    typeof converter === "function"
      ? converter(value ?? children)
      : (value ?? (children || "0")) * converter
  );
  const [currentUnit, setCurrentUnit] = useState();
  useEffect(() => {
    setCurrentAmount(
      typeof converter === "function"
        ? converter(value ?? children)
        : (value ?? (children || "0")) * converter
    );
    setCurrentUnit(unit1);
  }, [converter, children, value, unit1, setCurrentUnit]);
  return (
    <Prop
      value={currentAmount.toFixed(precision)}
      //unit={unit}
      {...props}
      unit={currentUnit}
    />
  );
}

export default AmountProp;
