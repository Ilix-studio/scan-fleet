// services/stickerApi.ts

import { EditorElement } from "@/mainComponent/Features/StickerEditor.types";
import {
  generateReferenceCode,
  serializeElements,
} from "@/mainComponent/Features/StickerEditor.utils";

interface SaveStickerResponse {
  success: boolean;
  referenceCode: string;
  expiresAt: string;
}

interface GetStickerResponse {
  success: boolean;
  referenceCode: string;
  imageData: string;
  elements: EditorElement[];
  status: "UNUSED" | "USED";
  createdAt: string;
  expiresAt: string;
}

export const saveSticker = async (
  imageData: string,
  elements: EditorElement[]
): Promise<SaveStickerResponse> => {
  try {
    const response = await fetch("/api/stickers/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageData,
        elements: serializeElements(elements),
      }),
    });

    if (!response.ok) {
      throw new Error("Save failed");
    }

    return response.json();
  } catch (error) {
    // Fallback for demo/development
    console.warn("API unavailable, generating local reference code");
    return {
      success: true,
      referenceCode: generateReferenceCode(),
      expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }
};

export const getSticker = async (code: string): Promise<GetStickerResponse> => {
  const response = await fetch(`/api/stickers/${code}`);

  if (!response.ok) {
    throw new Error("Sticker not found or expired");
  }

  return response.json();
};

export const useSticker = async (
  referenceCode: string,
  tokenId: string
): Promise<{ success: boolean }> => {
  const response = await fetch("/api/stickers/use", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ referenceCode, tokenId }),
  });

  if (!response.ok) {
    throw new Error("Failed to mark sticker as used");
  }

  return response.json();
};
