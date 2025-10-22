"use client";

import { useControlled } from "@base-ui-components/utils/useControlled";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import styles from "./carousel.module.css";

type CarouselContextValue = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  totalItems: number;
  gap: number;
  variant: "default" | "inset";
  goToIndex: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  viewportRef: React.RefObject<HTMLDivElement | null>;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used within Carousel.Root");
  }
  return context;
}

export type CarouselRootProps = React.ComponentProps<"div"> & {
  /** Total number of items in the carousel. */
  totalItems: number;
  /** Gap between items in pixels. @default 16 */
  gap?: number;
  /** Controlled index value. */
  index?: number;
  /** Default index for uncontrolled mode. @default 0 */
  defaultIndex?: number;
  /** Callback when index changes. */
  onIndexChange?: (index: number) => void;
  /** Align carousel content. @default "start" */
  align?: "start" | "center";
  /** Carousel variant. @default "default" */
  variant?: "default" | "inset";
};

/** Root component. Manages state and provides context. */
export function Root({
  children,
  totalItems,
  gap = 16,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  align = "start",
  variant = "default",
  className,
  ...props
}: CarouselRootProps) {
  const [currentIndex, setCurrentIndexInternal] = useControlled({
    controlled: indexProp,
    default: defaultIndex,
    name: "Carousel",
    state: "index",
  });

  const viewportRef = useRef<HTMLDivElement>(null);
  const bleedRefFromContext = useBleedRef();
  const [insetPaddingLeft, setInsetPaddingLeft] = useState(0);
  const [insetPaddingRight, setInsetPaddingRight] = useState(0);

  const maxIndex = totalItems - 1;
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const setCurrentIndex = useCallback(
    (index: number) => {
      setCurrentIndexInternal(index);
      onIndexChange?.(index);
    },
    [setCurrentIndexInternal, onIndexChange]
  );

  const goToIndex = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      const slides = viewport.querySelectorAll('[role="group"]');
      const targetSlide = slides[index] as HTMLElement;

      if (targetSlide) {
        let targetScroll = targetSlide.offsetLeft;

        // For inset variant, adjust scroll position to account for left padding
        if (variant === "inset" && bleedRefFromContext?.current) {
          const parent = bleedRefFromContext.current.parentElement;
          if (parent) {
            const parentRect = parent.getBoundingClientRect();
            const leftPadding = parentRect.left;
            targetScroll = targetSlide.offsetLeft - leftPadding;
          }
        }

        viewport.scrollTo({ left: targetScroll, behavior: "smooth" });
      }

      setCurrentIndex(index);
    },
    [setCurrentIndex, variant, bleedRefFromContext]
  );

  const getVisibleItemsCount = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return 1;
    }

    const slides = viewport.querySelectorAll('[role="group"]');
    if (slides.length === 0) {
      return 1;
    }

    const viewportRect = viewport.getBoundingClientRect();
    let visibleCount = 0;
    const VISIBILITY_THRESHOLD = 0.5;

    for (const slide of slides) {
      const slideRect = slide.getBoundingClientRect();
      // Check if slide is at least 50% visible in viewport
      const visibleWidth =
        Math.min(slideRect.right, viewportRect.right) -
        Math.max(slideRect.left, viewportRect.left);
      const slideWidth = slideRect.width;

      if (visibleWidth / slideWidth >= VISIBILITY_THRESHOLD) {
        visibleCount++;
      }
    }

    return Math.max(1, visibleCount);
  }, []);

  const nextSlide = useCallback(() => {
    const visibleItems = getVisibleItemsCount();
    const newIndex = Math.min(currentIndex + visibleItems, maxIndex);
    goToIndex(newIndex);
  }, [currentIndex, maxIndex, goToIndex, getVisibleItemsCount]);

  const prevSlide = useCallback(() => {
    const visibleItems = getVisibleItemsCount();
    const newIndex = Math.max(currentIndex - visibleItems, 0);
    goToIndex(newIndex);
  }, [currentIndex, goToIndex, getVisibleItemsCount]);

  const value: CarouselContextValue = {
    currentIndex,
    setCurrentIndex,
    totalItems,
    gap,
    variant,
    goToIndex,
    nextSlide,
    prevSlide,
    canGoNext,
    canGoPrev,
    viewportRef,
  };

  // Calculate inset padding based on parent container
  useEffect(() => {
    if (
      variant !== "inset" ||
      !bleedRefFromContext?.current ||
      !viewportRef.current
    ) {
      return;
    }

    const calculatePadding = () => {
      const bleed = bleedRefFromContext.current;
      const viewport = viewportRef.current;
      if (!(bleed && viewport)) {
        return;
      }

      const parent = bleed.parentElement;
      if (!parent) {
        return;
      }

      const parentRect = parent.getBoundingClientRect();
      const viewportRect = viewport.getBoundingClientRect();

      // Get parent's computed padding to account for container padding
      const parentStyles = window.getComputedStyle(parent);
      const parentPaddingLeft = Number.parseFloat(parentStyles.paddingLeft);
      const parentPaddingRight = Number.parseFloat(parentStyles.paddingRight);

      // Calculate the padding needed to align cards with parent's content area (inside padding)
      // Left padding: distance from viewport's left edge to parent's content left edge, minus gap
      const leftPadding = Math.max(
        0,
        parentRect.left + parentPaddingLeft - viewportRect.left - gap
      );

      // Right padding: distance from parent's content right edge to viewport's right edge
      const rightPadding = Math.max(
        0,
        viewportRect.right - (parentRect.right - parentPaddingRight)
      );

      setInsetPaddingLeft(leftPadding);
      setInsetPaddingRight(rightPadding);
    };

    calculatePadding();

    window.addEventListener("resize", calculatePadding);
    return () => window.removeEventListener("resize", calculatePadding);
  }, [variant, bleedRefFromContext, gap]);

  return (
    <CarouselContext.Provider value={value}>
      <div
        className={cn(
          styles.carousel,
          align === "center" && styles.carouselCenter,
          className
        )}
        data-slot="carousel"
        style={
          {
            "--calculated-inset-padding-left": `${insetPaddingLeft}px`,
            "--calculated-inset-padding-right": `${insetPaddingRight}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
        <div aria-atomic="true" aria-live="polite" className={styles.srOnly}>
          Item {currentIndex + 1} of {totalItems}
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export type CarouselBleedProps = React.ComponentProps<"div">;

const BleedRefContext =
  createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export function useBleedRef() {
  return useContext(BleedRefContext);
}

/** Bleed wrapper. Extends carousel to full viewport width. */
export function Bleed({ className, children, ...props }: CarouselBleedProps) {
  const bleedRef = useRef<HTMLDivElement | null>(null);

  return (
    <BleedRefContext.Provider value={bleedRef}>
      <div className={cn(styles.bleed, className)} ref={bleedRef} {...props}>
        {children}
      </div>
    </BleedRefContext.Provider>
  );
}

export type CarouselViewportProps = React.ComponentProps<"div">;

/** Scrollable viewport. */
export function Viewport({
  className,
  children,
  ...props
}: CarouselViewportProps) {
  const { viewportRef } = useCarousel();

  return (
    <div
      aria-atomic="false"
      aria-live="polite"
      className={cn(styles.viewport, className)}
      ref={viewportRef}
      {...props}
    >
      {children}
    </div>
  );
}

export type CarouselContentProps = React.ComponentProps<"div">;

/** Content wrapper. Flex container for horizontal layout. */
export function Content({
  className,
  children,
  ...props
}: CarouselContentProps) {
  const { gap, variant } = useCarousel();

  return (
    <div
      className={cn(styles.container, className)}
      style={
        {
          gap: `${gap}px`,
          "--inset-padding-left":
            variant === "inset"
              ? "var(--calculated-inset-padding-left, max(var(--min-edge), var(--min-padding)))"
              : undefined,
          "--inset-padding-right":
            variant === "inset"
              ? "var(--calculated-inset-padding-right, max(var(--min-edge), var(--min-padding)))"
              : undefined,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}

export type CarouselItemProps = React.ComponentProps<"div"> & {
  /** Item index (required). */
  index: number;
};

/** Individual carousel slide. */
export function Item({
  index,
  className,
  children,
  ...props
}: CarouselItemProps) {
  const { totalItems, goToIndex, nextSlide, prevSlide, canGoNext, canGoPrev } =
    useCarousel();

  const isVisible = true;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          if (canGoPrev) {
            e.preventDefault();
            prevSlide();
          }
          break;
        case "ArrowRight":
          if (canGoNext) {
            e.preventDefault();
            nextSlide();
          }
          break;
        case "Home":
          e.preventDefault();
          goToIndex(0);
          break;
        case "End":
          e.preventDefault();
          goToIndex(totalItems - 1);
          break;
        default:
          // No action for other keys
          break;
      }
    },
    [canGoPrev, canGoNext, prevSlide, nextSlide, goToIndex, totalItems]
  );

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Keyboard navigation is required for carousel accessibility
    <div
      aria-label={`${index + 1} of ${totalItems}`}
      aria-roledescription="slide"
      className={cn(styles.slide, className)}
      onKeyDown={handleKeyDown}
      role="group"
      tabIndex={isVisible ? 0 : -1}
      {...props}
    >
      {children}
    </div>
  );
}

export type CarouselPreviousProps = React.ComponentProps<"button">;

/** Previous button. Auto-disabled at start. */
export function Previous({
  className,
  children,
  ...props
}: CarouselPreviousProps) {
  const { prevSlide, canGoPrev } = useCarousel();

  return (
    <button
      aria-controls="carousel-slides"
      aria-label="Scroll to previous items"
      className={cn(styles.navButton, className)}
      disabled={!canGoPrev}
      onClick={prevSlide}
      type="button"
      {...props}
    >
      {children || (
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      )}
    </button>
  );
}

export type CarouselNextProps = React.ComponentProps<"button">;

/** Next button. Auto-disabled at end. */
export function Next({ className, children, ...props }: CarouselNextProps) {
  const { nextSlide, canGoNext } = useCarousel();

  return (
    <button
      aria-controls="carousel-slides"
      aria-label="Scroll to next items"
      className={cn(styles.navButton, className)}
      disabled={!canGoNext}
      onClick={nextSlide}
      type="button"
      {...props}
    >
      {children || (
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </button>
  );
}

export type CarouselNavigationProps = React.ComponentProps<"div">;

/** Navigation wrapper. Renders default buttons if no children provided. Hidden with one item. */
export function Navigation({
  className,
  children,
  ...props
}: CarouselNavigationProps) {
  const { totalItems, variant } = useCarousel();

  if (totalItems <= 1) {
    return null;
  }

  return (
    <div
      className={cn(styles.navContainer, className)}
      style={
        variant === "inset"
          ? ({
              "--inset-padding": "var(--calculated-inset-padding, 0)",
            } as React.CSSProperties)
          : undefined
      }
      {...props}
    >
      {children || (
        <>
          <Previous />
          <Next />
        </>
      )}
    </div>
  );
}

export type CarouselIndicatorsProps = React.ComponentProps<"div">;

/** Dot indicators for each item. Hidden with one item. */
export function Indicators({ className, ...props }: CarouselIndicatorsProps) {
  const { totalItems, currentIndex, goToIndex } = useCarousel();

  if (totalItems <= 1) {
    return null;
  }

  return (
    <div
      aria-label="Choose slide to display"
      className={cn(styles.indicators, className)}
      role="tablist"
      {...props}
    >
      {Array.from({ length: totalItems }, (_, index) => (
        <button
          aria-controls="carousel-slides"
          aria-label={`Scroll to item ${index + 1}`}
          aria-selected={currentIndex === index}
          className={cn(
            styles.indicator,
            currentIndex === index && styles.indicatorActive
          )}
          // biome-ignore lint/suspicious/noArrayIndexKey: Indicators are stable and don't reorder
          key={`indicator-${index}`}
          onClick={() => goToIndex(index)}
          role="tab"
          type="button"
        />
      ))}
    </div>
  );
}

/**
 * Composable carousel component with horizontal scrolling.
 * Built-in keyboard navigation with arrow keys, Home, and End.
 * Built-in screen reader announcements for current position.
 * Required: Carousel.Root, Carousel.Viewport, Carousel.Content, Carousel.Item.
 * Optional: Carousel.Bleed, Carousel.Navigation, Carousel.Previous, Carousel.Next, Carousel.Indicators.
 */
export const Carousel = {
  Root,
  Bleed,
  Viewport,
  Content,
  Item,
  Previous,
  Next,
  Navigation,
  Indicators,
};
