import { useEffect, useState } from "react";
import { useGetMoviesByFiltersQuery } from "../../api/PixemaAPI";
import Layout from "../../UI/Layout/Layout";
import Movie from "../Movies/Movie/Movie";
import "./FilterResults.scss";
import { ImSpinner11 } from "react-icons/im";
import { useAppSelector } from "../../store/hooks/redux";

const FiltersResults = () => {
  const [limit, setLimit] = useState(10);
  const { filters } = useAppSelector((state) => state.filtersReducers);
  const { data, isFetching } = useGetMoviesByFiltersQuery({
    filters,
    limit,
  });
  useEffect(() => {
    setLimit(10);
  }, [filters]);
  const { theme } = useAppSelector((state) => state.themeReducer);
  return (
    <div className="search-results">
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
                <span>Загрузка...</span>
              ) : (
                <span>
                  Показать ещё <ImSpinner11 />
                </span>
              )}
            </button>
          )}
        </>
      ) : (
        <div className="search-results__null">
          <img src="/assets/icons/search-null.png" alt="null" />
          <h2>По вашему запросу ничего не найдено</h2>
        </div>
      )}
    </div>
  );
};

export default FiltersResults;
