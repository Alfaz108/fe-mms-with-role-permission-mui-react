import { apiService } from "../../api/apiService";

export const memberService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    memberList: builder.query({
      query: () => ({
        url: `user`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),
  }),
});

export const { useMemberListQuery } = memberService;
