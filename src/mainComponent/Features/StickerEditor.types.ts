// types/stickerEditor.ts

export interface EditorElement {
  id: string;
  type: "rect" | "circle" | "star" | "triangle" | "arrow" | "text" | "image";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  iconType?: string;
  points?: number[];
  innerRadius?: number;
  outerRadius?: number;
  numPoints?: number;
  borderStyle?: "solid" | "dashed" | "dotted" | "double";
  imageSrc?: string;
  imageElement?: HTMLImageElement;
}

export interface HistoryState {
  elements: EditorElement[];
  selectedId: string | null;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  sampleTexts: string[];
}

export interface DefaultTemplate {
  id: string;
  name: string;
  emoji: string;
  elements: Partial<EditorElement>[];
}

export interface StickerData {
  imageData: string;
  referenceCode: string | null;
  elements: Omit<EditorElement, "imageElement">[];
}
