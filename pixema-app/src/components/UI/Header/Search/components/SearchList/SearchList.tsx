import { useState } from "react";
import {
  useGetMoviesBySearchQuery,
  useGetPersonsBySearchQuery,
} from "../../../../../api/PixemaAPI";
import ButtonBase from "../../../../ButtonBase/ButtonBase";
import Loader from "../../../../Loader/Loader";
import SearchItem from "../SearchItem/SearchItem";
import "./SearchList.scss";
import cn from "classnames";
import { IMovie, IMoviePerson } from "../../../../../types/IMovie";
import SearchPersonItem from "../SearchPersonItem/SearchPersonItem";
import { Link } from "react-router-dom";

interface SearchListProps {
  value: string;
  closeClick?: () => void;
}

const SearchList = ({ value, closeClick }: SearchListProps) => {
  const [type, setType] = useState(1);
  const { data, isFetching } = useGetMoviesBySearchQuery({
    query: value,
    type,
    limit: 40,
  });
  const [person, setPerson] = useState(false);
  const { data: persons } = useGetPersonsBySearchQuery({
    query: `&search=${value}&field=name`,
    limit: 40,
  });
  let content = null;
  if (data?.docs?.length && (type === 1 || type === 2 || type === 3)) {
    content = (
      <>
        <div className="search-list__main__items">
          {data?.docs?.map((item: IMovie) => (
            <SearchItem key={item.id} item={item} />
          ))}
        </div>
        <Link to={`/search/films/${value}`}>
          <ButtonBase>Показать все</ButtonBase>
        </Link>
      </>
    );
  } else if (persons?.docs?.length && type === 0) {
    content = (
      <>
        <div className="search-list__main__items">
          {persons?.docs?.map((item: IMoviePerson) => (
            <SearchPersonItem key={item.id} item={item} />
          ))}
        </div>

        <Link to={`/search/names/${value}`}>
          <ButtonBase>Показать все</ButtonBase>
        </Link>
      </>
    );
  } else {
    content = (
      <div className="search-list__main not-founded">
        <h2>По вашему запросу ничего не найдено</h2>
      </div>
    );
  }
  return (
    <div className="search-list">
      <div className="search-list__buttons">
        <button
          onClick={() => {
            setType(1);
            setPerson(false);
          }}
          className={cn("search-list__buttons__button", type === 1 && "active")}
        >
          Фильмы
        </button>
        <button
          onClick={() => {
            setType(2);
            setPerson(false);
          }}
          className={cn("search-list__buttons__button", type === 2 && "active")}
        >
          Сериалы
        </button>
        <button
          onClick={() => {
            setType(3);
            setPerson(false);
          }}
          className={cn("search-list__buttons__button", type === 3 && "active")}
        >
          Мультфильмы
        </button>
        <button
          onClick={() => {
            setPerson(true);
            setType(0);
          }}
          className={cn("search-list__buttons__button", person && "active")}
        >
          Люди
        </button>
      </div>

      {isFetching ? (
        <div
          className="search-list__main search-list__main__loader"
          onClick={closeClick}
        >
          <Loader />
        </div>
      ) : (
        <div className="search-list__main" onClick={closeClick}>
          {content}
        </div>
      )}
    </div>
  );
};

export default SearchList;
