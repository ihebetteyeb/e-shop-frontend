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
      state.token = action.payload;
      // state.user = action.payload.user;
    },
    logOut: (state) => {
      state.user = {};
      state.token = null;
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

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;

export const { setCredentials, logOut, setToken, setUser } = userSlice.actions;
export default userSlice.reducer;
