import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_URL } from "../constants/api";
import {
  IActivate,
  IAuth,
  ICreateToken,
  IPatchUserName,
  IResetPassword,
  IPatchPassword,
  ISignUp,
  IToken,
} from "../types/IQuery";

export const authRequests = createApi({
  reducerPath: "authRequests",
  baseQuery: fetchBaseQuery({ baseUrl: AUTH_URL }),
  endpoints: (build) => ({
    createToken: build.mutation<IToken, ICreateToken>({
      query: ({ email, password }) => ({
        url: "/jwt/create/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }),
    }),
    refreshToken: build.mutation<IToken, string | string[] | undefined>({
      query: (refreshToken) => ({
        url: "/jwt/refresh/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }),
    }),
    getUserInfo: build.mutation<IAuth, string | string[] | undefined>({
      query: (token) => ({
        url: "/users/me/",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    patchUserName: build.mutation<IAuth, IPatchUserName>({
      query: ({ username, id, token }) => ({
        url: `/users/${id}/`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          username: username,
        }),
      }),
    }),
    patchPassword: build.mutation<IAuth, IPatchPassword>({
      query: ({ token, new_password, current_password }) => ({
        url: "/users/set_password/",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          current_password: current_password,
          new_password: new_password,
        }),
      }),
    }),
    activateEmail: build.mutation<IActivate, IActivate>({
      query: ({ uid, token }) => ({
        url: "/users/activation/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          uid: uid,
          token: token,
        }),
      }),
    }),
    resendActivateEmail: build.mutation<string, string>({
      query: (email) => ({
        url: "/users/resend_activation/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
      }),
    }),
    resetPassword: build.mutation<string, string>({
      query: (email) => ({
        url: "/users/reset_password/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
      }),
    }),
    resetPasswordConfirm: build.mutation<IResetPassword, IResetPassword>({
      query: ({ uid, token, password }) => ({
        url: "/users/reset_password_confirm/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          uid: uid,
          token: token,
          new_password: password,
        }),
      }),
    }),
    postSignUp: build.mutation<IAuth, ISignUp>({
      query: ({ username, email, password }) => ({
        url: "/users/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }),
    }),
  }),
});

export const {
  useGetUserInfoMutation,
  useRefreshTokenMutation,
  useCreateTokenMutation,
  usePostSignUpMutation,
  usePatchUserNameMutation,
  usePatchPasswordMutation,
  useActivateEmailMutation,
  useResendActivateEmailMutation,
  useResetPasswordConfirmMutation,
  useResetPasswordMutation,
} = authRequests;

export const {
  getUserInfo,
  refreshToken,
  createToken,
  postSignUp,
  patchUserName,
  patchPassword,
  activateEmail,
  resendActivateEmail,
  resetPassword,
  resetPasswordConfirm,
} = authRequests.endpoints;
