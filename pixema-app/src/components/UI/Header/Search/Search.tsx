import "./Search.scss";
import { useRef, useState } from "react";
import { useOutsideClick } from "rooks";
import { FiX } from "react-icons/fi";
import { useDebounce } from "usehooks-ts";
import SearchList from "./components/SearchList/SearchList";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks/redux";
import { filtersSlice } from "../../../store/reducers/filters.slice";

interface ISearch {
  openMenu?: boolean;
}

const Search = ({ openMenu }: ISearch) => {
  const dispatch = useAppDispatch();
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
  return (
    <label className="search" ref={ref}>
      {/* <label className={cn("search", openMenu && "burger-menu__open")} ref={ref}> */}
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setValue(e.target.value);
          setVisible(true);
        }}
        onClick={() => setVisible(true)}
        value={value}
      />
      {value ? (
        <button
          className="clear-button"
          onClick={() => {
            setVisible(false);
            setValue("");
          }}
        >
          <FiX />
        </button>
      ) : (
        <button
          className="filter-button"
          // className={cn(
          //   "filter-button",
          //   activeFilter && "filter-button_active"
          // )}
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
