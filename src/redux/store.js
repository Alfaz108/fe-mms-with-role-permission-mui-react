import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./api/apiService";
import authReducer from "./features/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
