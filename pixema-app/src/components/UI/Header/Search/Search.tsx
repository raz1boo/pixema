import "./Search.scss";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import { FormEvent, useRef, useState } from "react";
import { useOutsideClick } from "rooks";
import { searchSlice } from "../../../store/reducers/search.slice";
import { FiX } from "react-icons/fi";
import { useDebounce } from "usehooks-ts";
import SearchList from "./components/SearchList/SearchList";

interface ISearch {
  activeFilter?: boolean;
  openMenu?: boolean;
  openModalFilter?: () => void;
}

const Search = ({ activeFilter, openMenu, openModalFilter }: ISearch) => {
  const dispatch = useAppDispatch();
  const { visible } = useAppSelector((state) => state.searchReducer);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const ref = useRef<HTMLLabelElement>(null);
  const isActive = debouncedValue && visible;
  const { setSearch, setVisible } = searchSlice.actions;
  useOutsideClick(ref, () => dispatch(setVisible(false)));
  const submitForm = (
    e: FormEvent<HTMLFormElement | HTMLButtonElement | HTMLLabelElement>
  ) => {
    e.preventDefault();
    setSearch(value);
    setVisible(false);
    setValue("");
  };
  return (
    <label
      className={cn("search", openMenu && "burger-menu__open")}
      ref={ref}
      onSubmit={submitForm}
    >
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setValue(e.target.value)}
        onClick={() => dispatch(setVisible(true))}
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
          className={cn(
            "filter-button",
            activeFilter && "filter-button_active"
          )}
          onClick={openModalFilter}
        ></button>
      )}
      {isActive && <SearchList value={debouncedValue} />}
    </label>
  );
};

export default Search;
