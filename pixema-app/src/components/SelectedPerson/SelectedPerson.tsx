import { useParams } from "react-router-dom";
import { useGetPersonByIdQuery } from "../api/PixemaAPI";
import { convertTimestampToDate } from "../helpers/convertTimestampToDate";
import "./SelectedPerson.scss";

const SelectedMovie = () => {
  const params = useParams();
  const { data, isFetching } = useGetPersonByIdQuery(params.id);
  const {
    name,
    enName,
    death,
    birthday,
    age,
    growth,
    id,
    movies,
    photo,
    profession,
    sex,
  } = { ...data };
  const items = [
    {
      title: "Карьера",
      value: profession?.map((el) => <p key={el.value}>{el.value}</p>),
      condition: profession,
    },
    { title: "Возраст", value: age, condition: age },
    {
      title: "Пол",
      value: sex,
      condition: sex,
    },
    {
      title: "Рост",
      value: `${growth} см`,
      condition: growth,
    },
    {
      title: "Дата рождения",
      value: convertTimestampToDate(birthday, "D MMMM YYYY"),
      condition: birthday,
    },
    {
      title: "Дата смерти",
      value: convertTimestampToDate(death, "D MMMM YYYY"),
      condition: death,
    },
  ];

  
  // const movies = similarMovies?.filter((item: any) =>
  //   item.name?.length ? item : undefined
  // );
  // const tabs = [
  //   {
  //     txt: `Похожие ${
  //       (typeNumber === 1 && "фильмы") ||
  //       (typeNumber === 2 && "сериалы") ||
  //       (typeNumber === 3 && "мультфильмы")
  //     }`,
  //     content: (
  //       <TabsLayout
  //         movies={movies}
  //         title={`Похожие ${
  //           (typeNumber === 1 && "фильмы") ||
  //           (typeNumber === 2 && "сериалы") ||
  //           (typeNumber === 3 && "мультфильмы")
  //         } (${movies?.length})`}
  //       />
  //     ),
  //     condition: movies?.length,
  //   },
  //   {
  //     txt: "Актёры",
  //     content: <TabsLayout roles={roles} title={`Актёры (${roles?.length})`} />,
  //     condition: roles?.length,
  //   },
  //   {
  //     txt: "Сиквелы и приквелы",
  //     content: (
  //       <TabsLayout
  //         sequels={sequels}
  //         title={`Сиквелы и приквелы (${sequels?.length})`}
  //       />
  //     ),
  //     condition: sequels?.length,
  //   },
  // ];
  return (
    <>
      {!isFetching && (
        <div className="selected-person">
          {/* <div className="selected-person__top-block">
            <div className="selected-person__left-side">
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
            <div className="selected-person__right-side">
              <Genres genres={genres} />
              <h1>{name}</h1>
              <h2>{alternativeName}</h2>
              <div className="markers">
                <Rating rating={rating} />
                <Time movieLength={movieLength} />
                <AgeRating ageRating={ageRating} />
              </div>
              <div className="selected-person__description">{description}</div>
              <div className="selected-person__column-description">
                {items.map(
                  (item) =>
                    item.condition && (
                      <div
                        className="selected-person__column-description__block"
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
          <div className="selected-person__bottom-block">
            <Tabs tabs={tabs} />
          </div> */}
        </div>
      )}
    </>
  );
};

export default SelectedMovie;
