// redux-store/slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// This interface can remain internal since it's only used within UIState
interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

// The export keyword must be on the same line as the interface declaration
export interface UIState {
  sidebarOpen: boolean;
  currentModal: string | null;
  notifications: Notification[];
  globalLoading: boolean;
}

const initialState: UIState = {
  sidebarOpen: false,
  currentModal: null,
  notifications: [],
  globalLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    openModal: (state, action: PayloadAction<string>) => {
      state.currentModal = action.payload;
    },

    closeModal: (state) => {
      state.currentModal = null;
    },

    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id">>
    ) => {
      const notification: Notification = {
        ...action.payload,
        id: `notif_${Date.now()}`,
      };
      state.notifications.push(notification);
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },

    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
