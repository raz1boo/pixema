import { IThumbProps } from "react-range/lib/types";
import "./SliderThumb.scss";

interface SliderThumbProps {
  value?: number;
  initialValue?: number | undefined;
  props: IThumbProps;
}

const SliderThumb = ({ props }: SliderThumbProps) => {
  return <div {...props} className="thumb" />;
};

export default SliderThumb;
