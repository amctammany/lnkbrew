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
import { ControllerRenderProps } from "react-hook-form";
import { cva } from "class-variance-authority";
import { LbOzField } from "./LbOzField";
import { UserContext } from "@/app/UserProvider";

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
        <option key={k} value={k}>
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

export type AmountFieldProps = {
  amountType: _AmountType;
  amountUnit?: UnitTypes;
  precision?: number;
  isDirty?: boolean;
} & InputProps &
  Partial<ControllerRenderProps>;
export const AmountField = (props: AmountFieldProps) => {
  const {
    className,
    precision = 1,
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

    ref,
    onChange,
    onBlur,
  } = props;
  const userPrefs = useContext(UserContext);
  const unitType = userPrefs[amountType] as UnitTypes;
  //console.log(userPrefs, amountType, unitType);
  const converters = getConverters(userPrefs);
  const converter = converters[amountType];
  //
  //const [baseValue, setBaseValue] = useState<number>(value);
  const [currentUnit, setCurrentUnit] = useState<UnitTypes>(
    amountUnit ?? (getConversionOptions(amountType)[0][1] as UnitTypes)
  );
  const [currentAmount, setCurrentAmount] = useState<number>(
    classConverters[amountType][currentUnit]?.to(value) ?? value
  );
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const amt = parseFloat(e.currentTarget.value);
    setCurrentAmount(amt);
    //console.log(rawConverters[amountType]);
    const convertedValue = classConverters[amountType][currentUnit].from(amt); //* amt;
    //setBaseValue(convertedValue);
    onChange?.(convertedValue.toFixed(precision));
  };

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const oldUnit = classConverters[amountType][currentUnit];
    const unit = e.currentTarget.value as UnitTypes;
    setCurrentUnit(unit);
    //console.log(unit);
    //const convertedValue =
    //setBaseValue(convertedValue);
    //const a = oldUnit.from(classConverters[amountType][unit].to(currentAmount));
    //onChange?.(classConverters[amountType][unit].from(currentAmount));
  };
  useEffect(() => {
    //setCurrentAmount(classConverters[amountType]?.[currentUnit]?.to(value));
    setCurrentUnit(unitType);
  }, [unitType]);
  useEffect(() => {
    setCurrentAmount(classConverters[amountType]?.[currentUnit]?.to(value));
    //setCurrentUnit(unitType);
  }, [isDirty, value, amountType, currentUnit]);
  //console.log({ baseValue, value, currentAmount, amountType, currentUnit });
  return (
    <Label className={clsx("", className)} label={label || name} error={error}>
      <div className={clsx("flex w-full")}>
        <>
          <input
            type="hidden"
            name={name}
            value={value}
            ref={ref}
            //onChange={changeHidden}
          />

          <Input
            disabled={disabled || false}
            className={clsx(
              inputStyles({
                variant: error ? "error" : variant,
                inputSize,
              }),
              "flex-grow w-full"
            )}
            type="number"
            step={step || 1}
            //name={name}
            //ref={ref}
            //{...props}
            onChange={handleChange}
            onBlur={onBlur}
            value={currentAmount ?? 0}
          />
        </>
        <AmountType
          value={currentUnit}
          options={getConversionOptions(amountType)}
          onChange={handleSelect}
          className="flex-shrink grid items-center align-middle justify-center"
        />
      </div>
    </Label>
  );
};
