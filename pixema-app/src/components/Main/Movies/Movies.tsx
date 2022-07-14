import Layout from "../Layout/Layout";
import Movie from "./Movie/Movie";
import "./Movies.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { useGetNewMoviesQuery } from "../../api/PixemaAPI";
import { loadMoreMovies } from "../../store/reducers/loadMore.slice";

interface IMovies {
  movieType: number;
}

const Movies = ({ movieType }: IMovies) => {
  const { limit, type } = useAppSelector((state) => state.loadReducer);
  const dispatch = useAppDispatch();
  const { data, isFetching } = useGetNewMoviesQuery({ limit, type });
  return (
    <Layout>
      <div className="movies-block">
        <h1>
          {(movieType === 1 && "Новые фильмы") ||
            (movieType === 2 && "Новые сериалы") ||
            (movieType === 3 && "Новые мультфильмы")}
        </h1>
        <div className="movies-block__movies">
        {data?.docs.map(item=><Movie key={item.id} docs={item}/>)}
        </div>
        <div className="movies-block__button">
          <button onClick={() => dispatch(loadMoreMovies(movieType))}>
            {isFetching ? "Загрузка..." : "Показать ещё"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Movies;
