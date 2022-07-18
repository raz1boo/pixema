import "./Movie.scss";
import { Link } from "react-router-dom";
import Rating from "../../../UI/Rating/Rating";
import Genres from "../../../UI/Genres/Genres";

const Movie = ({ docs }: any) => {
  return (
    <Link to={`/movie/${docs.id}`} className="movie">
      <div
        style={{ backgroundImage: `url(${docs.poster.url})` }}
        className="movie__poster"
      >
        <Rating rating={docs.rating} />
      </div>
      <div className="movie__description">
        <h2>{docs.name}</h2>
        <div className="movie__description__footer">
          <Genres genres={docs.genres} />
        </div>
      </div>
    </Link>
  );
};

export default Movie;
