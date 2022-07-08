import "./Search.scss";
import cn from "classnames";

interface ISearch {
  activeFilter?: boolean;
  openMenu?: boolean;
}

const Search = ({ activeFilter, openMenu }: ISearch) => {
  return (
    <div className={cn("search", openMenu&&'burger-menu__open')}>
      <input type="text" placeholder="Search" />
      <button
        className={cn("filter-button", activeFilter && "filter-button_active")}
      ></button>
    </div>
  );
};

export default Search;
