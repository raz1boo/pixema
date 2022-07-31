import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMoviesByNameQuery } from "../../api/PixemaAPI";
import Layout from "../../UI/Layout/Layout";
import Movie from "../Movies/Movie/Movie";
import "./SearchResults.scss";
import { ImSpinner11 } from "react-icons/im";
import { useAppSelector } from "../../store/hooks/redux";
import Loader from "../../UI/Loader/Loader";

const SearchMoviesResults = () => {
  const params = useParams();
  const [limit, setLimit] = useState(10);
  const { data, isFetching, isLoading } = useGetMoviesByNameQuery({
    query: params.id,
    limit,
  });
  useEffect(() => {
    setLimit(10);
  }, []);
  const { theme } = useAppSelector((state) => state.themeReducer);
  return isLoading ? (
    <Loader />
  ) : (
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

export default SearchMoviesResults;
