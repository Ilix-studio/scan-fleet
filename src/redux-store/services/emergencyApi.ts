// redux-store/services/emergencyApi.ts
import { baseApi } from "./baseApi";

interface EmergencyCallRequest {
  stickerId: string;
  serviceType: "police" | "ambulance" | "private-ambulance" | "towing";
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

interface EmergencyCallResponse {
  callId: string;
  status: "initiated" | "connected" | "failed";
  serviceNumber?: string;
  estimatedArrival?: string;
}

interface ShareLocationRequest {
  stickerId: string;
  contacts: string[]; // Phone numbers
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  message?: string;
}

export const emergencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Initiate emergency call via Twilio
    initiateEmergencyCall: builder.mutation<
      EmergencyCallResponse,
      EmergencyCallRequest
    >({
      query: (data) => ({
        url: "/emergency/call",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Analytics"],
    }),

    // Share location via WhatsApp
    shareLocation: builder.mutation<
      { success: boolean; messageIds: string[] },
      ShareLocationRequest
    >({
      query: (data) => ({
        url: "/emergency/share-location",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Analytics"],
    }),

    // Get emergency call status
    getCallStatus: builder.query<EmergencyCallResponse, string>({
      query: (callId) => `/emergency/call/${callId}/status`,
    }),
  }),
});

export const {
  useInitiateEmergencyCallMutation,
  useShareLocationMutation,
  useGetCallStatusQuery,
} = emergencyApi;
