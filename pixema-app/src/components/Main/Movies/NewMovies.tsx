import Layout from "../Layout/Layout";
import Movie from "./Movie/Movie";
import "./Movies.scss";
import { useGetNewMoviesQuery } from "../../api/PixemaAPI";
import { IMovies } from "../../types/IMovies";
import { useState } from "react";

const NewMovies = ({type}:IMovies) => {
  const [limit, setLimit] = useState(10);
  const { data, isFetching } = useGetNewMoviesQuery({limit,type});

  return (
    <Layout>
      <div className="movies-block">
        <h1>Новые{
          (type===1&&'фильмы') ||
          (type===2&&'сериалы') ||
          (type===3&&'мультфильмы')
          }</h1>
        <div className="movies-block__movies">
          {data?.docs.map((item) => (
            <Movie key={item.id} docs={item} />
          ))}
        </div>
        <div className="movies-block__button">
        <button onClick={() => setLimit(limit+5)}>
            {isFetching ? "Загрузка..." : "Показать ещё"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewMovies;

