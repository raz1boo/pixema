import Movie from "./Movie/Movie";
import "./Movies.scss";
import { useGetNewMoviesQuery } from "../../api/PixemaAPI";
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
  const count = limit;
  useEffect(() => {
    document.documentElement.clientWidth <= 1366 && setLimit(8);
    document.documentElement.clientWidth <= 1024 && setLimit(9);
    document.documentElement.clientWidth < 768 && setLimit(10);
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
