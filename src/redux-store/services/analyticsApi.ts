// redux-store/services/analyticsApi.ts
import { baseApi } from "./baseApi";

interface AnalyticsSummary {
  tokenBalance: number;
  activeStickers: number;
  totalEmergencyCalls: number;
  emergencyCallBreakdown: {
    police: number;
    ambulance: number;
    privateAmbulance: number;
    towing: number;
  };
  gpsSharesCount: number;
  dealerCallsCount: number;
  peakUsageHours: { hour: number; count: number }[];
  monthlyGrowth: {
    month: string;
    stickersActivated: number;
    emergencyCalls: number;
  }[];
}

interface RecentActivity {
  id: string;
  timestamp: string;
  stickerId: string;
  actionType: "emergency_call" | "gps_share" | "dealer_call";
  details: {
    serviceType?: string;
    duration?: number;
    location?: { latitude: number; longitude: number };
    status: string;
  };
}

interface ExportDataRequest {
  startDate: string;
  endDate: string;
  format: "csv" | "xlsx";
}

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard summary
    getDashboardAnalytics: builder.query<AnalyticsSummary, void>({
      query: () => "/analytics/dashboard",
      providesTags: ["Analytics"],
    }),

    // Recent activity feed
    getRecentActivity: builder.query<
      RecentActivity[],
      { limit?: number; offset?: number }
    >({
      query: ({ limit = 20, offset = 0 }) =>
        `/analytics/recent-activity?limit=${limit}&offset=${offset}`,
      providesTags: ["Analytics"],
    }),

    // Export data for reporting
    exportAnalytics: builder.mutation<
      { downloadUrl: string },
      ExportDataRequest
    >({
      query: (data) => ({
        url: "/analytics/export",
        method: "POST",
        body: data,
      }),
    }),

    // Custom date range analytics
    getAnalyticsByDateRange: builder.query<
      AnalyticsSummary,
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) =>
        `/analytics/range?start=${startDate}&end=${endDate}`,
    }),
  }),
});

export const {
  useGetDashboardAnalyticsQuery,
  useGetRecentActivityQuery,
  useExportAnalyticsMutation,
  useGetAnalyticsByDateRangeQuery,
} = analyticsApi;
