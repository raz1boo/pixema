import "./Search.scss";
import cn from "classnames";

interface ISearch {
  activeFilter?: boolean;
}

const Search = ({ activeFilter }: ISearch) => {
  return (
    <div className="search">
      <input type="text" placeholder="Search" />
      <button
        className={cn("filter-button", activeFilter && "filter-button_active")}
      ></button>
    </div>
  );
};

export default Search;
