import { ReactNode, useRef } from "react";
import SwiperClass, { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import { useAppSelector } from "../../store/hooks/redux";
import "./Slider.scss";
import SliderBtn from "./SliderBtn/SliderBtn";

const breakpoints = {
  320: {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 30,
  },
  730: {
    slidesPerGroup: 2,
    slidesPerView: 2,
    spaceBetween: 30,
  },
  769: {
    slidesPerGroup: 3,
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1025: {
    slidesPerGroup: 4,
    slidesPerView: 4,
    spaceBetween: 30,
  },
  1200: {
    slidesPerGroup: 5,
    slidesPerView: 5,
    spaceBetween: 30,
  },
};

interface ISlider {
  children: ReactNode;
  title?: string;
}

const Slider = ({ children, title }: ISlider) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const navigation = {
    prevEl: navigationPrevRef.current,
    nextEl: navigationNextRef.current,
  };

  const onSwiper = (swiper: SwiperClass) => {
    // @ts-ignore
    swiper.params.navigation.prevEl = navigationPrevRef.current;
    // @ts-ignore
    swiper.params.navigation.nextEl = navigationNextRef.current;

    //   Re-init navigation
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  };
  const { theme } = useAppSelector((state) => state.themeReducer);
  return (
    <>
      <div
        className="tabs-layout__title-block"
      >
        <h2 style={{color: theme==='light'?'#242426':'#fff'}}>{title}</h2>
        <div className="swiper-buttons">
          <SliderBtn dir="left" ref={navigationPrevRef} />
          <SliderBtn dir="right" ref={navigationNextRef} />
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={15}
        navigation={navigation}
        onSwiper={onSwiper}
        breakpoints={breakpoints}
      >
        {children}
      </Swiper>
    </>
  );
};

export default Slider;
