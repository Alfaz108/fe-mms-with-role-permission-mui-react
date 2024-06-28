import { apiService } from "../../api/apiService";

export const marketService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    marketList: builder.query({
      query: (url) => ({
        url: `/market${url}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),

    marketCreate: builder.mutation({
      query: ({ postBody }) => ({
        url: `/market`,
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

export const { useMarketCreateMutation, useMarketListQuery } = marketService;
