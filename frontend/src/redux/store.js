import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    users: usersReducer,
  },
});

export default store;
