import "./ModalFilter.scss";
import cn from "classnames";
import { HiOutlineX } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "rooks";
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
  const dispatch = useAppDispatch();
  const { visible, filters, defaultValues } = useAppSelector(
    (state) => state.filtersReducers
  );
  const root = document.getElementById("root") as HTMLElement;
  root.style.overflowY = visible ? "hidden" : "visible";
  const {
    setFilterYear,
    setFilterRating,
    setFilterGenres,
    setFilterSortBy,
    setVisibleFilter,
    setCheckedFilters,
  } = filtersSlice.actions;
  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues,
  });
  const onSubmit = handleSubmit((data) => {
    const { sortBy, rating, year, genres } = data;
    dispatch(setFilterRating(rating));
    dispatch(setFilterYear(year));
    dispatch(setFilterSortBy(sortBy));
    dispatch(setFilterGenres(genres));
    dispatch(setVisibleFilter(false));
    _.isEqual(getValues(), defaultValues)
      ? dispatch(setCheckedFilters(false))
      : dispatch(setCheckedFilters(true));
  });
  const handleReset = () => {
    reset({
      genres: defaultValues.genres,
      rating: defaultValues.rating,
      year: defaultValues.year,
      sortBy: defaultValues.sortBy,
    });
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
  const onSuggestHandler = () => {
    setText("");
    setSuggestions([]);
  };
  const ref = useRef<HTMLDivElement>(null);
  const genresRef = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    dispatch(setVisibleFilter(false));
    _.isEqual(getValues(), defaultValues)
      ? dispatch(setCheckedFilters(false))
      : dispatch(setCheckedFilters(true));
    reset({
      genres: filters.genres,
      rating: filters.rating,
      year: filters.year,
      sortBy: filters.sortBy,
    });
  });
  useOutsideClick(genresRef, () => {
    setText("");
    setSuggestions([]);
  });
  useEffect(() => {
    reset({
      genres: filters.genres,
      rating: filters.rating,
      year: filters.year,
      sortBy: filters.sortBy,
    });
  }, [filters]);
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
              _.isEqual(getValues(), defaultValues)
                ? dispatch(setCheckedFilters(false))
                : dispatch(setCheckedFilters(true));
              reset({
                genres: filters.genres,
                rating: filters.rating,
                year: filters.year,
                sortBy: filters.sortBy,
              });
            }}
          >
            <HiOutlineX />
          </div>
        </div>
        <div className="modal-filter__main">
          <div className="modal-filter__sort-by">
            <h3>Год выхода</h3>
              <Controller
                name="sortBy"
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <label className="sort-switcher">
                      <button
                        onClick={() => {
                          onChange("-1");
                        }}
                        value="-1"
                        name="sort"
                        disabled={getValues().sortBy === "-1"}
                      >
                        Новые
                      </button>
                      <button
                        onClick={() => {
                          onChange("1");
                        }}
                        value="1"
                        name="sort"
                        disabled={getValues().sortBy === "1"}
                      >
                        Старые
                      </button>
                    </label>
                  );
                }}
              />
          </div>
          <div className="modal-filter__genre">
            <h3>Жанры</h3>
            <div className="genre-block">
              <Controller
                name="genres"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <>
                      <ul>
                        <>
                          {value.map(
                            (genre) =>
                              genre.value && (
                                <li key={genre.value}>
                                  {genre.label}
                                  <HiOutlineX
                                    onClick={() => {
                                      onChange(
                                        value.filter(
                                          (item) => item.label !== genre.label
                                        )
                                      );
                                    }}
                                  />
                                </li>
                              )
                          )}
                          <input
                            type="text"
                            maxLength={20}
                            value={text}
                            onChange={(e) => onChangeHandler(e.target.value)}
                            placeholder={value[1]?.label ? "" : "Введите жанр"}
                          />
                        </>
                      </ul>
                      {suggestions && (
                        <div className="suggestions" ref={genresRef}>
                          {suggestions.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                onChange([
                                  ...value.filter(
                                    (i) => i.label !== item.label
                                  ),
                                  item,
                                ]);
                                onSuggestHandler();
                              }}
                              className="suggestion"
                            >
                              {item.label}
                              {value.map(
                                (element) =>
                                  element.label === item.label && (
                                    <FiCheck key={index} />
                                  )
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  );
                }}
              />
            </div>
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
