import { apiService } from "../../api/apiService";

export const memberService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    memberList: builder.query({
      query: (url) => ({
        url: `/member${url}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),

    memberDropdown: builder.query({
      query: () => ({
        url: `/member/dropdown`,
        method: "GET",
      }),
      transformResponse: ({ data }) =>
        data?.map((member) => {
          return {
            label: member.name,
            value: member._id,
          };
        }),
    }),
    memberCreate: builder.mutation({
      query: ({ postBody }) => ({
        url: `member`,
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
  useMemberListQuery,
  useMemberCreateMutation,
  useMemberDropdownQuery,
} = memberService;
