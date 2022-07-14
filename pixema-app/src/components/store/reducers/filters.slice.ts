import { getCurrentYear } from "../../helpers/getCurrentYear";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    year: `1990-${getCurrentYear()}`,
    rating: `0-10`,
    sortBy: "-1",
    genre: "",
    country: "",
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterYear: (state, action) => state.filters.year = action.payload,
    setFilterRating: (state, action) => state.filters.rating = action.payload,
    setFilterGenre: (state, action) => state.filters.genre = action.payload,
    setFilterCountry: (state, action) => state.filters.country = action.payload,
    setFilterSortBy: (state, action) => state.filters.sortBy = action.payload,
    resetFilters: (state) => {state.filters = initialState.filters},
  },
});

export const {
  setFilterCountry,
  setFilterGenre,
  setFilterRating,
  setFilterSortBy,
  setFilterYear,
  resetFilters,
} = filtersSlice.actions;

export const filtersReducers = filtersSlice.reducer;
