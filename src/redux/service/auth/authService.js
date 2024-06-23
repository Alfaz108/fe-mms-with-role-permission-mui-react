import { apiService } from "../../api/apiService";
import { userLogin } from "../../features/authReducer";

export const authService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (postBody) => ({
        url: "auth/signup",
        method: "POST",
        body: postBody,
      }),
    }),

    login: builder.mutation({
      query: (postBody) => ({
        url: "/auth/login",
        method: "POST",
        body: postBody,
      }),
      onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        queryFulfilled
          .then(({ data: { data } }) => {
            console.log(data);
            dispatch(userLogin(data.user));
          })
          .catch(() => {});
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authService;
