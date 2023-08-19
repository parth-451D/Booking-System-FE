import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import seatReducer from "./reducers/seatReducer";
import currentBookingReducer from "./reducers/currentBookingReducer";

const persistConfig = {
  key: "root",
  storage,
};

const allReducers = combineReducers({
  user: userReducer,
  seat: seatReducer,
  currentBooking: currentBookingReducer
});

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
