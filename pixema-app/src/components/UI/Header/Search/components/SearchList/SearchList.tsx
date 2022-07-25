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
import { IMovie } from "../../../../../types/IMovie";

interface SearchListProps {
  value: string;
}

const SearchList = ({ value }: SearchListProps) => {
  const [type, setType] = useState(1);
  const { data, isFetching } = useGetMoviesBySearchQuery({
    query: value,
    type,
    limit: 100,
  });
  const [person, setPerson] = useState(false);
  const { data: persons } = useGetPersonsBySearchQuery({
    query: `&search=${value}&field=name`,
    limit: 100,
  });
  console.log(persons?.docs);
  let content = null;
  if (data?.docs?.length && (type === 1 || type === 2 || type === 3)) {
    content = (
      <>
        <div className="search-list__main__items">
          {data?.docs?.map((item: IMovie) => (
            <SearchItem key={item.id} item={item} />
          ))}
        </div>
        <ButtonBase>Показать все</ButtonBase>
      </>
    );
  } else if (persons?.docs?.length && type === 0) {
    content = (
      <>
        <div className="search-list__main__items">
          {persons?.docs?.map((item: IMovie) => (
            <SearchItem key={item.id} item={item} />
          ))}
        </div>
        <ButtonBase>Показать все</ButtonBase>
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
        <div className="search-list__buttons__label">
          <button
            onClick={() => {
              setType(1);
              setPerson(false);
            }}
            className={cn(
              "search-list__buttons__button",
              type === 1 && "active"
            )}
          >
            Фильмы
          </button>
          <button
            onClick={() => {
              setType(2);
              setPerson(false);
            }}
            className={cn(
              "search-list__buttons__button",
              type === 2 && "active"
            )}
          >
            Сериалы
          </button>
          <button
            onClick={() => {
              setType(3);
              setPerson(false);
            }}
            className={cn(
              "search-list__buttons__button",
              type === 3 && "active"
            )}
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
      </div>
      <div className="search-list__main">
        {isFetching ? <Loader /> : content}
      </div>
    </div>
  );
};

export default SearchList;
