import {
  useGetMovieByIdQuery,
  useGetMoviesByIdQuery,
} from "../../requests/pixemaAPI";
import { useFavorites } from "../../store/hooks/useFavorites";
import { IMovie } from "../../types/IMovie";
import Layout from "../../UI/Layout/Layout";
import Movie from "../Movies/Movie/Movie";
import "./Favorites.scss";

const Favorites = () => {
  const { favorites } = useFavorites();
  const query = favorites.map((item) => `search=${item}&field=id`).join("&");
  const countFavorites = Number(favorites.length);
  const { data } = useGetMoviesByIdQuery({ query, limit: countFavorites });
  const { data: onceData } = useGetMovieByIdQuery(favorites[0]);
  const fetch = { docs: [onceData], total: 1, limmit: 1 };
  return (
    <div className="favorites">
      {favorites.length ? (
        <Layout
          className={
            countFavorites % 5 === 0
              ? "justify-content__space-between"
              : undefined
          }
        >
          {countFavorites !== 1 ? (
            data?.docs.map((item: IMovie) => (
              <Movie key={item.id} docs={item} />
            ))
          ) : (
            <Movie docs={fetch?.docs?.[0]} />
          )}
        </Layout>
      ) : (
        <div className="favorites__null">
          <img src="/assets/icons/favorite-null.png" alt="null" />
          <h2>Список избранного пуст</h2>
        </div>
      )}
    </div>
  );
};

export default Favorites;
