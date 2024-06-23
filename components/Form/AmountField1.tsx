import clsx from "clsx";
import {
  UnitTypes,
  AmountType as _AmountType,
  getConversionOptions,
} from "../Prop/amountConversions";
import { Input, InputProps, inputStyles } from "./Input";
import { Label } from "./Label";
import { ChangeEventHandler, ComponentProps, useState } from "react";

export type AmountTypeProps = ComponentProps<"select"> & {
  options?: [k: string, v: any][];
  type?: any;
  name?: string;
};

function AmountType({ type, options, ...props }: AmountTypeProps) {
  return options?.length! > 0 ? (
    <select {...props} onSelect={props.onChange}>
      {options?.map(([k, v]) => (
        <option key={k} value={v}>
          {k}
        </option>
      ))}
    </select>
  ) : (
    <div className="grid h-full border border-black border-l-0 text-center align-middle justify-center">
      <span className="my-auto block text-sm px-2 font-bold">{type}</span>
    </div>
  );
}

export type AmountField1Props = {
  amountType: _AmountType;
  amountUnit?: UnitTypes;
} & InputProps;
export const AmountField1 = ({
  className,
  disabled,
  label,
  step,
  error,
  size,
  name,
  variant,
  amountType,
  amountUnit,
  value,

  ref,
  ...props
}: AmountField1Props) => {
  console.log({ value, amountType, amountUnit });
  const [baseValue, setBaseValue] = useState<number>(value);
  const [currentUnit, setCurrentUnit] = useState<UnitTypes>(
    amountUnit ?? (getConversionOptions(amountType)[0][1] as UnitTypes)
  );
  const [currentAmount, setCurrentAmount] = useState<number>(value);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentAmount(parseFloat(e.currentTarget.value));
  };

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCurrentUnit(e.currentTarget.value as UnitTypes);
  };
  const changeHidden: ChangeEventHandler<HTMLInputElement> = (e) =>
    console.log(e);
  return (
    <Label className={clsx("", className)} label={label || name}>
      <span>
        {currentAmount} {currentUnit}
        {baseValue}
      </span>

      <div className={clsx("flex", className)}>
        <input
          type="hidden"
          name={name}
          value={baseValue}
          ref={ref}
          onChange={changeHidden}
        />
        <input
          disabled={disabled || false}
          className={inputStyles({
            variant: error ? "error" : variant,
            size,
          })}
          type="number"
          step={step || 1}
          //name={name}
          //ref={ref}
          {...props}
          onChange={handleChange}
          //onBlur={onBlur}
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
