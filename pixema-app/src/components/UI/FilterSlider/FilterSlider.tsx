import { ChangeEvent, FC, useRef } from "react";
import { IRenderThumbParams, IRenderTrackParams } from "react-range/lib/types";
import { Range } from "react-range";
import SliderTrack from "./components/SliderTrack/SliderTrack";
import TextField from "./components/TextField/TextField";
import SliderThumb from "./components/SliderThumb/SliderThumb";
import "./FilterSlider.scss";

interface SliderProps {
  min: number;
  max: number;
  values: number[];
  step?: number;
  onChange: (values: number[]) => void;
}

const FiltersSlider = ({ values, onChange, step, min, max }: SliderProps) => {
  const initialValueRef = useRef<number[]>(values);

  const sanitizeValues = (value: number) => {
    if (value > max) {
      return max;
    }

    return value;
  };

  const handleRenderTrack: FC<IRenderTrackParams> = ({ props, children }) => {
    return (
      <SliderTrack min={min} max={max} values={values} props={props}>
        {children}
      </SliderTrack>
    );
  };

  const handleRenderThumb: FC<IRenderThumbParams> = ({
    props,
    value,
    index,
  }) => {
    return (
      <SliderThumb
        key={index}
        props={props}
        value={value}
        initialValue={initialValueRef.current?.[index]}
      />
    );
  };

  return (
    <div className="filter-slider">
      <div className="filter-slider__content">
        <TextField
          type="number"
          label="От"
          min={min}
          max={max}
          value={values[0]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const sanitizedValue = sanitizeValues(
              parseInt(e?.target.value || String(min))
            );
            onChange([sanitizedValue, values[1]]);
          }}
        />
        <TextField
          type="number"
          label="До"
          min={min}
          max={max}
          value={values[1]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const sanitizedValue = sanitizeValues(
              parseInt(e?.target.value || String(max))
            );
            onChange([values[0], sanitizedValue]);
          }}
        />
      </div>
      <Range
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={onChange}
        renderThumb={handleRenderThumb}
        renderTrack={handleRenderTrack}
      />
    </div>
  );
};

export default FiltersSlider;
