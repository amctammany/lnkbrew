import clsx from "clsx";
import {
  UnitTypes,
  AmountType as _AmountType,
  converters,
  getConversionOptions,
  getConverters,
  rawConverters,
} from "@/lib/amountConversions";
import { Input, InputProps, inputStyles } from "./Input";
import { Label } from "./Label";
import { ChangeEventHandler, ComponentProps, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { cva } from "class-variance-authority";

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
  return options?.length! > 1 ? (
    <select {...props} onSelect={props.onChange}>
      {options?.map(([k, v]) => (
        <option key={k} value={v}>
          {k}
        </option>
      ))}
    </select>
  ) : (
    <div className="grid h-full border border-black border-l-0 text-center align-middle justify-center">
      <span className="my-auto block text-sm px-2 font-bold">
        {options?.length === 1 ? options[0][0] : value}
      </span>
    </div>
  );
}

export type AmountFieldProps = {
  amountType: _AmountType;
  amountUnit?: UnitTypes;
} & InputProps &
  Partial<ControllerRenderProps>;
export const AmountField = ({
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

  ref,
  onChange,
  onBlur,
  ...props
}: AmountFieldProps) => {
  //const [baseValue, setBaseValue] = useState<number>(value);
  const [currentUnit, setCurrentUnit] = useState<UnitTypes>(
    amountUnit ?? (getConversionOptions(amountType)[0][1] as UnitTypes)
  );
  const [currentAmount, setCurrentAmount] = useState<number>(
    (rawConverters[amountType][currentUnit] ?? 1) * value
  );
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const amt = parseFloat(e.currentTarget.value);
    setCurrentAmount(amt);
    //console.log(rawConverters[amountType]);
    const convertedValue = amt / rawConverters[amountType][currentUnit]; //* amt;
    //setBaseValue(convertedValue);
    onChange?.(convertedValue);
  };

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const unit = e.currentTarget.value as UnitTypes;
    setCurrentUnit(unit);
    const convertedValue = currentAmount / rawConverters[amountType][unit];
    //setBaseValue(convertedValue);
    onChange?.(convertedValue);
  };
  //console.log({ baseValue, value, currentAmount, amountType, currentUnit });
  return (
    <Label className={clsx("", className)} label={label || name} error={error}>
      <div className={clsx("flex", className)}>
        <input
          type="hidden"
          name={name}
          value={value}
          ref={ref}
          //onChange={changeHidden}
        />
        <input
          disabled={disabled || false}
          className={inputStyles({
            variant: error ? "error" : variant,
            inputSize,
          })}
          type="number"
          step={step || 1}
          //name={name}
          //ref={ref}
          {...props}
          onChange={handleChange}
          onBlur={onBlur}
          value={currentAmount}
          //ref={ref}
          //{...amountTypeProps}
        />
        <div className="grid items-center align-middle justify-center">
          <AmountType
            value={currentUnit}
            options={getConversionOptions(amountType)}
            onChange={handleSelect}
          />
        </div>
      </div>
    </Label>
  );
};
