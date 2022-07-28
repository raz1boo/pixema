import { createSlice } from "@reduxjs/toolkit";

const userTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
const activeTheme = localStorage.getItem("theme") || userTheme;
const initialState = {
  theme: activeTheme,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
