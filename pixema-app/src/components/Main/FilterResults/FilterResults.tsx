import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMoviesByNameQuery } from "../../api/PixemaAPI";
import Layout from "../../UI/Layout/Layout";
import Movie from "../Movies/Movie/Movie";
import "./FilterResults.scss";
import { ImSpinner11 } from "react-icons/im";

const FiltersResults = () => {
  const params = useParams();
  const [limit, setLimit] = useState(10);
  const { data, isFetching } = useGetMoviesByNameQuery({
    query: params.id,
    limit,
  });
  useEffect(() => {
    setLimit(10);
  }, []);
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
            <button onClick={() => setLimit(limit + 10)}>
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
