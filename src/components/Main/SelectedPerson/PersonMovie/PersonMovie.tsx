import "./PersonMovie.scss";
import { Link } from "react-router-dom";
import Rating from "../../../UI/Rating/Rating";
import Genres from "../../../UI/Genres/Genres";
import { useAppSelector } from "../../../store/hooks/redux";
import { IMovieProps } from "../../../types/IMovie";

const PersonMovie = ({ docs }: IMovieProps) => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  return (
    <Link to={`/film/${docs?.id}`} className="person-movie">
      <div
        style={{ backgroundImage: `url(${docs?.poster?.url})` }}
        className="person-movie__poster"
      >
        <Rating rating={docs?.rating} />
      </div>
      <div className="person-movie__description">
        <h2 style={{ color: theme === "light" ? "#242426" : "#fff" }}>
          {docs?.name}
        </h2>
        <div className="person-movie__description__footer">
          <p>
            {docs?.year === null ? "2022" : docs?.year}
            {(docs?.typeNumber === 1 && ", фильм") ||
              (docs?.typeNumber === 2 && ", сериал") ||
              (docs?.typeNumber === 3 && ", мультфильм")}
          </p>
          <Genres genres={docs?.genres} />
        </div>
      </div>
    </Link>
  );
};

export default PersonMovie;
