import { getCurrentYear } from "../../helpers/getCurrentYear";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  checkedFilters: false,
  filters: {
    year: [1990, getCurrentYear()],
    rating: [1, 10],
    sortBy: "-1",
    genres: [{ label: "", value: "" }],
  },
  defaultValues: {
    year: [1990, getCurrentYear()],
    rating: [1, 10],
    sortBy: "-1",
    genres: [{ label: "", value: "" }],
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterYear: (state, action) => {
      state.filters.year = action.payload;
    },
    setFilterRating: (state, action) => {
      state.filters.rating = action.payload;
    },
    setFilterGenres: (state, action) => {
      state.filters.genres = action.payload;
    },
    setFilterSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setVisibleFilter: (state, action) => {
      state.visible = action.payload;
    },
    setCheckedFilters: (state, action) => {
      state.checkedFilters = action.payload;
    },
  },
});

export const {
  setFilterGenres,
  setFilterRating,
  setFilterSortBy,
  setFilterYear,
  setVisibleFilter,
  setCheckedFilters,
} = filtersSlice.actions;

export const filtersReducers = filtersSlice.reducer;
