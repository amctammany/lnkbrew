import { useState } from "react";
export type RangeSliderProps = {
  step?: number;
  min?: number;
  max?: number;
};

export const RangeSlider = ({ step, min, max }: RangeSliderProps) => {
  const [minValue, setMinValue] = useState(min ?? 0);
  const [maxValue, setMaxValue] = useState(max ?? 100);
  const handleMinChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const value = parseFloat(e.target.value);
    // the new min value is the value from the event.
    // it should not exceed the current max value!
    const newMinVal = Math.min(value, maxValue - (step ?? 1));
    setMinValue(newMinVal);
  };
  const handleMaxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const value = parseFloat(e.target.value);
    // the new max value is the value from the event.
    // it must not be less than the current min value!
    const newMaxVal = Math.max(value, minValue + (step ?? 1));
    setMaxValue(newMaxVal);
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;
  return (
    <div>
      <input
        type="range"
        value={minValue}
        min={min}
        max={max}
        step={step}
        onChange={handleMinChange}
      />
      <input
        type="range"
        value={maxValue}
        min={min}
        max={max}
        step={step}
        onChange={handleMaxChange}
      />
    </div>
  );
};
