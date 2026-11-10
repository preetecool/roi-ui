"use client";

import { useControlled } from "@base-ui/utils/useControlled";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import { useStableCallback } from "@base-ui/utils/useStableCallback";
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./carousel.module.css";

const SETTLE_MS = 150;
const VISIBILITY_THRESHOLD = 0.5;

function getInset(viewport: HTMLElement) {
  return Number.parseFloat(getComputedStyle(viewport).paddingLeft) || 0;
}

function getMaxScroll(viewport: HTMLElement) {
  return viewport.scrollWidth - viewport.clientWidth;
}

function getLeadingIndex(viewport: HTMLElement) {
  const start = viewport.getBoundingClientRect().left + getInset(viewport);
  let leading = 0;
  let leadingDistance = Number.POSITIVE_INFINITY;
  for (let i = 0; i < viewport.children.length; i++) {
    const distance = Math.abs(viewport.children[i].getBoundingClientRect().left - start);
    if (distance < leadingDistance) {
      leadingDistance = distance;
      leading = i;
    }
  }
  return leading;
}

function getScrollIndex(viewport: HTMLElement) {
  const maxScroll = getMaxScroll(viewport);
  if (maxScroll <= 1) {
    return 0;
  }
  if (viewport.scrollLeft >= maxScroll - 1) {
    return viewport.children.length - 1;
  }
  return getLeadingIndex(viewport);
}

function getVisibleCount(viewport: HTMLElement) {
  const bounds = viewport.getBoundingClientRect();
  let visible = 0;
  for (const slide of viewport.children) {
    const rect = slide.getBoundingClientRect();
    const visibleWidth = Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left);
    if (visibleWidth / rect.width >= VISIBILITY_THRESHOLD) {
      visible++;
    }
  }
  return Math.max(1, visible);
}

type CarouselContextValue = {
  index: number;
  slides: Element[];
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  viewportRef: React.RefObject<HTMLDivElement | null>;
  viewportId: string;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel parts must be used within <Carousel.Root>");
  }
  return context;
}

const BleedContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export type CarouselRootProps = React.ComponentProps<"div"> & {
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  variant?: "default" | "inset";
};

function CarouselRoot({
  children,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  variant = "default",
  className,
  ...props
}: CarouselRootProps) {
  const [index, setIndexState] = useControlled({
    controlled: indexProp,
    default: defaultIndex,
    name: "Carousel",
    state: "index",
  });
  const [slides, setSlides] = useState<Element[]>([]);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const bleedRef = useContext(BleedContext);
  const viewportId = useId();
  const scrolledIndexRef = useRef(0);
  const seenIndexRef = useRef(0);
  const programmaticRef = useRef(false);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const mountedRef = useRef(false);

  const setIndex = useStableCallback((nextIndex: number) => {
    scrolledIndexRef.current = nextIndex;
    if (nextIndex !== index) {
      setIndexState(nextIndex);
      onIndexChange?.(nextIndex);
    }
  });

  const sync = useStableCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    setCanGoPrev(viewport.scrollLeft > 1);
    setCanGoNext(viewport.scrollLeft < getMaxScroll(viewport) - 1);
    if (!programmaticRef.current) {
      setIndex(getScrollIndex(viewport));
    }
  });

  const settle = useStableCallback(() => {
    clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      programmaticRef.current = false;
      sync();
    }, SETTLE_MS);
  });

  const scrollToSlide = useStableCallback((target: number, behavior: ScrollBehavior) => {
    const viewport = viewportRef.current;
    const slide = viewport?.children[target] as HTMLElement | undefined;
    if (!(viewport && slide)) {
      return;
    }
    programmaticRef.current = true;
    settle();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollTo({ left: slide.offsetLeft - getInset(viewport), behavior: reduceMotion ? "auto" : behavior });
  });

  const goTo = useStableCallback((target: number) => {
    const viewport = viewportRef.current;
    if (!viewport || getMaxScroll(viewport) <= 1) {
      return;
    }
    const last = viewport.children.length - 1;
    const clamped = Math.max(0, Math.min(target, last));
    const slide = viewport.children[clamped] as HTMLElement;
    const pastEnd = slide.offsetLeft - getInset(viewport) >= getMaxScroll(viewport) - 1;
    const resolved = pastEnd ? last : clamped;
    setIndex(resolved);
    scrollToSlide(resolved, "smooth");
  });

  const step = (direction: 1 | -1) => {
    const viewport = viewportRef.current;
    if (viewport) {
      goTo(getLeadingIndex(viewport) + direction * getVisibleCount(viewport));
    }
  };
  const next = useStableCallback(() => step(1));
  const prev = useStableCallback(() => step(-1));

  useEffect(() => {
    if (index !== seenIndexRef.current && index !== scrolledIndexRef.current) {
      scrolledIndexRef.current = index;
      scrollToSlide(index, mountedRef.current ? "smooth" : "auto");
    }
    seenIndexRef.current = index;
    mountedRef.current = true;
  }, [index, scrollToSlide]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const readSlides = () => {
      setSlides(Array.from(viewport.children));
      sync();
    };
    const onScroll = () => {
      if (programmaticRef.current) {
        settle();
      }
      sync();
    };

    readSlides();
    const mutationObserver = new MutationObserver(readSlides);
    mutationObserver.observe(viewport, { childList: true });
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(viewport);
    viewport.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      viewport.removeEventListener("scroll", onScroll);
      clearTimeout(settleTimerRef.current);
      programmaticRef.current = false;
    };
  }, [sync, settle]);

  useEffect(() => {
    const bleed = bleedRef?.current;
    const parent = bleed?.parentElement;
    const viewport = viewportRef.current;
    if (variant !== "inset" || !(bleed && parent && viewport)) {
      return;
    }
    const measure = () => {
      const parentRect = parent.getBoundingClientRect();
      const viewportRect = viewport.getBoundingClientRect();
      const parentStyles = getComputedStyle(parent);
      const start = parentRect.left + Number.parseFloat(parentStyles.paddingLeft) - viewportRect.left;
      const end = viewportRect.right - (parentRect.right - Number.parseFloat(parentStyles.paddingRight));
      viewport.style.setProperty("--carousel-inset-start", `${Math.max(0, start)}px`);
      viewport.style.setProperty("--carousel-inset-end", `${Math.max(0, end)}px`);
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(bleed);
    resizeObserver.observe(parent);
    return () => {
      resizeObserver.disconnect();
      viewport.style.removeProperty("--carousel-inset-start");
      viewport.style.removeProperty("--carousel-inset-end");
    };
  }, [variant, bleedRef]);

  const value = useMemo(
    () => ({ index, slides, goTo, next, prev, canGoNext, canGoPrev, viewportRef, viewportId }),
    [index, slides, goTo, next, prev, canGoNext, canGoPrev, viewportId]
  );

  return (
    <CarouselContext.Provider value={value}>
      <div className={cn(styles.carousel, className)} data-slot="carousel" data-variant={variant} {...props}>
        {children}
        {slides.length > 0 && (
          <div aria-atomic="true" aria-live="polite" className={styles.srOnly}>
            Slide {index + 1} of {slides.length}
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselBleed({ className, ref, ...props }: React.ComponentProps<"div">) {
  const bleedRef = useRef<HTMLDivElement | null>(null);
  const mergedRef = useMergedRefs(ref, bleedRef);

  return (
    <BleedContext.Provider value={bleedRef}>
      <div className={cn(styles.bleed, className)} data-slot="carousel-bleed" ref={mergedRef} {...props} />
    </BleedContext.Provider>
  );
}

function CarouselViewport({ className, ref, ...props }: React.ComponentProps<"div">) {
  const { viewportRef, viewportId } = useCarousel();
  const mergedRef = useMergedRefs(ref, viewportRef);

  return (
    <div
      className={cn(styles.viewport, className)}
      data-slot="carousel-viewport"
      id={viewportId}
      ref={mergedRef}
      {...props}
    />
  );
}

function CarouselItem({ className, onKeyDown, ref, ...props }: React.ComponentProps<"div">) {
  const { slides, goTo, next, prev, viewportRef } = useCarousel();
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const mergedRef = useMergedRefs(ref, setElement);
  const [isVisible, setIsVisible] = useState(false);
  const position = element ? slides.indexOf(element) + 1 : 0;

  useEffect(() => {
    const root = viewportRef.current;
    if (!(element && root)) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.intersectionRatio >= VISIBILITY_THRESHOLD),
      { root, threshold: [0, VISIBILITY_THRESHOLD, 1] }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, viewportRef]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.target !== event.currentTarget) {
      return;
    }
    const actions: Record<string, () => void> = {
      ArrowLeft: prev,
      ArrowRight: next,
      Home: () => goTo(0),
      End: () => goTo(slides.length - 1),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Keyboard navigation is required for carousel accessibility
    // biome-ignore lint/a11y/useSemanticElements: role="group" with aria-label is the intended ARIA pattern; <fieldset> would need a <legend>
    <div
      aria-label={position > 0 ? `Slide ${position} of ${slides.length}` : undefined}
      aria-roledescription="slide"
      className={cn(styles.slide, className)}
      data-slot="carousel-item"
      onKeyDown={handleKeyDown}
      ref={mergedRef}
      role="group"
      tabIndex={isVisible ? 0 : -1}
      {...props}
    />
  );
}

function CarouselPrevious({ className, children, onClick, ...props }: React.ComponentProps<"button">) {
  const { prev, canGoPrev, slides, viewportId } = useCarousel();

  if (slides.length === 1) {
    return null;
  }

  return (
    <button
      aria-controls={viewportId}
      aria-label="Previous slide"
      className={cn(styles.navButton, className)}
      data-slot="carousel-previous"
      disabled={!canGoPrev}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          prev();
        }
      }}
      type="button"
      {...props}
    >
      {children ?? (
        <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m15 18-6-6 6-6" />
        </svg>
      )}
    </button>
  );
}

function CarouselNext({ className, children, onClick, ...props }: React.ComponentProps<"button">) {
  const { next, canGoNext, slides, viewportId } = useCarousel();

  if (slides.length === 1) {
    return null;
  }

  return (
    <button
      aria-controls={viewportId}
      aria-label="Next slide"
      className={cn(styles.navButton, className)}
      data-slot="carousel-next"
      disabled={!canGoNext}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          next();
        }
      }}
      type="button"
      {...props}
    >
      {children ?? (
        <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </button>
  );
}

function CarouselNavigation({ className, children, ...props }: React.ComponentProps<"div">) {
  const { slides } = useCarousel();

  if (slides.length === 1) {
    return null;
  }

  return (
    <div className={cn(styles.navContainer, className)} data-slot="carousel-navigation" {...props}>
      {children ?? (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </div>
  );
}

function CarouselIndicators({ className, ...props }: Omit<React.ComponentProps<"div">, "children">) {
  const { slides, index, goTo, viewportId } = useCarousel();

  if (slides.length <= 1) {
    return null;
  }

  return (
    // biome-ignore lint/a11y/useSemanticElements: role="group" with aria-label is the intended ARIA pattern; <fieldset> would need a <legend>
    <div
      aria-label="Choose slide to display"
      className={cn(styles.indicators, className)}
      data-slot="carousel-indicators"
      role="group"
      {...props}
    >
      {slides.map((_, slideIndex) => (
        <button
          aria-controls={viewportId}
          aria-current={index === slideIndex ? "true" : undefined}
          aria-label={`Go to slide ${slideIndex + 1}`}
          className={styles.indicator}
          data-active={index === slideIndex ? "" : undefined}
          // biome-ignore lint/suspicious/noArrayIndexKey: Indicators have no identity other than their position
          key={slideIndex}
          onClick={() => goTo(slideIndex)}
          type="button"
        />
      ))}
    </div>
  );
}

export const Carousel = {
  Root: CarouselRoot,
  Bleed: CarouselBleed,
  Viewport: CarouselViewport,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Navigation: CarouselNavigation,
  Indicators: CarouselIndicators,
};
