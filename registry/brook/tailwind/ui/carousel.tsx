"use client";

import { useControlled } from "@base-ui/utils/useControlled";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils-tailwind";

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
  slidesId: string;
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
  totalItems: number;
  gap?: number;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  align?: "start" | "center";
  variant?: "default" | "inset";
};

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
  const slidesId = `${useId()}-slides`;

  const maxIndex = totalItems - 1;

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
      const visibleWidth = Math.min(slideRect.right, viewportRect.right) - Math.max(slideRect.left, viewportRect.left);
      const slideWidth = slideRect.width;

      if (visibleWidth / slideWidth >= VISIBILITY_THRESHOLD) {
        visibleCount++;
      }
    }

    return Math.max(1, visibleCount);
  }, []);

  const visibleItemsForNav = getVisibleItemsCount();
  const canGoNext = currentIndex + visibleItemsForNav <= maxIndex;
  const canGoPrev = currentIndex > 0;

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
    slidesId,
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const handleScroll = () => {
      const slides = viewport.querySelectorAll('[role="group"]');
      if (slides.length === 0) {
        return;
      }

      const viewportRect = viewport.getBoundingClientRect();
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const slideRect = slide.getBoundingClientRect();
        const distance = Math.abs(slideRect.left - viewportRect.left);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== currentIndex) {
        setCurrentIndexInternal(closestIndex);
      }
    };

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [currentIndex, setCurrentIndexInternal]);

  useEffect(() => {
    if (variant !== "inset" || !bleedRefFromContext?.current || !viewportRef.current) {
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

      const parentStyles = window.getComputedStyle(parent);
      const parentPaddingLeft = Number.parseFloat(parentStyles.paddingLeft);
      const parentPaddingRight = Number.parseFloat(parentStyles.paddingRight);

      const leftPadding = Math.max(0, parentRect.left + parentPaddingLeft - viewportRect.left - gap);

      const rightPadding = Math.max(0, viewportRect.right - (parentRect.right - parentPaddingRight));

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
          "relative mx-auto w-full overflow-visible rounded-lg",
          "focus-visible:outline-2 focus-visible:outline-[color:var(--ring)] focus-visible:outline-offset-2",
          "data-[align=center]:flex data-[align=center]:flex-col data-[align=center]:items-center",
          className
        )}
        data-align={align}
        data-slot="carousel"
        style={
          {
            "--page-max-width": "1280px",
            "--page-padding-left": "1rem",
            "--carousel-gap": "16px",
            "--edge": "calc((100vw - var(--page-max-width)) / 2)",
            "--min-edge": "calc(var(--edge) - var(--carousel-gap))",
            "--min-padding": "calc(var(--page-padding-left) - var(--carousel-gap))",
            "--calculated-inset-padding-left": `${insetPaddingLeft}px`,
            "--calculated-inset-padding-right": `${insetPaddingRight}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
        <div
          aria-atomic="true"
          aria-live="polite"
          className="-m-px absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0"
          style={{ clip: "rect(0, 0, 0, 0)" }}
        >
          Slide {currentIndex + 1} of {totalItems}
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export type CarouselBleedProps = React.ComponentProps<"div">;

const BleedRefContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export function useBleedRef() {
  return useContext(BleedRefContext);
}

export function Bleed({ className, children, ...props }: CarouselBleedProps) {
  const bleedRef = useRef<HTMLDivElement | null>(null);

  return (
    <BleedRefContext.Provider value={bleedRef}>
      <div
        className={cn("-ml-[50vw] -mr-[50vw] relative right-1/2 left-1/2 w-screen", className)}
        ref={bleedRef}
        {...props}
      >
        {children}
      </div>
    </BleedRefContext.Provider>
  );
}

export type CarouselViewportProps = React.ComponentProps<"div">;

export function Viewport({ className, children, ...props }: CarouselViewportProps) {
  const { viewportRef, slidesId } = useCarousel();

  return (
    <div
      className={cn(
        "[scroll-snap-stop:always] relative w-full overflow-y-hidden overflow-x-scroll overscroll-x-contain",
        "py-[calc(var(--focus-ring-width,2px)+var(--focus-ring-offset,2px))] [-ms-overflow-style:none] [scrollbar-width:none]",
        "[&::-webkit-scrollbar]:hidden",
        className
      )}
      id={slidesId}
      ref={viewportRef}
      {...props}
    >
      {children}
    </div>
  );
}

export type CarouselContentProps = React.ComponentProps<"div">;

export function Content({ className, children, ...props }: CarouselContentProps) {
  const { gap, variant } = useCarousel();

  return (
    <div
      className={cn(
        "flex items-stretch",
        "before:w-[var(--inset-padding-left,0)] before:flex-shrink-0 before:content-['']",
        "after:w-[var(--inset-padding-right,0)] after:flex-shrink-0 after:content-['']",
        className
      )}
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
  index: number;
};

export function Item({ index, className, children, ...props }: CarouselItemProps) {
  const { totalItems, goToIndex, nextSlide, prevSlide, canGoNext, canGoPrev, viewportRef } = useCarousel();
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    const root = viewportRef.current;
    if (!(el && root)) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.intersectionRatio >= 0.5),
      { root, threshold: [0, 0.5, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [viewportRef]);

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
          break;
      }
    },
    [canGoPrev, canGoNext, prevSlide, nextSlide, goToIndex, totalItems]
  );

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Keyboard navigation is required for carousel accessibility
    <div
      aria-label={`Slide ${index + 1} of ${totalItems}`}
      aria-roledescription="slide"
      className={cn(
        "relative flex-shrink-0",
        "focus-visible:rounded-[var(--radius)] focus-visible:outline-2 focus-visible:outline-[color:var(--ring)] focus-visible:outline-offset-[1px]",
        className
      )}
      onKeyDown={handleKeyDown}
      ref={itemRef}
      role="group"
      tabIndex={isVisible ? 0 : -1}
      {...props}
    >
      {children}
    </div>
  );
}

export type CarouselPreviousProps = React.ComponentProps<"button">;

export function Previous({ className, children, ...props }: CarouselPreviousProps) {
  const { prevSlide, canGoPrev, slidesId } = useCarousel();

  return (
    <button
      aria-controls={slidesId}
      aria-label="Previous slide"
      className={cn(
        "relative h-10 w-10 rounded-full border-[0.5px] border-[color:oklch(from_var(--border)_l_c_h_/_0.8)]",
        "flex cursor-pointer items-center justify-center bg-[color:var(--card)] text-[color:var(--foreground)]",
        "opacity-90 shadow-[var(--shadow-md)] transition-all duration-200 ease-[var(--ease-out-quad)]",
        "hover:bg-[color:var(--muted)] hover:opacity-100",
        "focus-visible:outline-2 focus-visible:outline-[color:var(--ring)] focus-visible:outline-offset-2",
        "active:scale-95",
        "disabled:pointer-events-none disabled:cursor-default disabled:bg-[color:var(--muted)] disabled:text-[color:var(--muted-foreground)] disabled:opacity-30",
        "disabled:hover:bg-[color:var(--muted)] disabled:hover:opacity-30 disabled:hover:[transform:none]",
        "motion-reduce:transition-none [&_svg]:h-4 [&_svg]:w-4",
        className
      )}
      disabled={!canGoPrev}
      onClick={prevSlide}
      type="button"
      {...props}
    >
      {children || (
        <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m15 18-6-6 6-6" />
        </svg>
      )}
    </button>
  );
}

export type CarouselNextProps = React.ComponentProps<"button">;

export function Next({ className, children, ...props }: CarouselNextProps) {
  const { nextSlide, canGoNext, slidesId } = useCarousel();

  return (
    <button
      aria-controls={slidesId}
      aria-label="Next slide"
      className={cn(
        "relative h-10 w-10 rounded-full border-[0.5px] border-[color:oklch(from_var(--border)_l_c_h_/_0.8)]",
        "flex cursor-pointer items-center justify-center bg-[color:var(--card)] text-[color:var(--foreground)]",
        "opacity-90 shadow-[var(--shadow-md)] transition-all duration-200 ease-[var(--ease-out-quad)]",
        "hover:bg-[color:var(--muted)] hover:opacity-100",
        "focus-visible:outline-2 focus-visible:outline-[color:var(--ring)] focus-visible:outline-offset-2",
        "active:scale-95",
        "disabled:pointer-events-none disabled:cursor-default disabled:bg-[color:var(--muted)] disabled:text-[color:var(--muted-foreground)] disabled:opacity-30",
        "disabled:hover:bg-[color:var(--muted)] disabled:hover:opacity-30 disabled:hover:[transform:none]",
        "motion-reduce:transition-none [&_svg]:h-4 [&_svg]:w-4",
        className
      )}
      disabled={!canGoNext}
      onClick={nextSlide}
      type="button"
      {...props}
    >
      {children || (
        <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </button>
  );
}

export type CarouselNavigationProps = React.ComponentProps<"div">;

export function Navigation({ className, children, ...props }: CarouselNavigationProps) {
  const { totalItems, variant } = useCarousel();

  if (totalItems <= 1) {
    return null;
  }

  return (
    <div
      className={cn("mt-12 flex justify-center gap-2", className)}
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

export function Indicators({ className, ...props }: CarouselIndicatorsProps) {
  const { totalItems, currentIndex, goToIndex, slidesId } = useCarousel();

  if (totalItems <= 1) {
    return null;
  }

  return (
    <div
      aria-label="Choose slide to display"
      className={cn("-translate-x-1/2 absolute bottom-4 left-1/2 z-10 flex gap-2", className)}
      role="tablist"
      {...props}
    >
      {Array.from({ length: totalItems }, (_, index) => (
        <button
          aria-controls={slidesId}
          aria-label={`Go to slide ${index + 1}`}
          aria-selected={currentIndex === index}
          className={cn(
            "relative h-3 w-3 cursor-pointer rounded-full border-none",
            "bg-[color:oklch(from_var(--foreground)_l_c_h_/_0.3)] transition-all duration-200 ease-[ease]",
            "hover:scale-110 hover:bg-[color:oklch(from_var(--foreground)_l_c_h_/_0.5)]",
            "focus-visible:outline-2 focus-visible:outline-[color:var(--ring)] focus-visible:outline-offset-2",
            "data-[active]:scale-[1.2] data-[active]:bg-[color:var(--primary)] data-[active]:hover:bg-[color:var(--primary)]",
            "motion-reduce:transition-none"
          )}
          data-active={currentIndex === index ? "" : undefined}
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
