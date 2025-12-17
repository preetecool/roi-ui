import type React from "react";
import { useCallback } from "react";

type UseSwipeToCloseOptions = {
  /** Threshold in pixels to trigger close (default: 32) */
  threshold?: number;
  /** Callback when swipe triggers close */
  onClose: () => void;
};

/**
 * Hook that handles swipe-down-to-close gesture for mobile drawers.
 * Returns a touch start handler to attach to a scrollable viewport element.
 *
 * The gesture works when:
 * 1. User is at the top of the scroll container (scrollTop <= 0)
 * 2. User pulls down past the threshold (e.g., -32px)
 * 3. On release, if threshold is exceeded, triggers close with animation
 */
export function useSwipeToClose({ threshold = 32, onClose }: UseSwipeToCloseOptions) {
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const viewport = event.currentTarget;

      // Only handle gesture when at top of scroll
      if (viewport.scrollTop > 0) return;

      const handleTouchEnd = () => {
        // Check if user pulled down past threshold
        if (viewport.scrollTop >= -threshold) return;

        const scrollPosition = viewport.scrollTop;

        const handleNextScroll = () => {
          if (viewport.scrollTop < scrollPosition) {
            // Animate out and close
            viewport.style.translate = `0px -${scrollPosition}px`;
            viewport.style.transition = "400ms";
            onClose();
          } else if (viewport.scrollTop === scrollPosition) {
            // Wait for next scroll event
            viewport.addEventListener("scroll", handleNextScroll, {
              once: true,
            });
          }
        };

        viewport.addEventListener("scroll", handleNextScroll, { once: true });
      };

      viewport.addEventListener("touchend", handleTouchEnd, { once: true });
    },
    [threshold, onClose]
  );

  return { handleTouchStart };
}
