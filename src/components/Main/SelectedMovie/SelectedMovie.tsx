import { useMemo, useState } from "react";
import { FiPlay } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../requests/pixemaAPI";
import { convertNumbers } from "../../helpers/convertNumbers";
import { convertTimestampToDate } from "../../helpers/convertTimestampToDate";
import { getRandomInt } from "../../helpers/getRandomInt";
import { useFavorites } from "../../store/hooks/useFavorites";
import AgeRating from "../../UI/AgeRating/AgeRating";
import Facts from "../../UI/Facts/Facts";
import Genres from "../../UI/Genres/Genres";
import Rating from "../../UI/Rating/Rating";
import Tabs from "../../UI/Tabs/Tabs";
import TabsLayout from "../../UI/Tabs/TabsLayout/TabsLayout";
import Time from "../../UI/Time/Time";
import MovieFavorite from "./components/FavoriteMovie/FavoriteMovie";
import IframeModal from "./components/IframeModal/IframeModal";
import PlayerModal from "./components/PlayerModal/PlayerModal";
import "./SelectedMovie.scss";
import cn from "classnames";
import { useAppSelector } from "../../store/hooks/redux";
import MediaQuery from "react-responsive";

const SelectedMovie = () => {
  const params = useParams();
  const { data, isLoading } = useGetMovieByIdQuery(params.id);
  const [active, setActive] = useState(false);
  const [activePlayer, setActivePlayer] = useState(false);
  const { theme } = useAppSelector((state) => state.themeReducer);
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
    facts,
    enName,
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
        imgUrl: `https://img.youtube.com/vi/${
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
      value: persons?.[0]?.name,
      condition: persons?.[0]?.name,
    },
    {
      title: "Продюссер",
      value: person("producer")?.map((i) => (
        <p key={i.name + getRandomInt(0, 500)}>{i.name}</p>
      )),
      condition: person("producer"),
    },
    {
      title: "Художник",
      value: person("design")?.map((i) => (
        <p key={i.name + getRandomInt(0, 500)}>{i.name}</p>
      )),
      condition: person("design"),
    },
    {
      title: "Монтаж",
      value: person("editor")?.map((i) => (
        <p key={i.name + getRandomInt(0, 500)}>{i.name}</p>
      )),
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
        ((typeNumber === 3 || typeNumber === 5) && "мультфильмы")
      }`,
      content: (
        <TabsLayout
          similars={similars}
          title={`Похожие ${
            (typeNumber === 1 && "фильмы") ||
            (typeNumber === 2 && "сериалы") ||
            ((typeNumber === 3 || typeNumber === 5) && "мультфильмы")
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
    {
      txt: "Факты",
      content: <Facts facts={facts} />,
      condition: facts?.length,
    },
  ];
  const root = document.getElementById("root") as HTMLElement;
  root.style.overflowY = active || activePlayer ? "hidden" : "visible";
  const { favorites } = useFavorites();
  const isFavorite = useMemo(
    () => favorites.includes(Number(id)),
    [favorites, id]
  );
  return (
    <>
      <IframeModal
        src={src?.[0]?.embedUrl}
        active={active}
        closeModal={() => setActive(false)}
      />
      {!isLoading && activePlayer && (
        <PlayerModal
          id={id}
          active={activePlayer}
          closeModal={() => setActivePlayer(false)}
        />
      )}
      {!isLoading && (
        <>
          <MediaQuery minWidth={769}>
            <div className="selected-movie">
              <div className="selected-movie__top-block">
                <div className="selected-movie__left-side">
                  <img src={poster?.url} alt={`poster/${id}`} />
                  <MovieFavorite id={id} isFavorite={isFavorite} title={true} />
                  <button
                    className={cn("watch-button", activePlayer && "active")}
                    onClick={() => setActivePlayer(true)}
                  >
                    <FiPlay />
                    {`Смотреть ${
                      (typeNumber === 1 && "фильм") ||
                      (typeNumber === 2 && "сериал") ||
                      (typeNumber === 3 && "мультфильм") ||
                      "фильм"
                    }`}
                  </button>
                  {src?.[0]?.embedUrl && (
                    <div className="trailer-block">
                      <button onClick={() => setActive(true)}>
                        <FiPlay />
                        Смотреть трейлер
                      </button>
                      <img src={src?.[0]?.imgUrl} alt="trailer"></img>
                    </div>
                  )}
                </div>
                <div className="selected-movie__right-side">
                  <Genres genres={genres} />
                  <h1 style={{ color: theme === "light" ? "#242426" : "#fff" }}>
                    {name ? name : enName}
                  </h1>
                  <h2>{alternativeName}</h2>
                  <div className="markers">
                    <Rating rating={rating} />
                    <Time movieLength={movieLength} />
                    <AgeRating ageRating={ageRating} />
                  </div>
                  <div
                    className="selected-movie__description"
                    style={{ color: theme === "light" ? "#242426" : "#fff" }}
                  >
                    {description}
                  </div>
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
                              style={{
                                color:
                                  theme === "light"
                                    ? item.title === "Слоган"
                                      ? "#afb2b6"
                                      : "#242426"
                                    : item.title === "Слоган"
                                    ? "#afb2b6"
                                    : "#fff",
                              }}
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
          </MediaQuery>
          <MediaQuery maxWidth={768}>
            <div className="selected-movie">
              <div className="selected-movie__top-block">
                <Genres genres={genres} />
                <h1 style={{ color: theme === "light" ? "#242426" : "#fff" }}>
                  {name ? name : enName}
                </h1>
                <h2>{alternativeName}</h2>
                <div className="markers">
                  <Rating rating={rating} />
                  <Time movieLength={movieLength} />
                  <AgeRating ageRating={ageRating} />
                </div>
                <img src={poster?.url} alt={`poster/${id}`} />
                <div className="selected-movie__buttons-block">
                  <MovieFavorite id={id} isFavorite={isFavorite} />
                  <button
                    className={cn("watch-button", activePlayer && "active")}
                    onClick={() => setActivePlayer(true)}
                  >
                    <FiPlay />
                  </button>
                </div>
                {src?.[0]?.embedUrl && (
                  <div className="trailer-block">
                    <button onClick={() => setActive(true)}>
                      <FiPlay />
                      Смотреть трейлер
                    </button>
                    <img src={src?.[0]?.imgUrl} alt="trailer"></img>
                  </div>
                )}
                <div
                  className="selected-movie__description"
                  style={{ color: theme === "light" ? "#242426" : "#fff" }}
                >
                  {description}
                </div>
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
                            style={{
                              color:
                                theme === "light"
                                  ? item.title === "Слоган"
                                    ? "#afb2b6"
                                    : "#242426"
                                  : item.title === "Слоган"
                                  ? "#afb2b6"
                                  : "#fff",
                            }}
                          >
                            {item.value}
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
              <div className="selected-movie__bottom-block">
                <Tabs tabs={tabs} />
              </div>
            </div>
          </MediaQuery>
        </>
      )}
    </>
  );
};

export default SelectedMovie;
