"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

export function Logo({ width, height, className = "", fillColor, strokeColor, strokeWidth = 8 }: LogoProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  let finalFillColor = fillColor;
  let finalStrokeColor = strokeColor;

  if (!(fillColor || strokeColor) && mounted) {
    if (theme === "dark") {
      finalFillColor = "#d9dee4";
      finalStrokeColor = "#8291ac";
    } else {
      finalFillColor = "#010203";
      finalStrokeColor = "#d9dee4";
    }
  }
  return (
    <svg
      aria-label="ROI UI Logo"
      className={className}
      height={height}
      role="img"
      viewBox="0 0 463.07 349.31"
      width={width}
    >
      <g>
        <path
          d="M459.07,231.54c0,41.45-11.07,80.3-30.44,113.76h-197.09c6.42,0,12.72-.52,18.86-1.57,53.85-8.99,94.91-55.81,94.91-112.2s-41.05-103.21-94.91-112.2c-6.14-1.05-12.45-1.57-18.86-1.57V4c26.62,0,52.15,4.58,75.88,12.97,13.24,4.67,25.92,10.54,37.89,17.47,21.43,12.38,40.64,28.17,56.88,46.63,9.99,11.28,18.86,23.57,26.44,36.7,19.37,33.47,30.44,72.31,30.44,113.77Z"
          fill={finalFillColor || "currentColor"}
          stroke={finalStrokeColor || "transparent"}
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
        />
        <path
          d="M345.31,231.54c0,56.38-41.05,103.21-94.91,112.2-6.14,1.04-12.45,1.57-18.86,1.57-62.82,0-113.77-50.95-113.77-113.76s50.95-113.77,113.77-113.77c6.42,0,12.72.52,18.86,1.57,53.85,8.99,94.91,55.81,94.91,112.2Z"
          fill={finalFillColor || "currentColor"}
          stroke={finalStrokeColor || "transparent"}
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
        />
        <path
          d="M231.53,4v113.77c-62.82,0-113.77,50.95-113.77,113.77v113.76H4v-113.76c0-41.46,11.07-80.3,30.44-113.77,19.97-34.54,48.78-63.35,83.32-83.33C151.24,15.08,190.08,4,231.53,4Z"
          fill={finalFillColor || "currentColor"}
          stroke={finalStrokeColor || "transparent"}
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}
