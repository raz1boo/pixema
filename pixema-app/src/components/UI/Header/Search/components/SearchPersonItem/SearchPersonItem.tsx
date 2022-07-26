import { Link } from "react-router-dom";
import { IMoviePerson } from "../../../../../types/IMovie";
import "./SearchPersonItem.scss";

interface SearchPersonItemProps {
  item: IMoviePerson;
}

const SearchPersonItem = ({ item }: SearchPersonItemProps) => {
  const { name, id, photo, enName } = item;
  return (
    <Link to={`/person/${id}`} className="search-item">
      <div className="search-item__left">
        <img src={photo} alt={`person/${id}`} />
        <div className="search-item__left__description">
          <h2>{name ? name : enName}</h2>
        </div>
      </div>
    </Link>
  );
};

export default SearchPersonItem;
