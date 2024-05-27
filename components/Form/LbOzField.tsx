import { forwardRef, useState } from "react";
import { AmountFieldProps, amountFieldStyles } from "./AmountField";
import clsx from "clsx";
import { Input } from "./Input";
export const LbOzField = forwardRef<HTMLInputElement, AmountFieldProps>(
  function LbOzField(
    {
      name,
      amountType: _amountType,
      disabled,
      onBlur,
      onChange,
      value,
      variant,
      size,
      error,
      className,
    }: AmountFieldProps,
    ref
  ) {
    const [lbs, setLbs] = useState(Math.floor(parseFloat(value) ?? 0));
    const [ozs, setOzs] = useState(((parseFloat(value) ?? 0) % lbs) / (1 / 16));
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const { name: _name, value: _v } = e.currentTarget;
      const v = parseFloat(_v);
      let newValue = value;
      if (_name === "lbs") {
        newValue = v + ozs / 16;
        setLbs(v);
      } else if (_name === "ozs") {
        newValue = lbs + v / 16;
        setOzs(v);
      }
      if (onChange) {
        onChange({
          ...e,
          currentTarget: { ...e.currentTarget, name, value: newValue },
        });
      }
    };

    const v = lbs + ozs / 16;
    return (
      <div className={clsx("grid grid-cols-2 gap-3", className)}>
        <div className="flex">
          <Input
            disabled={disabled || false}
            className={amountFieldStyles({
              variant: error ? "error" : variant,
              size,
            })}
            type="number"
            step={1}
            name="lbs"
            onChange={handleChange}
            onBlur={onBlur}
            value={Number.isNaN(lbs) ? 0 : lbs.toFixed(0)}
          />
          <div className="grid pt-2 px-2 border border-black">Lb</div>
        </div>
        <div className="flex">
          <Input
            disabled={disabled || false}
            className={amountFieldStyles({
              variant: error ? "error" : variant,
              size,
            })}
            type="number"
            step={0.01}
            min={0}
            max={16}
            name="ozs"
            onChange={handleChange}
            onBlur={onBlur}
            value={Number.isNaN(ozs) ? 0 : ozs.toFixed(2)}
          />
          <div className="grid pt-2 px-2 border border-black">Oz</div>
        </div>
        <input
          type="hidden"
          name={name}
          value={Number.isNaN(v) ? 0 : v}
          ref={ref}
          onChange={onChange}
        />
      </div>
    );
  }
);
