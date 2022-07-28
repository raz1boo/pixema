import "./ModalFilter.scss";
import cn from "classnames";
import { HiOutlineX } from "react-icons/hi";
import { useRef, useState } from "react";
import { useOutsideClick } from "rooks";
import useScrollBlock from "../../helpers/scrollHook";
import { filtersSlice } from "../../store/reducers/filters.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { Controller, useForm } from "react-hook-form";
import { getCurrentYear } from "../../helpers/getCurrentYear";
import getAllGenres from "../../constants/getAllGenres";
import FilterSlider from "../../UI/FilterSlider/FilterSlider";
import { Link } from "react-router-dom";
import ButtonBase from "../../UI/ButtonBase/ButtonBase";
import { FiCheck } from "react-icons/fi";
import _ from "lodash";

const ModalFilter = () => {
  const [text, setText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { label: string; value: string }[]
  >([]);
  const [checkedGenres, setCheckedGenres] = useState<
    { label: string; value: string }[]
  >([]);
  const dispatch = useAppDispatch();
  const { visible, defaultValues } = useAppSelector(
    (state) => state.filtersReducers
  );
  const [blockScroll, allowScroll] = useScrollBlock();
  visible ? blockScroll() : allowScroll();
  const [dis, setDis] = useState(true);
  const {
    setFilterYear,
    setFilterRating,
    setFilterGenre,
    setFilterSortBy,
    setVisibleFilter,
    setCheckedFilters,
  } = filtersSlice.actions;
  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues,
  });
  const onSubmit = handleSubmit((data) => {
    const { sortBy, rating, year } = data;
    const ratingString = `${rating[0]}-${rating[1]}`;
    const yearString = `${year[0]}-${year[1]}`;
    const ratings = rating[0] !== rating[1] ? ratingString : rating[0];
    const years = year[0] !== year[1] ? yearString : year[0];
    const genre = checkedGenres
      .map((item) => `search[]=${item.value}&field[]=genres.name`)
      .join("&");
    dispatch(setFilterRating(ratings));
    dispatch(setFilterYear(years));
    dispatch(setFilterSortBy(sortBy));
    dispatch(setFilterGenre(genre));
    dispatch(setVisibleFilter(false));
    !_.isEqual(getValues(), defaultValues) && dispatch(setCheckedFilters(true));
  });
  const handleReset = () => {
    setDis(true);
    reset();
    setCheckedGenres([]);
    dispatch(setCheckedFilters(false));
  };
  let matches: { label: string; value: string }[];
  const onChangeHandler = (value: string) => {
    matches = [];
    if (value.length > 0) {
      matches = getAllGenres.filter((item) => {
        const regex = new RegExp(`${value}`, "gi");
        return item.label.match(regex);
      });
    }
    setSuggestions(matches);
    setText(value);
  };
  const onSuggestHandler = (value: { label: string; value: string }) => {
    setText("");
    setSuggestions([]);
    setCheckedGenres((checkedGenres) => [
      ...checkedGenres.filter((item) => item.label !== value.label),
      value,
    ]);
  };
  const ref = useRef<HTMLDivElement>(null);
  const genresRef = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    dispatch(setVisibleFilter(false));
    !_.isEqual(getValues(), defaultValues) && dispatch(setCheckedFilters(true));
  });
  useOutsideClick(genresRef, () => {
    setText("");
    setSuggestions([]);
  });
  return (
    <div className={cn("modal-filter", visible && "active")}>
      <div
        className={cn("modal-filter__content", visible && "active")}
        ref={visible ? ref : null}
      >
        <div className="modal-filter__header">
          <h2>Фильтр</h2>
          <div
            className="close-button"
            onClick={() => {
              dispatch(setVisibleFilter(false));
              !_.isEqual(getValues(), defaultValues) &&
                dispatch(setCheckedFilters(true));
            }}
          >
            <HiOutlineX />
          </div>
        </div>
        <div className="modal-filter__main">
          <div className="modal-filter__sort-by">
            <h3>Год выхода</h3>
            <div className="sort-switcher">
              <Controller
                name="sortBy"
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <label className="sort-switcher">
                      <button
                        onClick={() => {
                          onChange("-1");
                          setDis(true);
                        }}
                        value="-1"
                        name="sort"
                        disabled={dis}
                      >
                        Сначала новые
                      </button>
                      <button
                        onClick={() => {
                          onChange("1");
                          setDis(false);
                        }}
                        value="1"
                        name="sort"
                        disabled={dis ? false : true}
                      >
                        Сначала старые
                      </button>
                    </label>
                  );
                }}
              />
            </div>
          </div>
          <div className="modal-filter__genre">
            <h3>Жанры</h3>
            <div className="genre-block">
              <ul>
                {checkedGenres.map((genre) => (
                  <li key={genre.value}>
                    {genre.label}
                    <HiOutlineX
                      onClick={() => {
                        setCheckedGenres(
                          checkedGenres.filter(
                            (item) => item.label !== genre.label
                          )
                        );
                      }}
                    />
                  </li>
                ))}
                <input
                  type="text"
                  maxLength={20}
                  value={text}
                  onChange={(e) => onChangeHandler(e.target.value)}
                  placeholder={checkedGenres.length ? "" : "Введите жанр"}
                />
              </ul>
            </div>
            {suggestions && (
              <div className="suggestions" ref={genresRef}>
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => onSuggestHandler(item)}
                    className="suggestion"
                  >
                    {item.label}
                    {checkedGenres.map(
                      (element) =>
                        element.label === item.label && <FiCheck key={index} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="modal-filter__years">
            <h3>Год производства</h3>
            <div className="years-block">
              <Controller
                name="year"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <FilterSlider
                      min={1990}
                      max={getCurrentYear()}
                      values={value}
                      onChange={onChange}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="modal-filter__rating">
            <h3>Рейтинг</h3>
            <div className="rating-block">
              <Controller
                name="rating"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <FilterSlider
                      min={1}
                      max={10}
                      values={value}
                      onChange={onChange}
                      step={1}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="modal-filter__footer">
          <ButtonBase className="footer-button clear" onClick={handleReset}>
            Очистить фильтр
          </ButtonBase>
          <ButtonBase className="footer-button results" onClick={onSubmit}>
            <Link to="/filter">Показать результаты</Link>
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
