"use client";

import { HomeAnimatedCard } from "@/components/home-animated-card/home-animated-card";
import { HomeAnimatedDialog } from "@/components/home-animated-dialog/home-animated-dialog";
import { HomeHeader } from "@/components/home-header/home-header";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeCells, setActiveCells] = useState<Map<string, number>>(new Map());
  const cellSize = 100;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const col = Math.floor(e.clientX / cellSize);
      const row = Math.floor(e.clientY / cellSize);
      const cellKey = `${row}-${col}`;

      setActiveCells((prev) => {
        const newMap = new Map(prev);
        newMap.set(cellKey, Date.now());
        return newMap;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Clean up old cells
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setActiveCells((prev) => {
        const newMap = new Map(prev);
        for (const [key, timestamp] of newMap.entries()) {
          if (now - timestamp > 400) {
            newMap.delete(key);
          }
        }
        return newMap;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        paddingTop: "150px",
        paddingLeft: "max(40px, 5vw)",
        paddingRight: "max(40px, 5vw)",
        backgroundColor: "color-mix(in oklch, var(--card) 15%, var(--background))",
      }}
    >
      {/* Animated Grid Lines */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.1,
        }}
      >
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="6 6"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: 12 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </pattern>
          <linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#gridFade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fadeMask)" />
      </svg>

      {/* Interactive Grid Cells */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <AnimatePresence>
          {Array.from(activeCells.keys()).map((cellKey) => {
            const [row, col] = cellKey.split("-").map(Number);
            const x = col * cellSize;
            const y = row * cellSize;

            return (
              <motion.div
                key={cellKey}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: "black",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.15,
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "980px", margin: "0 auto" }}>
        <HomeHeader />
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            gap: "40px",
            alignItems: "flex-start",
          }}
        >
          <HomeAnimatedCard />
          <HomeAnimatedDialog />
        </div>
      </div>
    </div>
  );
}
