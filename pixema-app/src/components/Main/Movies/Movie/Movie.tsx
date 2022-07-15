import "./Movie.scss";
import cn from "classnames";

const Movie = ({ docs }: any) => {
  const rating= `${docs.rating.kp}`;
  return (
    <div className="movie">
      <div
        style={{ backgroundImage: `url(${docs.poster.url})` }}
        className="movie__poster">
        <div
          className={cn(
            "rating",
            docs.rating.kp &&
              ((docs.rating.kp >= 7 && "__green") ||
                (docs.rating.kp <= 5 && "__red"))
          )} >
          {rating.split('')[1]?rating:rating+'.0'}
        </div>
      </div>
      <div className="movie__description">
        <p>{docs.name}</p>
      </div>
    </div>
  );
};

export default Movie;
