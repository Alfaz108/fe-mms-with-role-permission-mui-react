import { apiService } from "../../api/apiService";

export const adminMemberService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    adminMemberList: builder.query({
      query: () => ({
        url: `user`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),
  }),
});

export const { useAdminMemberListQuery } = adminMemberService;
