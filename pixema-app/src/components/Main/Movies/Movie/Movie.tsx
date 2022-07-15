import "./Movie.scss";
import { IMovieGenre } from "../../../types/IMovie";
import { Link } from "react-router-dom";
import Rating from "../../../UI/Rating/Rating";

const Movie = ({ docs }: any) => {
  const rating = `${docs.rating.kp}`;
  return (
    <Link to={`/film/${docs.id}`} className="movie">
      <div
        style={{ backgroundImage: `url(${docs.poster.url})` }}
        className="movie__poster"
      >
        <Rating rating={docs.rating} />
      </div>
      <div className="movie__description">
        <h2>{docs.name}</h2>
        <div className="movie__description__footer">
          {docs.genres.map((item: IMovieGenre) => (
            <p key={item.name}>{item.name}</p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Movie;
