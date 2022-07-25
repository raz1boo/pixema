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
  const { data: persons } = useGetPersonsBySearchQuery({
    query: `&search=${value}&field=name`,
    limit: 100,
  });
  console.log(persons);

  return (
    <div className="search-list">
      <div className="search-list__buttons">
        <div className="search-list__buttons__label">
          <button
            onClick={() => setType(1)}
            className={cn(
              "search-list__buttons__button",
              type === 1 && "active"
            )}
          >
            Фильмы
          </button>
          <button
            onClick={() => setType(2)}
            className={cn(
              "search-list__buttons__button",
              type === 2 && "active"
            )}
          >
            Сериалы
          </button>
          <button
            onClick={() => setType(3)}
            className={cn(
              "search-list__buttons__button",
              type === 3 && "active"
            )}
          >
            Мультфильмы
          </button>
          <button
            onClick={() => setType(3)}
            className={cn(
              "search-list__buttons__button",
              type === 3 && "active"
            )}
          >
            Люди
          </button>
        </div>
      </div>
      {data?.docs?.length ? (
        <div className="search-list__main">
          {!isFetching ? (
            <div className="search-list__main__items">
              {data?.docs.map((item: any) => (
                <SearchItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <Loader />
          )}
          <ButtonBase>Показать все</ButtonBase>
        </div>
      ) : (
        <div className="search-list__main">
          <h2>По вашему запросу ничего не найдено</h2>
        </div>
      )}
    </div>
  );
};

export default SearchList;
