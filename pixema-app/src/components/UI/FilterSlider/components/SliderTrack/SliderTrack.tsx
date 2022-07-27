import { PropsWithChildren } from "react";
import { getTrackBackground } from "react-range";
import { ITrackProps } from "react-range/lib/types";
import "./SliderTrack.scss";

interface SliderTrackProps {
  props: ITrackProps;
  min: number;
  max: number;
  values: number[];
}

const SliderTrack = ({
  children,
  values,
  props,
  min,
  max,
}: PropsWithChildren<SliderTrackProps>) => {
  return (
    <div
      className="track"
      ref={props.ref}
      style={{
        background: getTrackBackground({
          values,
          colors: ["#323537", "#7b61ff", "#323537"],
          min: min,
          max: max,
        }),
      }}
    >
      {children}
    </div>
  );
};

export default SliderTrack;
