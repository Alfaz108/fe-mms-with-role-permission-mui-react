import { apiService } from "../../api/apiService";

export const memberDashboardService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    memberDashboardData: builder.query({
      query: ({ id }) => ({
        url: `/summary/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),
  }),
});

export const { useMemberDashboardDataQuery } = memberDashboardService;
