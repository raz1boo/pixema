import "./Search.scss";
import { useRef, useState } from "react";
import { useOutsideClick } from "rooks";
import { FiX } from "react-icons/fi";
import { useDebounce } from "usehooks-ts";
import SearchList from "./components/SearchList/SearchList";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import { filtersSlice } from "../../../store/reducers/filters.slice";

const Search = () => {
  const dispatch = useAppDispatch();
  const { checkedFilters } = useAppSelector((state) => state.filtersReducers);
  const { setVisibleFilter } = filtersSlice.actions;
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const ref = useRef<HTMLLabelElement>(null);
  const isActive = debouncedValue && visible;
  useOutsideClick(ref, () => setVisible(false));
  const navigate = useNavigate();
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (debouncedValue) {
        setVisible(false);
        setValue("");
        navigate(`/pixema/search/films/${debouncedValue}`, { replace: true });
      }
    }
  });
  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
  return (
    <label className="search" ref={ref}>
      <input
        type="text"
        placeholder="Фильмы и сериалы"
        onChange={(e) => {
          setValue(e.target.value);
          setVisible(true);
        }}
        onClick={() => setVisible(true)}
        value={value}
        style={{
          backgroundColor:
            theme === "dark" || location.pathname === "/pixema" ? "#242426" : "#fff",
          borderColor:
            theme === "dark" || location.pathname === "/pixema"
              ? "transparent"
              : "#AFB2B6",
          color:
            theme === "dark" || location.pathname === "/pixema" ? "#fff" : "#242426",
        }}
      />
      {value ? (
        <button
          className="clear-button"
          onClick={() => {
            setVisible(false);
            setValue("");
          }}
          style={{
            color:
              theme === "dark" || location.pathname === "/pixema"
                ? "#fff"
                : "#afb2b6",
          }}
        >
          <FiX />
        </button>
      ) : (
        <button
          className="filter-button"
          onClick={() => dispatch(setVisibleFilter(true))}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6L19 6M10 12H19M14 18H19"
              stroke="#AFB2B6"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {checkedFilters && <circle cx="3" cy="19" r="3" fill="#7B61FF" />}
          </svg>
        </button>
      )}
      {isActive && (
        <SearchList
          value={debouncedValue}
          closeClick={() => {
            setValue("");
            setVisible(false);
          }}
        />
      )}
    </label>
  );
};

export default Search;
