import { apiService } from "../../api/apiService";

export const mealService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    mealList: builder.query({
      query: (url) => ({
        url: `/meal${url}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),

    activeMealList: builder.query({
      query: () => ({
        url: `/meal/active`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),

    mealCreate: builder.mutation({
      query: ({ postBody }) => ({
        url: `/meal`,
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

export const {
  useMealListQuery,
  useMealCreateMutation,
  useActiveMealListQuery,
} = mealService;
