import Movie from "./Movie/Movie";
import "./Movies.scss";
import { useGetTrendMoviesQuery } from "../../api/PixemaAPI";
import { useState } from "react";
import Layout from "../../UI/Layout/Layout";

interface TrendMoviesProps {
  type: number;
}

const TrendMovies = ({ type }: TrendMoviesProps) => {
  const [limit, setLimit] = useState(10);
  const { data, isFetching } = useGetTrendMoviesQuery({ limit, type });

  return (
    <Layout>
      <div className="movies-block">
        <h1>
          Лучшие{" "}
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
          <button onClick={() => setLimit(limit + 10)}>
            {isFetching ? "Загрузка..." : "Показать ещё"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TrendMovies;
