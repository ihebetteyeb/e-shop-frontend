import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "@reduxjs/toolkit";
import userSliceReducer from "./state/userSlice";
import userApiSlice from "./state/userApiSlice";
import itemApiSlice from "./state/itemApiSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth state
};

// Combine reducers
const rootReducer = combineReducers({
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [itemApiSlice.reducerPath]: itemApiSlice.reducer,
  auth: userSliceReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat([userApiSlice.middleware, itemApiSlice.middleware]),
});

export const persistor = persistStore(store);
