import "./Search.scss";
import { useRef, useState } from "react";
import { useOutsideClick } from "rooks";
import { FiX } from "react-icons/fi";
import { useDebounce } from "usehooks-ts";
import SearchList from "./components/SearchList/SearchList";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import { filtersSlice } from "../../../store/reducers/filters.slice";
import cn from "classnames";

interface ISearch {
  openMenu?: boolean;
}

const Search = ({ openMenu }: ISearch) => {
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
        navigate(`/search/movies/${debouncedValue}`, { replace: true });
      }
    }
  });
  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
  return (
    <label className="search" ref={ref}>
      {/* <label className={cn("search", openMenu && "burger-menu__open")} ref={ref}> */}
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
            theme === "dark" || location.pathname === "/" ? "#242426" : "#fff",
          borderColor:
            theme === "dark" || location.pathname === "/"
              ? "transparent"
              : "#AFB2B6",
          color:
            theme === "dark" || location.pathname === "/" ? "#fff" : "#242426",
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
              theme === "dark" || location.pathname === "/"
                ? "#fff"
                : "#afb2b6",
          }}
        >
          <FiX />
        </button>
      ) : (
        <button
          className={cn(
            "filter-button",
            checkedFilters && "filter-button_active"
          )}
          onClick={() => dispatch(setVisibleFilter(true))}
        ></button>
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
