"use client";
import { ComponentProps, forwardRef } from "react";
import { AmountFieldProps, amountFieldStyles } from "./AmountField";
import clsx from "clsx";
import { InputProps, inputStyles } from "./Input";

export type AmountTypeProps = ComponentProps<"select"> & {
  options?: [k: string, v: any][];
  type?: any;
  name?: string;
};
export const AmountType = forwardRef<HTMLSelectElement, AmountTypeProps>(
  function AmountType({ type, options, ...props }: AmountTypeProps, ref) {
    return options?.length! > 0 ? (
      <select ref={ref} {...props} onSelect={props.onChange}>
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
);
function makeOptions(obj?: Record<string, string>) {
  return (
    <select>
      {Object.entries(obj || {}).map(([k, v]) => (
        <option key={k} value={v}>
          {k}
        </option>
      ))}
    </select>
  );
}

export const AmtField = forwardRef<HTMLInputElement, AmountFieldProps>(
  function AmtField(
    {
      name,
      label,
      amountType: _amountType,
      amountTypes,
      options,
      step,
      defaultValue,
      disabled,
      onBlur,
      onChange,
      value,
      variant,
      size,
      error,
      className,
      children,
      amountTypeProps,
    }: AmountFieldProps,
    ref
  ) {
    const body = children || (
      <AmountType
        {...amountTypeProps}
        value={_amountType}
        type={_amountType}
        options={Object.entries(amountTypes || {})}
      />
    );
    return (
      <div className={clsx("flex", className)}>
        <input
          disabled={disabled || false}
          className={inputStyles({
            variant: error ? "error" : variant,
            size,
          })}
          type="number"
          step={step || 1}
          name={name}
          //defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
          //{...amountTypeProps}
        />
        <div className="grid items-center align-middle justify-center">
          {body}
        </div>
      </div>
    );
  }
);
