// redux-store/slices/editorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EditorElement {
  id: string;
  type: "shape" | "text" | "icon" | "image" | "border";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  shapeType?: "rectangle" | "circle" | "star" | "triangle" | "arrow";
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  borderStyle?: "solid" | "dashed" | "rounded" | "double";
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  iconName?: string;
  imageUrl?: string;
  zIndex: number;
}

// Export the EditorState interface as well
export interface EditorState {
  elements: EditorElement[];
  selectedElementId: string | null;
  canvasSize: { width: number; height: number };
  currentTemplate: string | null;
  language: string;
  isDirty: boolean;
}

const initialState: EditorState = {
  elements: [],
  selectedElementId: null,
  canvasSize: { width: 400, height: 400 }, // Editor size, exports at 2x
  currentTemplate: null,
  language: "en",
  isDirty: false,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    // Add new element with auto-incrementing zIndex
    addElement: (
      state,
      action: PayloadAction<Omit<EditorElement, "id" | "zIndex">>
    ) => {
      const maxZ = state.elements.reduce(
        (max, el) => Math.max(max, el.zIndex),
        0
      );
      const newElement: EditorElement = {
        ...action.payload,
        id: `el_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        zIndex: maxZ + 1,
      };
      state.elements.push(newElement);
      state.selectedElementId = newElement.id;
      state.isDirty = true;
    },

    // Update element properties (position, size, style, etc)
    updateElement: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<EditorElement> }>
    ) => {
      const element = state.elements.find((el) => el.id === action.payload.id);
      if (element) {
        Object.assign(element, action.payload.updates);
        state.isDirty = true;
      }
    },

    // Remove element
    deleteElement: (state, action: PayloadAction<string>) => {
      state.elements = state.elements.filter((el) => el.id !== action.payload);
      if (state.selectedElementId === action.payload) {
        state.selectedElementId = null;
      }
      state.isDirty = true;
    },

    // Selection management
    selectElement: (state, action: PayloadAction<string | null>) => {
      state.selectedElementId = action.payload;
    },

    // Layer operations
    bringToFront: (state, action: PayloadAction<string>) => {
      const element = state.elements.find((el) => el.id === action.payload);
      if (element) {
        const maxZ = Math.max(...state.elements.map((el) => el.zIndex));
        element.zIndex = maxZ + 1;
        state.isDirty = true;
      }
    },

    sendToBack: (state, action: PayloadAction<string>) => {
      const element = state.elements.find((el) => el.id === action.payload);
      if (element) {
        const minZ = Math.min(...state.elements.map((el) => el.zIndex));
        element.zIndex = minZ - 1;
        state.isDirty = true;
      }
    },

    // Load template or saved design
    loadDesign: (
      state,
      action: PayloadAction<{ elements: EditorElement[]; template?: string }>
    ) => {
      state.elements = action.payload.elements;
      state.currentTemplate = action.payload.template || null;
      state.selectedElementId = null;
      state.isDirty = false;
    },

    // Clear canvas
    clearCanvas: (state) => {
      state.elements = [];
      state.selectedElementId = null;
      state.currentTemplate = null;
      state.isDirty = false;
    },

    // Language change
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },

    // Mark as saved
    markAsSaved: (state) => {
      state.isDirty = false;
    },
  },
});

export const {
  addElement,
  updateElement,
  deleteElement,
  selectElement,
  bringToFront,
  sendToBack,
  loadDesign,
  clearCanvas,
  setLanguage,
  markAsSaved,
} = editorSlice.actions;

export default editorSlice.reducer;

// Selectors
export const selectAllElements = (state: { editor: EditorState }) =>
  [...state.editor.elements].sort((a, b) => a.zIndex - b.zIndex);
export const selectSelectedElement = (state: { editor: EditorState }) =>
  state.editor.elements.find((el) => el.id === state.editor.selectedElementId);
export const selectHasUnsavedChanges = (state: { editor: EditorState }) =>
  state.editor.isDirty;
