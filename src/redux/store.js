import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./api/apiService";
import authReducer from "./features/authReducer";
import paginationReducer from "./features/paginationReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pagination: paginationReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
