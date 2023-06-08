import "./Home.scss";
import { Link } from "react-router-dom";
import NewMovies from "../Movies/Movies";
import Rating from "../../UI/Rating/Rating";
import AgeRating from "../../UI/AgeRating/AgeRating";
import Genres from "../../UI/Genres/Genres";
import { useEffect, useState } from "react";
import { useGetNewMoviesQuery } from "../../requests/pixemaAPI";
import { useAppSelector } from "../../store/hooks/redux";
import { getCurrentDate } from "../../helpers/getCurrentDate";
import { getRandomInt } from "../../helpers/getRandomInt";
import { IMovieTrailer } from "../../types/IMovie";

const Home = () => {
  const { limit, type } = useAppSelector((state) => state.loadReducer);
  const { data, isFetching } = useGetNewMoviesQuery({ limit, type });
  const dataLength = data?.docs
    .map(
      (item) =>
        item?.videos?.trailers?.find(
          (i) => i.name === "Трейлер" && i.site === "youtube"
        ) && item
    )
    .filter((item) => item).length;
  const [bgVideo, setBgVideo] = useState(
    localStorage.getItem("bgVideo") || "0"
  );
  const [oldDate, setOldDate] = useState(
    localStorage.getItem("oldDate") || `${getCurrentDate() - 1}`
  );
  useEffect(() => {
    if (oldDate !== `${getCurrentDate()}`) {
      setBgVideo(`${getRandomInt(1, dataLength || 26)}`);
      setOldDate(`${getCurrentDate()}`);
    }
    localStorage.setItem("bgVideo", bgVideo);
    localStorage.setItem("oldDate", oldDate);
  }, [bgVideo, dataLength, oldDate]);
  const datta = data?.docs
    .map(
      (item) =>
        item?.videos?.trailers?.find(
          (i) => i.name === "Трейлер" && i.site === "youtube"
        ) && item
    )
    .filter((item) => item)[+bgVideo];
  const {
    name,
    rating,
    ageRating,
    id,
    genres,
    countries,
    description,
    videos,
    year,
  } = { ...datta };
  const prepareVideos = (videos: IMovieTrailer[] | undefined) => {
    const regex =
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^&]{10,12})/;

    return videos?.map((video: IMovieTrailer) => {
      return {
        ...video,
        embedUrl: `https://www.youtube.com/embed/${
          regex.exec(video.url)?.[1]
        }?mute=1&showinfo=0&iv_load_policy=3&cc_load_policy=3&autoplay=1&controls=0&fs=0&showsearch=0&rel=0&modestbranding=1&loop=1&playlist=${
          regex.exec(video.url)?.[1]
        }`,
      };
    });
  };
  const src = videos?.trailers.filter(
    (item) => item.name === "Трейлер" && item.site === "youtube"
  );
  return (
    <div className="home">
      {/* <div className="background-video-block">
        <div className="background-video-block__untouch-block"></div>
        <iframe
          title="video"
          src={prepareVideos(src)?.[0]?.embedUrl}
          allow="autoplay"
          frameBorder="0"
        ></iframe>
      </div>
      {!isFetching && (
        <div className="background-video-block__main">
          <h1>{name}</h1>
          <div className="background-video-block__small-description">
            <Rating rating={rating} />
            <div className="year">{year}</div>
            <Genres genres={genres} />
            <div className="countries">{countries?.[0].name}</div>
            <AgeRating ageRating={ageRating} />
          </div>
          <div className="background-video-block__description">
            {description}
          </div>
          <div className="background-video-block__button">
            <Link to={`/film/${id}`}>Подробнее</Link>
          </div>
        </div>
      )} */}
      <div className="home__content">
        <NewMovies type={1} />
        <NewMovies type={2} />
        <NewMovies type={3} />
      </div>
    </div>
  );
};

export default Home;
