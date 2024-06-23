import { apiService } from "../../api/apiService";

export const userService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    userList: builder.query({
      query: () => ({
        url: `user`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),
  }),
});

export const { useUserListQuery } = userService;
