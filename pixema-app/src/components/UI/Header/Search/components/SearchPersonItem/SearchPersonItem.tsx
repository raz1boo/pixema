import { Link } from "react-router-dom";
import { IMovie } from "../../../../../types/IMovie";
import Rating from "../../../../Rating/Rating";
import Time from "../../../../Time/Time";
import "./SearchPersonItem.scss";

interface SearchPersonItemProps {
  item: IMovie;
}

const SearchPersonItem = ({ item }: SearchPersonItemProps) => {
  const { name, id, poster, description, year, enName, movieLength, rating } =
    item;
  return (
    <Link to={`/movie/${id}`} className="search-item">
      <div className="search-item__left">
        <img src={poster?.previewUrl} alt={description} />
        <div className="search-item__left__description">
          <h2>{name ? name : enName}</h2>
          <span className="search-item__left__description__info">
            {year},
            <Time movieLength={movieLength} />
          </span>
        </div>
      </div>
      <Rating rating={rating} />
    </Link>
  );
};

export default SearchPersonItem;
