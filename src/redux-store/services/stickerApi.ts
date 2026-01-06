// redux-store/services/stickerApi.ts
import { baseApi } from "./baseApi";
import type { EditorElement } from "../slices/editorSlice";

interface SaveStickerRequest {
  elements: EditorElement[];
  imageData: string;
  language: string;
  template?: string;
}

interface SaveStickerResponse {
  referenceCode: string;
  expiresAt: string;
  stickerDesignId: string;
}

interface RetrieveStickerResponse {
  referenceCode: string;
  elements: EditorElement[];
  imageData: string;
  language: string;
  template?: string;
  status: "active" | "expired" | "used";
  createdAt: string;
  expiresAt: string;
}

interface UseStickerRequest {
  referenceCode: string;
  tokenId: string;
}

interface UseStickerResponse {
  success: boolean;
  stickerId: string;
  qrCode: string;
  trackingNumber?: string;
}

export const stickerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Save design and get reference code
    saveSticker: builder.mutation<SaveStickerResponse, SaveStickerRequest>({
      query: (design) => ({
        url: "/stickers/save",
        method: "POST",
        body: design,
      }),
      invalidatesTags: ["Sticker"],
    }),

    // Retrieve design by reference code
    retrieveSticker: builder.query<RetrieveStickerResponse, string>({
      query: (referenceCode) => `/stickers/${referenceCode}`,
      providesTags: (_result, _error, referenceCode) => [
        { type: "Sticker", id: referenceCode },
      ],
    }),

    // Convert reference code to active sticker using token
    useSticker: builder.mutation<UseStickerResponse, UseStickerRequest>({
      query: (data) => ({
        url: "/stickers/use",
        method: "POST",
        body: data,
      }),
      // Optimistically update token count
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // Invalidate user data to refetch updated token balance
          dispatch(baseApi.util.invalidateTags(["User", "Token"]));
        } catch (err) {
          // Rollback happens automatically with RTK Query
        }
      },
      invalidatesTags: ["Sticker", "Token", "User"],
    }),

    // Get user's active stickers
    getUserStickers: builder.query<RetrieveStickerResponse[], void>({
      query: () => "/stickers/my-stickers",
      providesTags: (_result) =>
        _result
          ? [
              ..._result.map(({ referenceCode }) => ({
                type: "Sticker" as const,
                id: referenceCode,
              })),
              { type: "Sticker", id: "LIST" },
            ]
          : [{ type: "Sticker", id: "LIST" }],
    }),

    // Delete unused sticker design
    deleteSticker: builder.mutation<void, string>({
      query: (referenceCode) => ({
        url: `/stickers/${referenceCode}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, referenceCode) => [
        { type: "Sticker", id: referenceCode },
        { type: "Sticker", id: "LIST" },
      ],
    }),
  }),
});

// Export the auto-generated hooks for use in components
export const {
  useSaveStickerMutation,
  useRetrieveStickerQuery,
  useLazyRetrieveStickerQuery,
  useUseStickerMutation,
  useGetUserStickersQuery,
  useDeleteStickerMutation,
} = stickerApi;
