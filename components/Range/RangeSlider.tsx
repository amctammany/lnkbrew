import clsx from "clsx";
import { ChangeEventHandler, ComponentProps, useEffect, useState } from "react";
export type RangeValue = { min: number; max: number };
export type RangeSliderProps = {
  step?: number;
  min?: number;
  max?: number;
  value?: RangeValue;
  onChange?: any;
};

const inputClass = clsx(
  "absolute w-full h-full z-30 p-0 opacity-0 appearance-none  ",
  "[&::-ms-track]:bg-transparent [&::-ms-track]:border-transparent [&::-ms-track]:appearence-none [&::-ms-thumb]:appearance:none [&::-ms-thumb]:pointer-events-auto [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:bg-red-900 [&::-ms-thumb]:cursor-grab ",
  "[&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-transparent [&::-moz-range-track]:appearence-none [&::-moz-range-thumb]:appearance:none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-red-900 [&::-moz-range-thumb-thumb]:cursor-grab ",
  "[&:focus::-webkit-slider-runnable-track]:bg-transparent [&:focus::-webkit-slider-runnable-track]:border-transparent [&:focus::-webkit-slider-runnable-track]:appearence-none [&:focus::-webkit-slider-runnable-track]:appearance:none [&:focus::-webkit-slider-runnable-track]:pointer-events-auto [&:focus::-webkit-slider-runnable-track]:w-4 [&:focus::-webkit-slider-runnable-track]:h-4 [&:focus::-webkit-slider-runnable-track]:bg-red-900 [&:focus::-webkit-slider-runnable-track]:cursor-grab "
);
const controlClass = clsx(
  "w-4 h-4 rounded-lg absolute top-1/2 bg-pink-400 z-20 -translate-y-1/2]"
);
export const RangeSlider = ({
  step = 1,
  min = 0,
  max = 100,
  value,
  onChange,
}: RangeSliderProps) => {
  const [minValue, setMinValue] = useState(value ? value.min : min ?? 0);
  const [maxValue, setMaxValue] = useState(value ? value.max : max ?? 100);
  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);
  const handleMinChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const value = parseFloat(e.target.value);
    // the new min value is the value from the event.
    // it should not exceed the current max value!
    const newMinVal = Math.min(value, maxValue - (step ?? 1));
    if (!value) setMinValue(newMinVal);
    onChange?.({ min: newMinVal, max: maxValue });
  };
  const handleMaxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const value = parseFloat(e.target.value);
    // the new max value is the value from the event.
    // it must not be less than the current min value!
    const newMaxVal = Math.max(value, minValue + (step ?? 1));
    if (!value) setMaxValue(newMaxVal);
    onChange?.({ min: minValue, max: newMaxVal });
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;
  return (
    <div className="relative flex items-center mx-10 my-2 pt-6 h-8">
      <div className="w-full mx-0 -my-4 absolute h-4">
        <input
          className={inputClass}
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className={inputClass}
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>
      <div className="w-full absolute h-4">
        <div className={controlClass} style={{ left: `${minPos}%` }} />
        <div className="absolute w-full top-1/2 -translate-y-1/2 rounded-sm bg-gray-300">
          <div
            className="absolute h-full bg-pink-400 opacity-50"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div className={controlClass} style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  );
};
