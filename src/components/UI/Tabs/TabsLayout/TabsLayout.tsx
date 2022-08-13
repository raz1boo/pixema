import { SwiperSlide } from "swiper/react";
import Movie from "../../../Main/Movies/Movie/Movie";
import PersonMovie from "../../../Main/SelectedPerson/PersonMovie/PersonMovie";
import { IMovie, IMoviePerson } from "../../../types/IMovie";
import Slider from "../../Slider/Slider";
import PersonTab from "./PersonTab/PersonTab";
import "./TabsLayout.scss";

interface ITabsLayout {
  roles?: IMoviePerson[] | undefined;
  similars?: any[] | undefined;
  personMovies?: any[] | undefined;
  sequels?: IMovie[] | undefined;
  title?: string;
}

const TabsLayout = ({ roles, sequels, similars, title, personMovies }: ITabsLayout) => {
  return (
    <div className="tabs-layout">
      <Slider title={title}>
        {roles &&
          roles?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <PersonTab item={item} />
              </SwiperSlide>
            );
          })}
        {similars &&
          similars?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Movie docs={item} key={item.id} />
              </SwiperSlide>
            );
          })}
        {personMovies &&
          personMovies?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <PersonMovie docs={item} key={item.id} />
              </SwiperSlide>
            );
          })}
        {sequels &&
          sequels?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Movie docs={item} key={item.id} />
              </SwiperSlide>
            );
          })}
      </Slider>
    </div>
  );
};

export default TabsLayout;
