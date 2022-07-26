import { loadMoreMovies } from "./reducers/loadMore.slice";
import {
  setFilterCountry,
  setFilterRating,
  setFilterGenre,
  setFilterYear,
  setFilterSortBy,
  resetFilters,
} from "./reducers/filters.slice";

export default {
  loadMoreMovies,
  setFilterCountry,
  setFilterGenre,
  setFilterRating,
  setFilterSortBy,
  setFilterYear,
  resetFilters,
};
