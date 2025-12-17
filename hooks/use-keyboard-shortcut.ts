import { useEffect } from "react";

type KeyboardShortcutHandler = () => void;

type KeyboardShortcutOptions = {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
};

/**
 * Custom hook for handling keyboard shortcuts
 * Automatically cleans up event listener on unmount
 */
export const useKeyboardShortcut = (options: KeyboardShortcutOptions, handler: KeyboardShortcutHandler): void => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const metaOrCtrlPressed = options.metaKey || options.ctrlKey;
      const modifierMatch = metaOrCtrlPressed ? e.metaKey || e.ctrlKey : true;

      const shiftMatch = options.shiftKey ? e.shiftKey : !e.shiftKey;
      const altMatch = options.altKey ? e.altKey : !e.altKey;

      if (e.key === options.key && modifierMatch && shiftMatch && altMatch) {
        e.preventDefault();
        handler();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [options.key, options.metaKey, options.ctrlKey, options.shiftKey, options.altKey, handler]);
};
