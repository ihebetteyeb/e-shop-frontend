import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./state/userSlice";
import userApiSlice from "./state/userApiSlice";
import itemApiSlice from "./state/itemApiSlice";

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [itemApiSlice.reducerPath]: itemApiSlice.reducer,
    auth: userSliceReducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat([
      userApiSlice.middleware,
      itemApiSlice.middleware,
    ]),
});
