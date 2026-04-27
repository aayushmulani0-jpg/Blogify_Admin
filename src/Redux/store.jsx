
// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./reducer.user.jsx";
import storage from "redux-persist/es/storage"; 

const persistConfig = {
  key: "auth",
  storage,
};

const persistedReducerUser = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducerUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);