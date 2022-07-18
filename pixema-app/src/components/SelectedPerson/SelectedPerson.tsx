import { useParams } from "react-router-dom";
import { useGetMoviesByIdQuery, useGetPersonByIdQuery } from "../api/PixemaAPI";
import { convertTimestampToDate } from "../helpers/convertTimestampToDate";
import Facts from "../UI/Facts/Facts";
import Tabs from "../UI/Tabs/Tabs";
import TabsLayout from "../UI/Tabs/TabsLayout/TabsLayout";
import "./SelectedPerson.scss";

const SelectedPerson = () => {
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
    facts,
  } = { ...data };
  const countFilms = Number(movies?.length) - 1;
  const query = movies?.map((el) => `search=${el.id}&field=id`).join("&");
  const { data: personMovies } = useGetMoviesByIdQuery({
    query,
    limit: countFilms + 1,
  });

  const items = [
    {
      title: "Карьера",
      value: profession?.map((el) => <p key={el.value}>{el.value}</p>),
      condition: profession,
    },
    {
      title: "Всего фильмов",
      value: countFilms,
      condition: countFilms,
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
  const tabs = [
    {
      txt: "Фильмы и сериалы",
      content: (
        <TabsLayout
          personMovies={personMovies?.docs}
          title={`Фильмы и сериалы (${personMovies?.docs?.length})`}
        />
      ),
      condition: personMovies?.docs?.length,
    },
    {
      txt: "Факты",
      content: <Facts facts={facts} />,
      condition: facts?.length,
    },
  ];
  return (
    <>
      {!isFetching && (
        <div className="selected-person">
          <div className="selected-person__top-block">
            <div className="selected-person__left-side">
              <img src={photo} alt={`img/${id}`} />
            </div>
            <div className="selected-person__right-side">
              <h1>{name}</h1>
              <h2>{enName}</h2>
              <div className="selected-person__column-description">
                {items.map(
                  (item) =>
                    item.condition && (
                      <div
                        className="selected-person__column-description__block"
                        key={item.title}
                      >
                        <div className="title">{item.title}</div>
                        <div className="content">{item.value}</div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <div className="selected-person__bottom-block">
            <Tabs tabs={tabs} />
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedPerson;
