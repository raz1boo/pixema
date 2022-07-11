import "./Search.scss";
import cn from "classnames";

interface ISearch {
  activeFilter?: boolean;
  openMenu?: boolean;
  openModalFilter?: () => void;
}

const Search = ({ activeFilter, openMenu, openModalFilter }: ISearch) => {
  return (
    <div className={cn("search", openMenu && "burger-menu__open")}>
      <input type="text" placeholder="Search" />
      <button
        className={cn("filter-button", activeFilter && "filter-button_active")}
        onClick={openModalFilter}
      ></button>
    </div>
  );
};

export default Search;
