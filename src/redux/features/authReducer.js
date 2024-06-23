import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || undefined,
  },
  reducers: {
    userLogin: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    userLogout: (state) => {
      state.currentUser = undefined;
      localStorage.removeItem("currentUser");
    },
    hydrateUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { userLogin, userLogout, hydrateUser } = authReducer.actions;

export default authReducer.reducer;
