// hooks/useKeyboardShortcuts.ts

import { useEffect } from "react";

interface ShortcutHandlers {
  onUndo: () => void;
  onRedo: () => void;
  onDelete: () => void;
  selectedId: string | null;
}

export const useKeyboardShortcuts = ({
  onUndo,
  onRedo,
  onDelete,
  selectedId,
}: ShortcutHandlers) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputFocused =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA";

      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        onUndo();
        return;
      }

      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        onRedo();
        return;
      }

      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedId &&
        !isInputFocused
      ) {
        e.preventDefault();
        onDelete();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUndo, onRedo, onDelete, selectedId]);
};
