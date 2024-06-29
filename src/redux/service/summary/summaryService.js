import { apiService } from "../../api/apiService";

export const summaryService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    summaryList: builder.query({
      query: (url) => ({
        url: `/summary${url}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),
  }),
});

export const { useSummaryListQuery } = summaryService;
