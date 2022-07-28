import { loadMoreMovies } from "./reducers/loadMore.slice";
import {
  setFilterRating,
  setFilterGenre,
  setFilterYear,
  setFilterSortBy,
  setVisibleFilter,
  setCheckedFilters,
} from "./reducers/filters.slice";
import { setTheme } from "./reducers/theme.slice";

export default {
  loadMoreMovies,
  setFilterGenre,
  setFilterRating,
  setFilterSortBy,
  setFilterYear,
  setVisibleFilter,
  setCheckedFilters,
  setTheme,
};
