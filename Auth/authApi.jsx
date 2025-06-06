import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignup:
      build.mutation <
      any >
      {
        query: (authData) => ({
          url: `/dummy/sign-up`,
          method: "POST",
          body: authData,
        }),
      },
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `/dummy/login`,
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useUserSignupMutation, useUserLoginMutation } = authApi;
