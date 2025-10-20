"use client";

import { cn } from "@/lib/utils";
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./carousel.module.css";

export type CarouselItem = {
  id: string;
  content: React.ReactNode;
};

/**
 * Carousel component for displaying multiple items in a scrollable horizontal layout with optional navigation and indicators.
 *
 * @param items - Array of carousel items to display
 * @param showIndicators - Show dot indicators for each item (default: false)
 * @param showNavigation - Show previous/next navigation buttons (default: true)
 * @param itemsPerView - Number of items visible at once (default: 3.2)
 * @param gap - Gap between items in pixels (default: 16)
 * @param className - Optional CSS class names
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: '1', content: <Card>Item 1</Card> },
 *   { id: '2', content: <Card>Item 2</Card> },
 *   { id: '3', content: <Card>Item 3</Card> },
 * ];
 *
 * <Carousel
 *   items={items}
 *   showNavigation={true}
 *   showIndicators={false}
 *   itemsPerView={3.2}
 * />
 * ```
 */
function Carousel({
  className,
  items,
  showIndicators = false,
  showNavigation = true,
  itemsPerView = 3.2,
  gap = 16,
  ...props
}: React.ComponentProps<"div"> & {
  items: CarouselItem[];
  showIndicators?: boolean;
  showNavigation?: boolean;
  itemsPerView?: number;
  gap?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const totalItems = items.length;

  const itemWidth = useMemo(
    () => `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})`,
    [itemsPerView, gap],
  );

  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);

  const canGoNext = scrollLeft < maxScrollLeft;
  const canGoPrev = scrollLeft > 0;

  const showLeftFade = scrollLeft > 20;
  const showRightFade = scrollLeft < maxScrollLeft - 20;

  const goToIndex = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      const containerWidth = viewport.clientWidth;
      const itemWidth =
        (containerWidth - gap * (itemsPerView - 1)) / itemsPerView;
      const itemWithGap = itemWidth + gap;

      const previousItemOffset = index > 0 ? itemWidth * 0.2 : 0;
      const targetScroll = Math.max(
        0,
        index * itemWithGap - previousItemOffset,
      );

      isScrollingRef.current = true;
      viewport.scrollTo({ left: targetScroll, behavior: "smooth" });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 300);
    },
    [itemsPerView, gap],
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = Math.min(prev + 1, totalItems - Math.ceil(itemsPerView));
      goToIndex(newIndex);
      return newIndex;
    });
  }, [totalItems, itemsPerView, goToIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = Math.max(prev - 1, 0);
      goToIndex(newIndex);
      return newIndex;
    });
  }, [goToIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isActiveInCarousel = carouselRef.current?.contains(
        document.activeElement,
      );
      const isActiveOnCarouselContainer =
        document.activeElement === carouselRef.current?.parentElement;

      if (!(isActiveInCarousel || isActiveOnCarouselContainer)) {
        return;
      }

      switch (event.key) {
        case "ArrowLeft":
          if (canGoPrev) {
            event.preventDefault();
            prevSlide();
          }
          break;
        case "ArrowRight":
          if (canGoNext) {
            event.preventDefault();
            nextSlide();
          }
          break;
        case "Home":
          event.preventDefault();
          goToIndex(0);
          break;
        case "End":
          event.preventDefault();
          goToIndex(Math.max(0, totalItems - Math.ceil(itemsPerView)));
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    prevSlide,
    nextSlide,
    goToIndex,
    canGoNext,
    canGoPrev,
    totalItems,
    itemsPerView,
  ]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const updateScrollInfo = () => {
      const newScrollLeft = viewport.scrollLeft;
      const newMaxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

      setScrollLeft(newScrollLeft);
      setMaxScrollLeft(newMaxScrollLeft);

      if (!isScrollingRef.current) {
        const containerWidth = viewport.clientWidth;
        const itemWidth =
          (containerWidth - gap * (itemsPerView - 1)) / itemsPerView;
        const itemWithGap = itemWidth + gap;

        const adjustedScrollLeft = newScrollLeft + itemWidth * 0.2;
        const newIndex = Math.round(adjustedScrollLeft / itemWithGap);
        setCurrentIndex(Math.max(0, Math.min(newIndex, totalItems - 1)));
      }
    };

    updateScrollInfo();

    viewport.addEventListener("scroll", updateScrollInfo, { passive: true });

    window.addEventListener("resize", updateScrollInfo);

    return () => {
      viewport.removeEventListener("scroll", updateScrollInfo);
      window.removeEventListener("resize", updateScrollInfo);
    };
  }, [itemsPerView, totalItems, gap]);

  return (
    <div
      aria-label="Interactive carousel"
      aria-roledescription="carousel"
      className={cn(styles.carousel, className)}
      data-slot="carousel"
      role="region"
      {...props}
    >
      <div
        aria-atomic="false"
        aria-live="polite"
        className={cn(
          styles.viewport,
          showLeftFade && styles.showLeftFade,
          showRightFade && styles.showRightFade,
        )}
        ref={viewportRef}
      >
        <div
          className={styles.container}
          id="carousel-slides"
          ref={carouselRef}
          style={{
            gap: `${gap}px`,
          }}
        >
          {items.map((item, index) => {
            const isVisible =
              index >= Math.max(0, currentIndex - 1) &&
              index < currentIndex + Math.ceil(itemsPerView);

            return (
              <div
                aria-hidden={!isVisible}
                aria-label={`${index + 1} of ${items.length}`}
                aria-roledescription="slide"
                className={styles.slide}
                inert={isVisible ? undefined : true}
                key={item.id}
                role="group"
                style={{
                  width: itemWidth,
                  minWidth: itemWidth,
                  visibility: isVisible ? "visible" : "hidden",
                }}
              >
                {item.content ? (
                  isValidElement(item.content) ? (
                    cloneElement(
                      item.content as ReactElement<
                        React.HTMLAttributes<HTMLElement>
                      >,
                      {
                        tabIndex: isVisible ? 0 : -1,
                        "aria-label": `Item ${index + 1} content`,
                        style: {
                          ...((
                            item.content as ReactElement<
                              React.HTMLAttributes<HTMLElement>
                            >
                          )?.props?.style || {}),
                          outline: "none",
                          width: "100%",
                          height: "100%",
                        },
                      },
                    )
                  ) : (
                    <div
                      aria-label={`Item ${index + 1} content`}
                      style={{
                        outline: "none",
                        width: "100%",
                        height: "100%",
                      }}
                      tabIndex={isVisible ? 0 : -1}
                    >
                      {item.content}
                    </div>
                  )
                ) : (
                  <div>Invalid carousel item</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showNavigation && items.length > 1 && (
        <div className={styles.navContainer}>
          <button
            aria-controls="carousel-slides"
            aria-label="Scroll to previous items"
            className={cn(styles.navButton, styles.prevButton)}
            disabled={!canGoPrev}
            onClick={prevSlide}
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            aria-controls="carousel-slides"
            aria-label="Scroll to next items"
            className={cn(styles.navButton, styles.nextButton)}
            disabled={!canGoNext}
            onClick={nextSlide}
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {showIndicators && items.length > 1 && (
        <div
          aria-label="Choose slide to display"
          className={styles.indicators}
          role="tablist"
        >
          {items.map((_, index) => (
            <button
              aria-controls="carousel-slides"
              aria-label={`Scroll to item ${index + 1}`}
              aria-selected={false}
              className={cn(
                styles.indicator,
                currentIndex === index && styles.indicatorActive,
              )}
              key={index}
              onClick={() => goToIndex(index)}
              role="tab"
              type="button"
            />
          ))}
        </div>
      )}

      <div className={styles.srOnly}>
        <div aria-atomic="true" aria-live="polite">
          Showing items {currentIndex + 1} to{" "}
          {Math.min(items.length, currentIndex + Math.ceil(itemsPerView))} of{" "}
          {items.length}
        </div>
        <p>Use arrow keys or tab/shift+tab to navigate slides.</p>
      </div>
    </div>
  );
}

export { Carousel };
