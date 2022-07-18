import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../api/PixemaAPI";
import { convertNumbers } from "../../helpers/convertNumbers";
import { convertTimestampToDate } from "../../helpers/convertTimestampToDate";
import { getRandomInt } from "../../helpers/getRandomInt";
import useScrollBlock from "../../helpers/scrollHook";
import AgeRating from "../../UI/AgeRating/AgeRating";
import Genres from "../../UI/Genres/Genres";
import Rating from "../../UI/Rating/Rating";
import Tabs from "../../UI/Tabs/Tabs";
import TabsLayout from "../../UI/Tabs/TabsLayout/TabsLayout";
import Time from "../../UI/Time/Time";
import IframeModal from "./IframeModal/IframeModal";
import PlayerModal from "./PlayerModal/PlayerModal";
import "./SelectedMovie.scss";

const SelectedMovie = () => {
  const params = useParams();
  const { data, isFetching } = useGetMovieByIdQuery(params.id);
  const [active, setActive] = useState(false);
  const [activePlayer, setActivePlayer] = useState(false);
  const {
    alternativeName,
    name,
    rating,
    similarMovies,
    ageRating,
    id,
    fees,
    genres,
    budget,
    movieLength,
    countries,
    description,
    persons,
    premiere,
    poster,
    videos,
    slogan,
    typeNumber,
    sequelsAndPrequels,
    year,
  } = { ...data };
  const prepareVideos = (videos: any) => {
    const regex =
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^&]{10,12})/;

    return videos?.map((video: any) => {
      return {
        ...video,
        embedUrl: `https://www.youtube.com/embed/${
          regex.exec(video.url)?.[1]
        }?mute=0&showinfo=0&iv_load_policy=3&autoplay=1&controls=1&rel=0&modestbranding=1`,
        imgUrl: `http://img.youtube.com/vi/${
          regex.exec(video.url)?.[1]
        }/hqdefault.jpg`,
      };
    });
  };
  const src = prepareVideos(
    videos?.trailers
      .map(
        (item: any) =>
          item.name.slice("").split(" ")[0] === "Трейлер" &&
          item.site === "youtube" &&
          item
      )
      .filter((i) => i)
  );
  const person = (value: any) => {
    return persons?.filter((item: any) =>
      item.enProfession === value ? item.name : undefined
    );
  };
  const items = [
    {
      title: "Год производства",
      value: year,
      condition: year,
    },
    {
      title: "Премьера в мире",
      value: convertTimestampToDate(premiere?.world, "D MMMM YYYY"),
      condition: premiere?.world,
    },
    {
      title: "Бюджет",
      value: `$${convertNumbers(budget?.value)}`,
      condition: budget?.value,
    },
    {
      title: "Сборы в мире",
      value: `$${convertNumbers(fees?.world?.value)}`,
      condition: fees?.world?.value,
    },
    {
      title: "Страна",
      value: countries?.map((el) => <p key={el.name}>{el.name}</p>),
      condition: countries?.length,
    },
    { title: "Слоган", value: `«${slogan}»`, condition: slogan },
    {
      title: "Время",
      value: <Time movieLength={movieLength} />,
      condition: movieLength,
    },
    {
      title: "Возраст",
      value: <AgeRating ageRating={ageRating} />,
      condition: ageRating,
    },
    {
      title: "Режиссер",
      value: persons?.[0].name,
      condition: persons?.[0].name,
    },
    {
      title: "Продюссер",
      value: person("producer")?.map((i) => <p key={i.name}>{i.name}</p>),
      condition: person("producer"),
    },
    {
      title: "Художник",
      value: person("design")?.map((i) => (
        <p key={i.name + getRandomInt(0, 50)}>{i.name}</p>
      )),
      condition: person("design"),
    },
    {
      title: "Монтаж",
      value: person("editor")?.map((i) => <p key={i.name}>{i.name}</p>),
      condition: person("editor"),
    },
  ];

  const roles = persons?.filter((item: any) =>
    item.enProfession === "actor" && item.name?.length ? item : undefined
  );
  const similars = similarMovies?.filter((item: any) =>
    item.name?.length ? item : undefined
  );
  const sequels = sequelsAndPrequels?.filter((item: any) =>
    item.name?.length ? item : undefined
  );
  const tabs = [
    {
      txt: `Похожие ${
        (typeNumber === 1 && "фильмы") ||
        (typeNumber === 2 && "сериалы") ||
        (typeNumber === 3 && "мультфильмы")
      }`,
      content: (
        <TabsLayout
          similars={similars}
          title={`Похожие ${
            (typeNumber === 1 && "фильмы") ||
            (typeNumber === 2 && "сериалы") ||
            (typeNumber === 3 && "мультфильмы")
          } (${similars?.length})`}
        />
      ),
      condition: similars?.length,
    },
    {
      txt: "Актёры",
      content: <TabsLayout roles={roles} title={`Актёры (${roles?.length})`} />,
      condition: roles?.length,
    },
    {
      txt: "Сиквелы и приквелы",
      content: (
        <TabsLayout
          sequels={sequels}
          title={`Сиквелы и приквелы (${sequels?.length})`}
        />
      ),
      condition: sequels?.length,
    },
  ];
  const [blockScroll, allowScroll] = useScrollBlock();
  active || activePlayer ? blockScroll() : allowScroll();
  return (
    <>
      <IframeModal
        src={src?.[0]?.embedUrl}
        active={active}
        closeModal={() => setActive(false)}
      />
      <PlayerModal
        id={id}
        active={activePlayer}
        closeModal={() => setActivePlayer(false)}
      />
      {!isFetching && (
        <div className="selected-movie">
          <div className="selected-movie__top-block">
            <div className="selected-movie__left-side">
              <img src={poster?.url} alt={`poster/${id}`} />
              <button className="favorite-button">
                <svg
                  width="14"
                  height="19"
                  viewBox="0 0 14 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.77 17.7843L7.48 14.4943C7.07224 14.1843 6.50776 14.1843 6.1 14.4943L1.77 17.7843C1.45424 18.0381 1.02377 18.0959 0.652275 17.9343C0.280782 17.7727 0.0295672 17.4184 0 17.0143V2.95431C0.0387838 2.12998 0.404652 1.35513 1.01656 0.80141C1.62847 0.247691 2.4359 -0.0391904 3.26 0.0043149H10.26C11.0891 -0.0335703 11.8987 0.262563 12.5077 0.826425C13.1166 1.39029 13.4741 2.17479 13.5 3.00431V17.0143C13.4611 17.4038 13.2163 17.7426 12.8586 17.9017C12.501 18.0609 12.0855 18.0161 11.77 17.7843Z"
                    fill="#AFB2B6"
                  />
                </svg>
              </button>
              <button
                className="watch-button"
                onClick={() => setActivePlayer(true)}
              >{`Смотреть ${
                (typeNumber === 1 && "фильм") ||
                (typeNumber === 2 && "сериал") ||
                (typeNumber === 3 && "мультфильм")
              }`}</button>
              {src?.[0]?.embedUrl && (
                <div className="trailer-block">
                  <button onClick={() => setActive(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="#fff"
                    >
                      <path fillRule="evenodd" d="M3 1.3v9.4L10.311 6z" />{" "}
                    </svg>
                    Смотреть трейлер
                  </button>
                  <img src={src?.[0]?.imgUrl} alt="trailer"></img>
                </div>
              )}
            </div>
            <div className="selected-movie__right-side">
              <Genres genres={genres} />
              <h1>{name}</h1>
              <h2>{alternativeName}</h2>
              <div className="markers">
                <Rating rating={rating} />
                <Time movieLength={movieLength} />
                <AgeRating ageRating={ageRating} />
              </div>
              <div className="selected-movie__description">{description}</div>
              <div className="selected-movie__column-description">
                {items.map(
                  (item) =>
                    item.condition && (
                      <div
                        className="selected-movie__column-description__block"
                        key={item.title}
                      >
                        <div className="title">{item.title}</div>
                        <div
                          className="content"
                          style={
                            item.title === "Слоган"
                              ? { color: "#afb2b6" }
                              : { color: "#fff" }
                          }
                        >
                          {item.value}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <div className="selected-movie__bottom-block">
            <Tabs tabs={tabs} />
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedMovie;
