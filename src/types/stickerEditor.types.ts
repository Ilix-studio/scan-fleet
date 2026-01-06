// StickerEditor.types.ts
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
  // Additional properties that might be used by the editor
  scaleX?: number;
  scaleY?: number;
  radius?: number;
  points?: number[];
  innerRadius?: number;
  outerRadius?: number;
  numPoints?: number;
}
