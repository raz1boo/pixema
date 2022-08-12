import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  currentUser: { email: "", id: 0, username: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.currentUser = { email: "", id: 0, username: "" };
      state.isAuth = false;
    },
  },
});

export const { setUser, logout} = authSlice.actions;

export const authReducer = authSlice.reducer;
