import { IMovieGenre } from "../../../types/IMovie";
import "./Movie.scss";
import cn from "classnames";

const Movie = ({ docs }: any) => {
  return (
    <div className="movie">
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
          {docs.rating.kp}
        </div>
      </div>
    </div>
  );
};

export default Movie;
