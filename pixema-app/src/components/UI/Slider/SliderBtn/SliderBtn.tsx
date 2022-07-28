import { forwardRef } from "react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { useAppSelector } from "../../../store/hooks/redux";
import ButtonBase from "../../ButtonBase/ButtonBase";
import "./SliderBtn.scss";

interface SliderBtnProps {
  dir: "left" | "right";
}

const SliderBtn = forwardRef<HTMLButtonElement, SliderBtnProps>(
  (props, ref) => {
    const { theme } = useAppSelector((state) => state.themeReducer);
    return (
      <ButtonBase ripple ref={ref}>
        {props.dir === "left" ? (
          <HiOutlineArrowNarrowLeft
            className="react-icons"
            style={{ color: theme === "light" ? "#242426" : "#fff" }}
          />
        ) : (
          <HiOutlineArrowNarrowRight
            className="react-icons"
            style={{ color: theme === "light" ? "#242426" : "#fff" }}
          />
        )}
      </ButtonBase>
    );
  }
);
export default SliderBtn;
SliderBtn.displayName = "SliderBtn";
