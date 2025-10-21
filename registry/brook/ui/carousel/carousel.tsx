"use client";

import { useControlled } from "@base-ui-components/utils/useControlled";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "@/lib/utils";
import styles from "./carousel.module.css";

const FADE_THRESHOLD_PX = 20;
const PREVIOUS_ITEM_OFFSET_PERCENTAGE = 0.2;
const SCROLL_TIMEOUT_MS = 300;

type CarouselContextValue = {
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
	totalItems: number;
	itemsPerView: number;
	gap: number;
	itemWidth: string;
	goToIndex: (index: number) => void;
	nextSlide: () => void;
	prevSlide: () => void;
	canGoNext: boolean;
	canGoPrev: boolean;
	showLeftFade: boolean;
	showRightFade: boolean;
	scrollLeft: number;
	maxScrollLeft: number;
	setScrollLeft: (value: number) => void;
	setMaxScrollLeft: (value: number) => void;
	viewportRef: React.RefObject<HTMLDivElement | null>;
	containerRef: React.RefObject<HTMLDivElement | null>;
	isScrollingRef: React.MutableRefObject<boolean>;
	registerItem: () => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
	const context = useContext(CarouselContext);
	if (!context) {
		throw new Error("Carousel components must be used within Carousel.Root");
	}
	return context;
}

export type CarouselRootProps = React.ComponentProps<"section"> & {
	/** Number of items visible in viewport. @default 3.2 */
	itemsPerView?: number;
	/** Gap between items in pixels. @default 16 */
	gap?: number;
	/** Controlled index value. */
	index?: number;
	/** Default index for uncontrolled mode. @default 0 */
	defaultIndex?: number;
	/** Callback when index changes. */
	onIndexChange?: (index: number) => void;
	children: ReactNode;
};

/** Root component. Manages state and provides context. */
export function Root({
	children,
	itemsPerView = 3.2,
	gap = 16,
	index: indexProp,
	defaultIndex = 0,
	onIndexChange,
	className,
	...props
}: CarouselRootProps) {
	const [currentIndex, setCurrentIndex] = useControlled({
		controlled: indexProp,
		default: defaultIndex,
		name: "Carousel",
		state: "index",
	});

	const [totalItems, setTotalItems] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [maxScrollLeft, setMaxScrollLeft] = useState(0);

	const viewportRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const isScrollingRef = useRef(false);

	const canGoNext = scrollLeft < maxScrollLeft;
	const canGoPrev = scrollLeft > 0;

	const showLeftFade = scrollLeft > FADE_THRESHOLD_PX;
	const showRightFade = scrollLeft < maxScrollLeft - FADE_THRESHOLD_PX;

	const itemWidth = useMemo(
		() => `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})`,
		[itemsPerView, gap],
	);

	const goToIndex = useCallback(
		(index: number) => {
			const viewport = viewportRef.current;
			if (!viewport) {
				return;
			}

			const containerWidth = viewport.clientWidth;
			const calculatedItemWidth =
				(containerWidth - gap * (itemsPerView - 1)) / itemsPerView;
			const itemWithGap = calculatedItemWidth + gap;

			const previousItemOffset =
				index > 0 ? calculatedItemWidth * PREVIOUS_ITEM_OFFSET_PERCENTAGE : 0;
			const targetScroll = Math.max(
				0,
				index * itemWithGap - previousItemOffset,
			);

			isScrollingRef.current = true;
			viewport.scrollTo({ left: targetScroll, behavior: "smooth" });

			setTimeout(() => {
				isScrollingRef.current = false;
			}, SCROLL_TIMEOUT_MS);
		},
		[itemsPerView, gap],
	);

	const handleIndexChange = useCallback(
		(newIndex: number) => {
			setCurrentIndex(newIndex);
			onIndexChange?.(newIndex);
		},
		[setCurrentIndex, onIndexChange],
	);

	const nextSlide = useCallback(() => {
		const newIndex = Math.min(
			currentIndex + 1,
			totalItems - Math.ceil(itemsPerView),
		);
		goToIndex(newIndex);
		handleIndexChange(newIndex);
	}, [currentIndex, totalItems, itemsPerView, goToIndex, handleIndexChange]);

	const prevSlide = useCallback(() => {
		const newIndex = Math.max(currentIndex - 1, 0);
		goToIndex(newIndex);
		handleIndexChange(newIndex);
	}, [currentIndex, goToIndex, handleIndexChange]);

	const registerItem = useCallback(() => {
		setTotalItems((prev) => prev + 1);
	}, []);

	const value: CarouselContextValue = {
		currentIndex,
		setCurrentIndex: handleIndexChange,
		totalItems,
		itemsPerView,
		gap,
		itemWidth,
		goToIndex,
		nextSlide,
		prevSlide,
		canGoNext,
		canGoPrev,
		showLeftFade,
		showRightFade,
		scrollLeft,
		maxScrollLeft,
		setScrollLeft,
		setMaxScrollLeft,
		viewportRef,
		containerRef,
		isScrollingRef,
		registerItem,
	};

	return (
		<CarouselContext.Provider value={value}>
			<section
				aria-label="Interactive carousel"
				aria-roledescription="carousel"
				className={cn(styles.carousel, className)}
				data-slot="carousel"
				{...props}
			>
				{children}
			</section>
		</CarouselContext.Provider>
	);
}

export type CarouselViewportProps = React.ComponentProps<"div">;

/** Scrollable viewport. Handles scroll events and fade effects. */
export function Viewport({
	className,
	children,
	...props
}: CarouselViewportProps) {
	const {
		viewportRef,
		showLeftFade,
		showRightFade,
		setScrollLeft,
		setMaxScrollLeft,
		setCurrentIndex,
		itemsPerView,
		totalItems,
		gap,
		isScrollingRef,
	} = useCarousel();

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
				const calculatedItemWidth =
					(containerWidth - gap * (itemsPerView - 1)) / itemsPerView;
				const itemWithGap = calculatedItemWidth + gap;

				const adjustedScrollLeft =
					newScrollLeft + calculatedItemWidth * PREVIOUS_ITEM_OFFSET_PERCENTAGE;
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
	}, [
		itemsPerView,
		totalItems,
		gap,
		setScrollLeft,
		setMaxScrollLeft,
		setCurrentIndex,
		viewportRef,
		isScrollingRef,
	]);

	return (
		<div
			aria-atomic="false"
			aria-live="polite"
			className={cn(
				styles.viewport,
				showLeftFade && styles.showLeftFade,
				showRightFade && styles.showRightFade,
				className,
			)}
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
	const { containerRef, gap } = useCarousel();

	return (
		<div
			className={cn(styles.container, className)}
			id="carousel-slides"
			ref={containerRef}
			style={{
				gap: `${gap}px`,
			}}
			{...props}
		>
			{children}
		</div>
	);
}

export type CarouselItemProps = React.ComponentProps<"fieldset"> & {
	/** Item index (required). */
	index: number;
};

/** Individual carousel slide. Auto-registers with carousel context. */
export function Item({
	index,
	className,
	children,
	...props
}: CarouselItemProps) {
	const { currentIndex, itemsPerView, totalItems, itemWidth, registerItem } =
		useCarousel();

	useEffect(() => {
		registerItem();
	}, [registerItem]);

	const isVisible =
		index >= Math.max(0, currentIndex - 1) &&
		index < currentIndex + Math.ceil(itemsPerView);

	return (
		<fieldset
			aria-hidden={!isVisible}
			aria-label={`${index + 1} of ${totalItems}`}
			aria-roledescription="slide"
			className={cn(styles.slide, className)}
			inert={isVisible ? undefined : true}
			style={{
				width: itemWidth,
				minWidth: itemWidth,
				visibility: isVisible ? "visible" : "hidden",
				border: "none",
				padding: 0,
				margin: 0,
			}}
			{...props}
		>
			{children}
		</fieldset>
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
			className={cn(styles.navButton, styles.prevButton, className)}
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
			className={cn(styles.navButton, styles.nextButton, className)}
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
	const { totalItems } = useCarousel();

	if (totalItems <= 1) {
		return null;
	}

	return (
		<div className={cn(styles.navContainer, className)} {...props}>
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
						currentIndex === index && styles.indicatorActive,
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

export type CarouselSRInfoProps = React.ComponentProps<"div">;

/** Screen reader info. Announces position and navigation instructions. */
export function SRInfo({ className, ...props }: CarouselSRInfoProps) {
	const { currentIndex, itemsPerView, totalItems } = useCarousel();

	return (
		<div className={cn(styles.srOnly, className)} {...props}>
			<div aria-atomic="true" aria-live="polite">
				Showing items {currentIndex + 1} to{" "}
				{Math.min(totalItems, currentIndex + Math.ceil(itemsPerView))} of{" "}
				{totalItems}
			</div>
			<p>Use arrow keys or tab/shift+tab to navigate slides.</p>
		</div>
	);
}

function useKeyboardNavigation() {
	const {
		containerRef,
		canGoNext,
		canGoPrev,
		prevSlide,
		nextSlide,
		goToIndex,
		totalItems,
		itemsPerView,
	} = useCarousel();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const isActiveInCarousel = containerRef.current?.contains(
				document.activeElement,
			);
			const isActiveOnCarouselContainer =
				document.activeElement === containerRef.current?.parentElement;

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
				default:
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
		containerRef,
	]);
}

/** Enables keyboard navigation. Supports arrow keys, Home, and End. */
export function KeyboardHandler() {
	useKeyboardNavigation();
	return null;
}

/**
 * Composable carousel component with horizontal scrolling.
 * Required: Carousel, Viewport, Content, Item.
 * Optional: Navigation, Previous, Next, Indicators, SRInfo, KeyboardHandler.
 */
const CarouselNamespace = Object.assign(Root, {
	Viewport,
	Content,
	Item,
	Previous,
	Next,
	Navigation,
	Indicators,
	SRInfo,
	KeyboardHandler,
});

export { CarouselNamespace as Carousel };
