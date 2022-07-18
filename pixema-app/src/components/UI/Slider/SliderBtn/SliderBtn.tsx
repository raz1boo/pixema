import { forwardRef } from "react";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";
import ButtonBase from "../../ButtonBase/ButtonBase";
import './SliderBtn.scss'

interface SliderBtnProps {
  dir: "left" | "right";
}

const SliderBtn = forwardRef<HTMLButtonElement, SliderBtnProps>(
  (props, ref) => {
    return (
      <ButtonBase ripple ref={ref}>
        {props.dir === "left" ? <HiOutlineArrowNarrowLeft className='react-icons' /> : <HiOutlineArrowNarrowRight className='react-icons' />}
      </ButtonBase>
    );
  }
);
export default SliderBtn;
SliderBtn.displayName = "SliderBtn";
