import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../config";

const getBearerToken = () => {
  return localStorage.getItem("token");
};

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
    const token = getBearerToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiService = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
