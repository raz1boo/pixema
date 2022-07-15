import "./Home.scss";
import { useGetMovieByIdQuery } from "../../api/PixemaAPI";
import { Link } from "react-router-dom";
import cn from "classnames";
import NewMovies from "../Movies/NewMovies";

interface IHome {
  idBigVideo?: string | string[] | undefined;
}

const Home = ({ idBigVideo }: IHome) => {
  // useMemo(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://kinobd.ru/js/player_.js";
  //   document.body.append(script);
  // }, []);
  // <div
  //           style={{ height: "800px", width: "800px", display: "block" }}
  //           id="kinobd"
  //           data-resize="1"
  //           data-bg="#000"
  //           data-kinopoisk='1046206'
  //         ></div>
  const { data, isFetching } = useGetMovieByIdQuery(idBigVideo);
  const prepareVideos = (videos: any) => {
    const regex =
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^&]{10,12})/;

    return videos?.map((video: any) => {
      return {
        ...video,
        embedUrl: `https://www.youtube.com/embed/${
          regex.exec(video.url)?.[1]
        }?mute=1&autoplay=1&controls=0&loop=1&playlist=${
          regex.exec(video.url)?.[1]
        }`,
      };
    });
  };
  const src = prepareVideos(
    data?.videos?.trailers
      .map(
        (item: any) =>
          item.name.slice("").split(" ")[0] === "Трейлер" &&
          item.site === "youtube" &&
          item
      )
      .filter((i) => i)
  );
  const rating= `${data?.rating?.kp}`;
  return (
    <div className="home">
      <div className="background-video-block">
        <div className="background-video-block__untouch-block"></div>
        <iframe
          title="video"
          src={
            src
              ? src[0].embedUrl
                ? src[0].embedUrl
                : "https://www.youtube.com/embed/aWzlQ2N6qqg?mute=1&autoplay=1&controls=0&loop=1&playlist=aWzlQ2N6qqg"
              : "https://www.youtube.com/embed/aWzlQ2N6qqg?mute=1&autoplay=1&controls=0&loop=1&playlist=aWzlQ2N6qqg"
          }
          allow="autoplay"
          frameBorder="0"
        ></iframe>
        {!isFetching&&<div className="background-video-block__main">
          <h1>{data?.name}</h1>
          <div className="background-video-block__small-description">
            <div
              className={cn(
                "rating",
                data?.rating?.kp &&
                  ((data?.rating?.kp >= 7 && "__green") ||
                    (data?.rating?.kp <= 5 && "__red"))
              )}
            >
              {rating.split('')[1]?rating:rating+'.0'}
            </div>
            <div className="year">{data?.year}</div>
            <div className="genres">
              {data?.genres?.map((item) => (
                <p key={item.name}>{item.name}</p>
              ))}
            </div>
            <div className="countries">{data?.countries?.[0].name}</div>
            <div className="countries">{data?.ageRating}+</div>
          </div>
          <div className="background-video-block__description">
            {data?.description}
          </div>
          <div className="background-video-block__button">
            <Link to="/settings">Подробнее</Link>
          </div>
        </div>}
      </div>
      <div className="home__content">
      <NewMovies type={1} />
      <NewMovies type={2} />
      <NewMovies type={3} />
      </div>
    </div>
  );
};

export default Home;
