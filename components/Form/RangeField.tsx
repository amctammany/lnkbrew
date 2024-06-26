import {
  ChangeEventHandler,
  ComponentProps,
  SyntheticEvent,
  forwardRef,
  useState,
} from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import { Input, inputStyles, InputProps } from "./Input";
import { FieldValues, Path, UseControllerReturn } from "react-hook-form";
import clsx from "clsx";

export type RangeFieldProps<
  T extends FieldValues,
  //L extends Path<T> = Path<T>,
  //H extends Path<T> = Path<T>,
> = {
  step?: number;
  min?: number;
  max?: number;
  lowField: any; //UseControllerReturn<T, Path<T>>; //["field"];
  highField: any; //UseControllerReturn<T, Path<T>>; //["field"];
  onChange: any;
} & Omit<InputProps, "name">;
const inputClass = clsx(
  "absolute w-full h-full z-30 p-0 opacity-0 appearance-none",
  "[&::-ms-track]:bg-transparent [&::-ms-track]:border-transparent [&::-ms-track]:appearence-none [&::-ms-thumb]:appearance:none [&::-ms-thumb]:pointer-events-auto [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:bg-red-900 [&::-ms-thumb]:cursor-grab ",
  "[&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-transparent [&::-moz-range-track]:appearence-none [&::-moz-range-thumb]:appearance:none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-red-900 [&::-moz-range-thumb-thumb]:cursor-grab ",
  "[&:focus::-webkit-slider-runnable-track]:bg-transparent [&:focus::-webkit-slider-runnable-track]:border-transparent [&:focus::-webkit-slider-runnable-track]:appearence-none [&:focus::-webkit-slider-runnable-track]:appearance-none [&:focus::-webkit-slider-runnable-track]:pointer-events-auto [&:focus::-webkit-slider-runnable-track]:w-4 [&:focus::-webkit-slider-runnable-track]:h-4 [&:focus::-webkit-slider-runnable-track]:bg-red-900 [&:focus::-webkit-slider-runnable-track]:cursor-grab [&:active]:[cursor:grabbing]"
);

const inputClass1 = clsx(
  "absolute w-full h-full z-[3] p-0 opacity-0 appearance-none  [&:active]:[cursor:grabbing]",
  "[&::-ms-track]:bg-transparent [&::-ms-track]:border-transparent [&::-ms-track]:appearance-none [&::-ms-thumb]:appearance-none [&::-ms-thumb]:[pointer-events:all] [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:bg-red-900 [&::-ms-thumb]:cursor-grab ",
  "[&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-transparent [&::-moz-range-track]:appearance-none [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:[pointer-events:all] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-red-900 [&::-moz-range-thumb-thumb]:cursor-grab ",
  "[&:focus::-webkit-slider-runnable-track]:bg-transparent [&:focus::-webkit-slider-runnable-track]:border-transparent [&:focus::-webkit-slider-runnable-track]:appearance-none [&:focus::-webkit-slider-runnable-track]:w-4 [&:focus::-webkit-slider-runnable-track]:h-4 [&:focus::-webkit-slider-runnable-track]:bg-red-900 [&:focus::-webkit-slider-runnable-track]:[pointer-events:all] [&:focus::-webkit-slider-runnable-track]:cursor-grab [[&:focus::-webkit-slider-runnable-track]&:active]:[cursor:grabbing]"
);
const controlClass = clsx(
  "w-4 h-4 rounded-[50%] absolute top-1/2 bg-pink-400 z-[2] -translate-y-1/2 transform[translate3d(0,-50%,0)] ml-[-8px] pointer-events-none "
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

export function RangeField<T extends FieldValues>({
  //name,
  label,
  step = 1,
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
  max = 100,
  min = 0,

  className,
  ...props
}: RangeFieldProps<T>) {
  const [minValue, setMinValue] = useState((value ? value.min : min) ?? 0);
  const [maxValue, setMaxValue] = useState((value ? value.max : max) ?? 100);

  const handleMinChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValue - step);
    setMinValue(newMinVal);
    console.log("min: " + newMinVal);
    //console.log(lowField.field.onChange);
    //lowField.field.onChange(newMinVal);
    onChange({ min: newMinVal, max: maxValue });
  };

  const handleMaxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValue + step);
    console.log("max: " + newMaxVal);
    //console.log(highField.field.onChange);
    setMaxValue(newMaxVal);
    //highField.field.onChange(newMaxVal);
    onChange({ min: minValue, max: newMaxVal });
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    //e.preventDefault();
    const { value, name } = e.currentTarget;
    console.log({ name, minValue, maxValue, value });
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;
  return (
    <Label size={size} label={label ?? ""} error={error}>
      <div>
        <div className="relative flex items-center mx-10 my-[8px] pt-[1.6rem] h-[calc(16px+1.6rem)]">
          <div className="absolute mx-0 h-[16px] my-[calc(-8px)] w-[calc(100%+16px)]">
            <input
              disabled={props.disabled || false}
              //className={inputStyles({
              //variant: error ? "error" : props.variant,
              //size,
              //})}
              //className="absolute w-full pointer-events-none appearance-none h-full opacity-0 z-30 p-0"
              className={inputClass1}
              type="range"
              step={step || 1}
              //{...lowField.field}
              //value={lowField.value}
              //name={lowField.name}
              onChange={handleMinChange}
              //ref={lowField.field.ref}
              //name={name}
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
              //className="absolute w-full pointer-events-none appearance-none h-full opacity-0 z-30 p-0"
              className={inputClass1}
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
        <span>Low: {value.min}</span>
        <span>High: {value.max}</span>
      </div>
    </Label>
  );
}
