import { apiService } from "../../api/apiService";

export const dashboardService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    dashboardData: builder.query({
      query: () => ({
        url: `/dash-board`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),
    adminDashboardData: builder.query({
      query: () => ({
        url: `/dash-board/admin`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),
  }),
});

export const { useDashboardDataQuery, useAdminDashboardDataQuery } =
  dashboardService;
