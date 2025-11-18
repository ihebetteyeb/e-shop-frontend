import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logOut, setToken } from "./state/userSlice";

const accesBaseQuery = fetchBaseQuery({
  baseUrl: "https://e-shop-8kld.onrender.com",
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    console.log(token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: "https://e-shop-8kld.onrender.com",
  credentials: "include",
});

export const baseQuery = async (args, api, extraOptions) => {
  let result = await accesBaseQuery(args, api, extraOptions);
  console.log(result);
  if (result?.error?.status === 403 && api.url !== "/auth/refresh-token") {
    console.log("sending refresh token");
    const refreshResult = await refreshBaseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      api.dispatch(setToken(refreshResult.data.accessToken));
      result = await accesBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};
