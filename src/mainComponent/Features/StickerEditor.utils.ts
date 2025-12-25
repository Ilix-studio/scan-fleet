// utils/stickerEditor.ts

import { CANVAS_SIZE, ICON_MAP } from "./StickerEditor.contants";
import { EditorElement } from "./StickerEditor.types";

export const generateId = (): string =>
  `el_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const generateReferenceCode = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SF-";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const createShapeElement = (
  type: EditorElement["type"],
  fill: string,
  stroke: string
): EditorElement => {
  const base: EditorElement = {
    id: generateId(),
    type,
    x: CANVAS_SIZE / 2,
    y: CANVAS_SIZE / 2,
    fill,
    stroke,
    strokeWidth: 2,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
  };

  switch (type) {
    case "rect":
      return { ...base, width: 80, height: 60 };
    case "circle":
      return { ...base, radius: 40 };
    case "star":
      return { ...base, numPoints: 5, innerRadius: 20, outerRadius: 40 };
    case "triangle":
      return { ...base, radius: 40 };
    case "arrow":
      return { ...base, points: [0, 0, 60, 0] };
    default:
      return base;
  }
};

export const createTextElement = (
  text: string,
  fill: string,
  fontSize: number,
  fontFamily: string
): EditorElement => ({
  id: generateId(),
  type: "text",
  x: CANVAS_SIZE / 2,
  y: CANVAS_SIZE / 2,
  fill,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  text,
  fontSize,
  fontFamily,
});

export const createIconElement = (
  iconType: string,
  fill: string
): EditorElement => ({
  id: generateId(),
  type: "text",
  x: CANVAS_SIZE / 2,
  y: CANVAS_SIZE / 2,
  fill,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  text: ICON_MAP[iconType] || "●",
  fontSize: 48,
  fontFamily: "Arial",
  iconType,
});

export const createBorderElement = (
  style: "solid" | "dashed" | "rounded" | "double",
  stroke: string
): EditorElement => ({
  id: generateId(),
  type: "rect",
  x: CANVAS_SIZE / 2,
  y: CANVAS_SIZE / 2,
  width: CANVAS_SIZE - 40,
  height: CANVAS_SIZE - 40,
  fill: "transparent",
  stroke,
  strokeWidth: style === "double" ? 6 : 3,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  borderStyle: style === "rounded" ? "solid" : style,
});

export const createImageElement = (
  img: HTMLImageElement,
  imageSrc: string
): EditorElement => {
  const aspectRatio = img.width / img.height;
  const maxSize = 150;
  const width = aspectRatio > 1 ? maxSize : maxSize * aspectRatio;
  const height = aspectRatio > 1 ? maxSize / aspectRatio : maxSize;

  return {
    id: generateId(),
    type: "image",
    x: CANVAS_SIZE / 2,
    y: CANVAS_SIZE / 2,
    width,
    height,
    fill: "transparent",
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    imageSrc,
    imageElement: img,
  };
};

export const serializeElements = (elements: EditorElement[]) =>
  elements.map((el) => ({ ...el, imageElement: undefined }));
