import { useGetMoviesByIdQuery } from "../../requests/pixemaAPI";
import { useFavorites } from "../../store/hooks/useFavorites";
import Layout from "../../UI/Layout/Layout";
import Movie from "../Movies/Movie/Movie";
import "./Favorites.scss";

const Favorites = () => {
  const { favorites } = useFavorites();
  const query = favorites.map((item) => `search=${item}&field=id`).join("&");
  const countFavorites = Number(favorites.length);
  const { data } = useGetMoviesByIdQuery({ query, limit: countFavorites });
  const fetch = { docs: data };
  return (
    <div className="favorites">
      {favorites.length ? (
        <Layout>
          {countFavorites !== 1 ? (
            data?.docs.map((item) => <Movie key={item.id} docs={item} />)
          ) : (
            <Movie docs={fetch.docs} />
          )}
        </Layout>
      ) : (
        <div className="favorites__null">
          <img src="/assets/icons/favorite-null.png" alt="null" />
          {/* <img src="/pixema/assets/icons/favorite-null.png" alt="null" /> */}
          <h2>Список избранного пуст</h2>
        </div>
      )}
    </div>
  );
};

export default Favorites;
