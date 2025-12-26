"use client";

import type { ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

import styles from "./boundary.module.css";
import { useBoundaryMode } from "./boundary-provider";

type RenderingType = "static" | "dynamic" | "hybrid";
type HydrationType = "server" | "client" | "hybrid";

type Props = {
  children: ReactNode;
  rendering?: RenderingType;
  hydration?: HydrationType;
  label?: string;
  showLabel?: boolean;
  cached?: boolean;
};

type ColorVariant = "blue" | "purple" | "red";

const renderingContainerStyles: Record<RenderingType, string> = {
  dynamic: styles.dynamicRendering,
  hybrid: styles.hybridRendering,
  static: styles.staticRendering,
};

const hydrationContainerStyles: Record<HydrationType, string> = {
  client: styles.clientHydration,
  hybrid: styles.hybridHydration,
  server: styles.serverHydration,
};

const renderingColorVariant: Record<RenderingType, ColorVariant> = {
  dynamic: "blue",
  hybrid: "purple",
  static: "red",
};

const hydrationColorVariant: Record<HydrationType, ColorVariant> = {
  client: "blue",
  hybrid: "purple",
  server: "red",
};

const labelStyles: Record<ColorVariant, string> = {
  blue: styles.labelBlue,
  purple: styles.labelPurple,
  red: styles.labelRed,
};

const smallIndicatorStyles: Record<ColorVariant, string> = {
  blue: styles.smallIndicatorBlue,
  purple: styles.smallIndicatorPurple,
  red: styles.smallIndicatorRed,
};

function useElementSize(ref: RefObject<HTMLDivElement | null>) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const checkSize = () => {
      const { width, height } = element.getBoundingClientRect();
      setIsSmall(width < 60 || height < 60);
    };

    checkSize();
    const resizeObserver = new ResizeObserver(checkSize);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return isSmall;
}

type BoundaryStyles = {
  containerClass: string;
  colorVariant: ColorVariant;
  labelText: string;
};

type GetBoundaryStylesOptions = {
  showRendering: boolean;
  rendering: RenderingType | undefined;
  hydration: HydrationType | undefined;
  showLabel: boolean;
  label: string | undefined;
};

function getBoundaryStyles(options: GetBoundaryStylesOptions): BoundaryStyles {
  const { showRendering, rendering, hydration, showLabel, label } = options;

  if (showRendering && rendering) {
    return {
      containerClass: renderingContainerStyles[rendering],
      colorVariant: renderingColorVariant[rendering],
      labelText: showLabel ? label || `${rendering} rendering` : "",
    };
  }

  if (hydration) {
    return {
      containerClass: hydrationContainerStyles[hydration],
      colorVariant: hydrationColorVariant[hydration],
      labelText: showLabel ? label || `${hydration} component` : "",
    };
  }

  return {
    containerClass: "",
    colorVariant: "blue",
    labelText: "",
  };
}

export default function Boundary({ children, rendering, hydration, label, showLabel = true, cached = false }: Props) {
  const { mode } = useBoundaryMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const isSmall = useElementSize(containerRef);

  const showRendering = mode === "rendering" && Boolean(rendering);
  const showHydration = mode === "hydration" && Boolean(hydration);
  const isActive = showRendering || showHydration;

  if (mode === "off" || !isActive) {
    return <>{children}</>;
  }

  const { containerClass, colorVariant, labelText } = getBoundaryStyles({
    showRendering,
    rendering,
    hydration,
    showLabel,
    label,
  });

  if (isSmall) {
    return (
      <div className={styles.smallWrapper}>
        <div ref={containerRef}>{children}</div>
        <div
          className={`${styles.smallIndicator} ${smallIndicatorStyles[colorVariant]}`}
          title={labelText || "Boundary indicator"}
        />
      </div>
    );
  }

  const showCachedBadge = cached && mode === "rendering";
  const hasLabel = Boolean(showLabel && labelText);

  return (
    <div className={`${styles.boundary} ${styles.container} ${containerClass}`} ref={containerRef}>
      {hasLabel ? (
        <div className={styles.labelContainer}>
          <div className={`${styles.label} ${labelStyles[colorVariant]}`}>{labelText}</div>
          {showCachedBadge ? <div className={styles.cachedBadge}>cached</div> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
