import {
  ChangeEventHandler,
  ComponentProps,
  SyntheticEvent,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { Input, inputStyles, InputProps } from "./Input";
import { FieldValues, Path, UseControllerReturn } from "react-hook-form";
import clsx from "clsx";
import { TextField } from "./TextField";
import { NumberField, NumberFieldRaw } from "./NumberField";

export type RangeFieldProps = //H extends Path<T> = Path<T>,
  {
    step?: number;
    min?: number;
    max?: number;
    lowField?: any; //UseControllerReturn<T, Path<T>>; //["field"];
    highField?: any; //UseControllerReturn<T, Path<T>>; //["field"];
    onChange: any;
    value?: { min?: number; max?: number };
  } & Omit<InputProps, "value">;

const inputClass = clsx(
  "absolute w-full h-full z-[3] p-0 opacity-0 appearance-none pointer-events-none ",
  "[&::-ms-track]:bg-transparent [&::-ms-track]:border-transparent [&::-ms-track]:appearance-none [&::-ms-thumb]:appearance-none [&::-ms-thumb]:[pointer-events:all] [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:bg-red-900 [&::-ms-thumb]:cursor-grab [[&::-ms-thumb]&:active]:[cursor:grabbing]",
  "[&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-transparent [&::-moz-range-track]:appearance-none [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:[pointer-events:all] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-red-900 [&::-moz-range-thumb]:cursor-grab [[&::-moz-range-thumb]&:active]:[cursor:grabbing]",
  "[&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:[pointer-events:all] [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:bg-red-900 [border:0,none]  [&:focus::-webkit-slider-runnable-track]:bg-transparent [&:focus::-webkit-slider-runnable-track]:border-transparent [&:focus::-webkit-slider-runnable-track]:appearance-none [&:focus::-webkit-slider-runnable-track]:w-4 [&:focus::-webkit-slider-runnable-track]:h-4 [&:focus::-webkit-slider-runnable-track]:bg-red-900   [[&::-webkit-slider-thumb]&:hover]:[cursor:grabbing] "
);
const controlClass = clsx(
  "w-6 h-6 rounded-[50%] absolute top-1/2 bg-pink-400 z-[2] -translate-y-1/2 transform[translate3d(0,-50%,0)] ml-[-8px] pointer-events-none "
);

const rangeFieldStyles = cva("input w-full", {
  variants: {
    variant: {
      default: [
        "block",
        "disabled:bg-slate-50",
        "disabled:text-slate-500",
        "disabled:border-slate-200",
        "disabled:shadow-none",
      ],
      error: ["bg-error-200"],
    },
    size: {
      default: [""],
      small: [""],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export function RangeField({
  name,
  label,
  step = 1,
  inputSize,
  //defaultValue,
  //disabled,
  //onBlur,
  onChange,
  value = {},
  //variant,

  //lowField,
  //highField,
  size,
  error,
  ref,
  max = 100,
  min = 0,

  className,
  ...props
}: RangeFieldProps) {
  const [minValue, setMinValue] = useState((value ? value.min : min) ?? 0);
  const [maxValue, setMaxValue] = useState((value ? value.max : max) ?? 100);
  useEffect(() => {
    if (value.min) setMinValue(value.min);
    if (value.max) setMaxValue(value.max);
  }, [value]);

  const handleMinChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValue - step);
    setMinValue(newMinVal);
    //console.log("min: " + newMinVal);
    //console.log(lowField.field.onChange);
    //lowField.field.onChange(newMinVal);
    onChange({ min: newMinVal, max: maxValue });
  };

  const handleMaxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValue + step);
    //console.log("max: " + newMaxVal);
    //console.log(highField.field.onChange);
    setMaxValue(newMaxVal);
    //highField.field.onChange(newMaxVal);
    onChange({ min: minValue, max: newMaxVal });
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;
  return (
    <Label inputSize={inputSize} label={label ?? ""} error={error}>
      <div className="flex w-full">
        <NumberFieldRaw
          label={null}
          //name={`${name}[0]`}
          className="flex-shrink text-center"
          //variant="tiny"
          inputSize={inputSize}
          value={minValue}
          onChange={handleMinChange}
        />

        <div className="flex-grow">
          <div className="relative flex items-center mx-10 my-[8px] pt-[1.6rem] h-[calc(16px+1.6rem)]">
            <div className="absolute mx-0 h-[16px] my-[calc(-8px)] w-[calc(100%+16px)]">
              <input
                disabled={props.disabled || false}
                //className={inputStyles({
                //variant: error ? "error" : props.variant,
                //size,
                //})}
                //className="absolute w-full pointer-events-none appearance-none h-full opacity-0 z-30 p-0"
                className={inputClass}
                name={name}
                type="range"
                step={step || 1}
                //{...lowField.field}
                //value={lowField.value}
                //name={lowField.name}
                onChange={handleMinChange}
                //ref={lowField.field.ref}
                min={min}
                max={max}
                value={minValue}
                //defaultValue={defaultValue}
                //onChange={onChange}
                //onBlur={onBlur}
                //value={value}
                //ref={ref}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <input
                disabled={props.disabled || false}
                name={name}
                //className="absolute w-full pointer-events-none appearance-none h-full opacity-0 z-30 p-0"
                className={inputClass}
                min={min}
                max={max}
                //className={inputStyles({
                //variant: error ? "error" : props.variant,
                //size,
                //})}
                type="range"
                step={step || 1}
                value={maxValue}
                //{...highField.field}
                //value={highField.value}
                //name={highField.name}
                //ref={highField.ref}
                //onChange={handleChange}
                onChange={handleMaxChange}
                //name={name}
                //defaultValue={defaultValue}
                //onChange={onChange}
                //onBlur={onBlur}
                //value={value}
                //ref={ref}
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
            <div className="w-full absolute h-[16px] ">
              <div
                //className="w-4 h-4 rounded-full absolute bg-pink-700 top-1/2 -translate-y-1/2 -ml-[5px]"
                className={controlClass}
                style={{ left: `${minPos}%` }}
              />
              <div className="absolute w-full top-1/2 -translate-y-1/2 h-[6px] rounded-[3px] bg-gray-300">
                <div
                  className="absolute h-full bg-pink-500 opacity-50"
                  style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
                />
              </div>
              <div className={controlClass} style={{ left: `${maxPos}%` }} />
            </div>
          </div>
        </div>
        <NumberFieldRaw
          className="flex-shrink text-center"
          //name={`${name}[1]`}
          //variant="tiny"
          label={null}
          inputSize={inputSize}
          value={maxValue}
          onChange={handleMaxChange}
        />
      </div>
    </Label>
  );
}
