import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPersonsBySearchQuery } from "../../requests/pixemaAPI";
import Layout from "../../UI/Layout/Layout";
import "./SearchResults.scss";
import { ImSpinner11 } from "react-icons/im";
import PersonTab from "../../UI/Tabs/TabsLayout/PersonTab/PersonTab";
import { useAppSelector } from "../../store/hooks/redux";
import Loader from "../../UI/Loader/Loader";

const SearchPersonsResults = () => {
  const params = useParams();
  const [limit, setLimit] = useState(10);
  const { data, isFetching, isLoading } = useGetPersonsBySearchQuery({
    query: `&search=${params.id}&field=name`,
    limit,
  });
  const [count, setCount] = useState(10);
  useEffect(() => {
    if (document.documentElement.clientWidth <= 1366 && document.documentElement.clientWidth > 1024) {
      setLimit(8);
      setCount(8);
    } else if (document.documentElement.clientWidth <= 1024 && document.documentElement.clientWidth > 734) {
      setLimit(9);
      setCount(9);
    } else if (document.documentElement.clientWidth < 735) {
      setLimit(10);
      setCount(10);
    }
  }, []);
  const { theme } = useAppSelector((state) => state.themeReducer);
  return isLoading ? (
    <div style={{ paddingTop: "150px" }}>
      <Loader />
    </div>
  ) : (
    <div className="search-results">
      {data?.total ? (
        <>
          <Layout
            className={
              data?.docs?.length % 10 === 0 ||
              data?.docs?.length % 8 === 0 ||
              data?.docs?.length % 9 === 0 ||
              data?.docs?.length % 5 === 0
                ? "justify-content__space-between"
                : undefined
            }
          >
            {data?.docs.map((item) => (
              <PersonTab key={item.id} item={item} />
            ))}
          </Layout>
          {data?.total > 10 && (
            <div className="button-layout">
              <button
                onClick={() => setLimit(limit + count)}
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
            </div>
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

export default SearchPersonsResults;
