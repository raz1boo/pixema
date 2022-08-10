import { createSlice } from "@reduxjs/toolkit";

const defaultUser = {
  isAuth: false,
  currentUser: { email: "", name: "" },
};

const initialState = JSON.parse(
  localStorage.getItem("user") || JSON.stringify(defaultUser)
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.currentUser = { email: "", name: "" };
      state.isAuth = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
