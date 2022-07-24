import "./Movie.scss";
import { Link } from "react-router-dom";
import Rating from "../../../UI/Rating/Rating";
import Genres from "../../../UI/Genres/Genres";
import { useFavorites } from "../../../store/hooks/useFavorites";
import FavoriteSmallButton from "../../../UI/FavoriteSmallButton/FavoriteSmallButton";

const Movie = ({ docs }: any) => {
  const { favorites } = useFavorites();
  return (
    <div className="movie">
      <div className="movie__markers">
        <Rating rating={docs?.rating} />
        {favorites.map(
          (item) =>
            item === docs?.id && <FavoriteSmallButton key={item} id={item} />
        )}
      </div>
      <Link to={`/movie/${docs?.id}`}>
        <div
          style={{ backgroundImage: `url(${docs?.poster?.url})` }}
          className="movie__poster"
        ></div>
        <div className="movie__description">
          <h2>{docs?.name}</h2>
          <div className="movie__description__footer">
            <Genres genres={docs?.genres} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Movie;
