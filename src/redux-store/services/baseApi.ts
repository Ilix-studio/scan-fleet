// redux-store/services/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryApi } from "@reduxjs/toolkit/query";

// Import the action creators directly - this doesn't create circular dependency
import { logout, refreshAccessToken } from "../slices/authSlice";

// Define a minimal auth state interface for what we need to access
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

// Define what our state looks like for the purpose of this query
interface StateWithAuth {
  auth: AuthState;
}

// Base query with auth token injection
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    // Cast getState to our minimal interface instead of full RootState
    const state = getState() as StateWithAuth;
    const token = state.auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Type the parameters properly to avoid 'any'
const baseQueryWithReauth = async (
  args: Parameters<typeof baseQuery>[0],
  api: BaseQueryApi,
  extraOptions: Parameters<typeof baseQuery>[2]
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Cast to our minimal state interface
    const state = api.getState() as StateWithAuth;
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Type assertion needed here since we know the shape of the refresh response
        const responseData = refreshResult.data as { accessToken: string };
        api.dispatch(refreshAccessToken(responseData.accessToken));

        // Retry the original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, logout user
        api.dispatch(logout());
      }
    } else {
      // No refresh token available, logout immediately
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "scanfleet-api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Token", "Sticker", "Purchase", "Analytics", "ApiAccount"],
  endpoints: () => ({}),
});
