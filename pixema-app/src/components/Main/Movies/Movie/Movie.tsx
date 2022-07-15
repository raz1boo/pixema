import "./Movie.scss";
import cn from "classnames";
import { IMovieGenre } from "../../../types/IMovie";
import { Link } from "react-router-dom";

const Movie = ({ docs }: any) => {
  const rating = `${docs.rating.kp}`;
  return (
    <Link to={`/film/${docs.id}`} className="movie">
      <div
        style={{ backgroundImage: `url(${docs.poster.url})` }}
        className="movie__poster"
      >
        <div
          className={cn(
            "rating",
            docs.rating.kp &&
              ((docs.rating.kp >= 7 && "__green") ||
                (docs.rating.kp <= 5 && "__red"))
          )}
        >
          {rating.split("")[1] ? rating : rating + ".0"}
        </div>
      </div>
      <div className="movie__description">
        <h2>{docs.name}</h2>
        <div className="movie__description__footer">
          <p>{docs.year}</p>
          {docs.genres.map((item: IMovieGenre) => (
            <p key={item.name}>{item.name}</p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Movie;
