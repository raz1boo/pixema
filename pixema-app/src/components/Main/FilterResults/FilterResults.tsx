import { useEffect, useState } from "react";
import { useGetMoviesByFiltersQuery } from "../../api/PixemaAPI";
import Layout from "../../UI/Layout/Layout";
import Movie from "../Movies/Movie/Movie";
import "./FilterResults.scss";
import { ImSpinner11 } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import Loader from "../../UI/Loader/Loader";
import { HiOutlineX } from "react-icons/hi";
import _ from "lodash";
import { filtersSlice } from "../../store/reducers/filters.slice";

const FiltersResults = () => {
  const [limit, setLimit] = useState(10);
  const { filters, defaultValues } = useAppSelector(
    (state) => state.filtersReducers
  );
  const { setFilterYear, setFilterRating, setFilterGenres } =
    filtersSlice.actions;
  const dispatch = useAppDispatch();
  const { data, isFetching, isLoading } = useGetMoviesByFiltersQuery({
    filters,
    limit,
  });
  useEffect(() => {
    setLimit(10);
  }, [filters]);
  const { theme } = useAppSelector((state) => state.themeReducer);
  const { year, rating, genres } = { ...filters };
  return isLoading ? (
    <Loader />
  ) : (
    <div className="filters-results">
      {!_.isEqual(filters, defaultValues) && (
        <div className="filters-results__markers">
          {!_.isEqual(filters.year ,defaultValues.year) && (
            <div
              className="filters-results__markers__marker"
              style={{
                backgroundColor: theme === "light" ? "transparent" : "#242426",
                borderColor: theme === "light" ? "#afb2b6" : "transparent",
                color: theme === "light" ? "#242426" : "#fff",
              }}
            >
              {year.join('-')}
              <HiOutlineX
                onClick={() => dispatch(setFilterYear(defaultValues.year))}
                style={{
                  color: theme === "light" ? "#242426" : "#afb2b6",
                }}
              />
            </div>
          )}
          {!_.isEqual(filters.rating ,defaultValues.rating) && (
            <div
              className="filters-results__markers__marker"
              style={{
                backgroundColor: theme === "light" ? "transparent" : "#242426",
                borderColor: theme === "light" ? "#afb2b6" : "transparent",
                color: theme === "light" ? "#242426" : "#fff",
              }}
            >
              {rating.join('-')}
              <HiOutlineX
                onClick={() => dispatch(setFilterRating(defaultValues.rating))}
                style={{
                  color: theme === "light" ? "#242426" : "#afb2b6",
                }}
              />
            </div>
          )}
          {genres.map(
            (item) =>
              item.label && (
                <div
                  key={item.value}
                  className="filters-results__markers__marker"
                  style={{
                    backgroundColor:
                      theme === "light" ? "transparent" : "#242426",
                    borderColor: theme === "light" ? "#afb2b6" : "transparent",
                    color: theme === "light" ? "#242426" : "#fff",
                  }}
                >
                  {item.label}
                  <HiOutlineX
                    style={{
                      color: theme === "light" ? "#242426" : "#afb2b6",
                    }}
                    onClick={() =>
                      dispatch(
                        setFilterGenres(
                          genres.filter((i) => i.label !== item.label)
                        )
                      )
                    }
                  />
                </div>
              )
          )}
        </div>
      )}
      {data?.total ? (
        <>
          <Layout
            className={
              data?.docs?.length % 10 === 0
                ? "justify-content__space-between"
                : undefined
            }
          >
            {data?.docs.map((item) => (
              <Movie key={item.id} docs={item} />
            ))}
          </Layout>
          {data?.total > 10 && (
            <button
              onClick={() => setLimit(limit + 10)}
              style={{
                backgroundColor: theme === "light" ? "#AFB2B6" : "#242426",
              }}
            >
              {isFetching ? (
                <span>????????????????...</span>
              ) : (
                <span>
                  ???????????????? ?????? <ImSpinner11 />
                </span>
              )}
            </button>
          )}
        </>
      ) : (
        <div className="filters-results__null">
          <img src="/assets/icons/search-null.png" alt="null" />
          <h2>???? ???????????? ?????????????? ???????????? ???? ??????????????</h2>
        </div>
      )}
    </div>
  );
};

export default FiltersResults;
