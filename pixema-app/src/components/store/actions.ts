import { loadMoreMovies } from "./reducers/loadMore.slice";
import {
  setFilterRating,
  setFilterGenres,
  setFilterYear,
  setFilterSortBy,
  setVisibleFilter,
  setCheckedFilters,
} from "./reducers/filters.slice";
import { setTheme } from "./reducers/theme.slice";
import { logout, setUser } from "./reducers/auth.slice";

export default {
  loadMoreMovies,
  setFilterGenres,
  setFilterRating,
  setFilterSortBy,
  setFilterYear,
  setVisibleFilter,
  setCheckedFilters,
  setTheme,
  logout,
  setUser,
};
