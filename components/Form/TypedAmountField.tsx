"use client";
import clsx from "clsx";
import {
  UnitTypes,
  AmountType as _AmountType,
  classConverters,
  converters,
  getConversionOptions,
  getConverters,
  rawConverters,
} from "@/lib/amountConversions";
import { Input, InputProps, inputStyles } from "./Input";
import { Label } from "./Label";
import {
  ChangeEventHandler,
  ComponentProps,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ControllerRenderProps,
  FieldValue,
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import { cva } from "class-variance-authority";
import { LbOzField } from "./LbOzField";
import { UserContext } from "@/app/UserProvider";
import { NumberField } from "./NumberField";

export const amountFieldStyles = cva("input", {
  variants: {
    variant: {
      default: [
        "block",
        "disabled:bg-slate-50",
        "disabled:text-slate-500",
        "disabled:border-slate-200",
        "disabled:shadow-none",
      ],
      tiny: ["w-8"],
      error: ["bg-error-200"],
    },
    size: {
      default: ["w-full"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export type AmountTypeProps = ComponentProps<"select"> & {
  options?: [k: string, v: any][];
  type?: any;
  name?: string;
};

function AmountType({ type, value, options, ...props }: AmountTypeProps) {
  //const selected = options?.findIndex(
  //(o) => o[0].toString() === value?.toString()
  //);
  return options?.length! > 1 ? (
    <select
      {...props}
      onSelect={props.onChange}
      value={value}
      className={clsx(
        "h-full border border-black border-l-0 text-center align-middle justify-center",
        props.className
      )}
    >
      {options?.map(([k, v]) => (
        <option key={k} value={v}>
          {k}
        </option>
      ))}
    </select>
  ) : (
    <div className={clsx("border-black border border-l-0", props.className)}>
      <span className="my-auto block text-sm px-2 font-bold">
        {options?.length === 1 ? options[0][0] : value}
      </span>
    </div>
  );
}

export type TypedAmountFieldProps<T extends FieldValues> = {
  amountType: _AmountType;
  amountUnit?: UnitTypes;
  isDirty?: boolean;
  fieldProps: UseFormRegisterReturn<
    T[keyof T] extends string ? T[keyof T] : never
  >;
  unitProps: UseFormRegisterReturn<
    T[keyof T] extends string ? T[keyof T] : never
  >;
} & InputProps;
//Partial<ControllerRenderProps>;
export const TypedAmountField = function <T extends FieldValues>(
  props: TypedAmountFieldProps<T>
) {
  const {
    className,
    disabled,
    label,
    step,
    error,
    inputSize,
    name,
    variant,
    amountType,
    amountUnit,
    value,
    isDirty,
    fieldProps,
    unitProps,
    ref,
    onChange,
    onBlur,
  } = props;
  //const userPrefs = useContext(UserContext);
  //const unitType = userPrefs[amountType] as UnitTypes;
  //console.log(userPrefs, amountType, unitType);
  //const converters = getConverters(userPrefs);
  //
  //const [baseValue, setBaseValue] = useState<number>(value);
  const [currentUnit, setCurrentUnit] = useState<UnitTypes>(
    amountUnit ?? (getConversionOptions(amountType)[0][1] as UnitTypes)
  );
  const [currentAmount, setCurrentAmount] = useState<number>(
    classConverters[amountType][currentUnit]?.from(value) ?? value
  );
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const amt = parseFloat(e.currentTarget.value);
    setCurrentAmount(amt);
    //console.log(rawConverters[amountType]);
    const convertedValue = classConverters[amountType][currentUnit].from(amt); //* amt;
    //setBaseValue(convertedValue);
    //onChange?.(convertedValue);
  };

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const oldUnit = classConverters[amountType][currentUnit];
    const unit = e.currentTarget.value as UnitTypes;
    setCurrentUnit(unit);
    //const convertedValue =
    //setBaseValue(convertedValue);
    //const a = oldUnit.from(classConverters[amountType][unit].to(currentAmount));
    //onChange?.(classConverters[amountType][unit].from(currentAmount));
  };
  //useEffect(() => {
  //setCurrentAmount(classConverters[amountType]?.[unitType]?.to(value));
  //setCurrentUnit(unitType);
  //}, [unitType, amountType, value, setCurrentUnit]);
  //console.log({ baseValue, value, currentAmount, amountType, currentUnit });
  return (
    <Label className={clsx("", className)} label={label || name} error={error}>
      <div className={clsx("flex w-full")}>
        <>
          <Input
            //disabled={disabled || false}
            type="number"
            step={step}
            className={clsx(
              inputStyles({
                variant: error ? "error" : variant,
                inputSize,
              }),
              "flex-grow w-full"
            )}
            {...fieldProps}
          />
        </>
        <AmountType
          //value={currentUnit}
          options={getConversionOptions(amountType)}
          //onChange={handleSelect}
          className="flex-shrink grid items-center align-middle justify-center"
          {...unitProps}
        />
      </div>
    </Label>
  );
};
