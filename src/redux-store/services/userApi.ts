// redux-store/services/userApi.ts
import { baseApi } from "./baseApi";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  userType: "dealer" | "common";
  dealerId?: string;
  dealerInfo?: {
    companyName: string;
    gstNumber: string;
    address: string;
  };
  tokensAvailable: number;
  createdAt: string;
}

interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  dealerInfo?: {
    companyName?: string;
    gstNumber?: string;
    address?: string;
  };
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user profile
    getUserProfile: builder.query<UserProfile, void>({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),

    // Update profile
    updateUserProfile: builder.mutation<UserProfile, UpdateProfileRequest>({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),
      // Optimistic update
      onQueryStarted: async (updates, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userApi.util.updateQueryData("getUserProfile", undefined, (draft) => {
            Object.assign(draft, updates);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["User"],
    }),

    // Delete account
    deleteAccount: builder.mutation<void, void>({
      query: () => ({
        url: "/user/account",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteAccountMutation,
} = userApi;
