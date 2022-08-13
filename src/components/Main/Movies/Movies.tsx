import Movie from "./Movie/Movie";
import "./Movies.scss";
import { useGetNewMoviesQuery } from "../../requests/pixemaAPI";
import { useEffect, useState } from "react";
import Layout from "../../UI/Layout/Layout";
import { useAppSelector } from "../../store/hooks/redux";

interface IMoviesProps {
  type: number;
}

const NewMovies = ({ type }: IMoviesProps) => {
  const [limit, setLimit] = useState(10);
  const { data, isFetching } = useGetNewMoviesQuery({ limit, type });
  const { theme } = useAppSelector((state) => state.themeReducer);
  const [count, setCount] = useState(10);
  useEffect(() => {
    if (document.documentElement.clientWidth <= 1366 && document.documentElement.clientWidth > 1024) {
      setLimit(8);
      setCount(8);
    } else if (document.documentElement.clientWidth <= 1024 && document.documentElement.clientWidth > 734) {
      setLimit(9);
      setCount(9);
    } else if (document.documentElement.clientWidth < 735) {
      setLimit(10);
      setCount(10);
    }
  }, []);
  return (
    <Layout>
      <div className="movies-block">
        <h1 style={{ color: theme === "light" ? "#242426" : "#fff" }}>
          Новые{" "}
          {(type === 1 && "фильмы") ||
            (type === 2 && "сериалы") ||
            (type === 3 && "мультфильмы")}
        </h1>
        <div className="movies-block__movies">
          {data?.docs.map((item) => (
            <Movie key={item.id} docs={item} />
          ))}
        </div>
        <div className="movies-block__button">
          <button onClick={() => setLimit(limit + count)}>
            {isFetching ? "Загрузка..." : "Показать ещё"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewMovies;
