import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: {},
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.user = {};
      state.token = null;
      // Clear persisted state
      localStorage.removeItem("persist:root");
    },
    setToken: (state, action) => {
      console.log(action.payload);
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export const { setCredentials, logOut, setToken, setUser } = userSlice.actions;
export default userSlice.reducer;
