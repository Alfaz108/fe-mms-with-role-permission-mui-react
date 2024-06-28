import { apiService } from "../../api/apiService";

export const depositService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    depositList: builder.query({
      query: (url) => ({
        url: `/deposit${url}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),

    depositCreate: builder.mutation({
      query: ({ postBody }) => ({
        url: `/deposit`,
        method: "POST",
        body: postBody,
      }),
      onQueryStarted({ postBody }, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: { data, message } }) => {
            // dispatch(
            //   apiService.util.updateQueryData(
            //     "userList",
            //     undefined,
            //     (draft) => {
            //       draft.data.unshift(data);
            //       return draft;
            //     }
            //   )
            // );
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
  }),
});

export const { useDepositListQuery, useDepositCreateMutation } = depositService;
