import { useCallback, useEffect, useRef, useState } from "react";
import { ANIMATION } from "../search.config";

type UseSearchDialogReturn = {
  isOpen: boolean;
  isClosing: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  open: () => void;
  close: () => void;
};

/**
 * Custom hook for managing search dialog state with animations
 * Handles opening, closing with animation delay, and input focus
 */
export const useSearchDialog = (): UseSearchDialogReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, ANIMATION.CLOSE_DELAY);
  }, []);

  // Auto-focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, ANIMATION.FOCUS_DELAY);
    }
  }, [isOpen]);

  return {
    isOpen,
    isClosing,
    inputRef,
    open,
    close,
  };
};
