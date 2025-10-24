"use client";

import type { PageTree } from "fumadocs-core/server";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import { memo, useEffect, useState } from "react";
import { HomeAnimatedCard } from "@/components/home-animated-card/home-animated-card";
import { HomeAnimatedDialog } from "@/components/home-animated-dialog/home-animated-dialog";
import { HomeHeader } from "@/components/home-header/home-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";

type HomeClientProps = {
  pageTree: PageTree.Root;
};

const MemoizedSiteHeader = memo(SiteHeader);

const StaticBackgrounds = memo(() => (
  <>
    <svg
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
    >
      <title>Noise Filter Definition</title>
      <defs>
        <filter id="noise-filter">
          <motion.feTurbulence
            animate={{ baseFrequency: 1.4 }}
            baseFrequency="1.2"
            initial={{ baseFrequency: 1.2 }}
            numOctaves={4}
            stitchTiles="stitch"
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            type="fractalNoise"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR slope="0.46" type="linear" />
            <feFuncG slope="0.46" type="linear" />
            <feFuncB slope="0.46" type="linear" />
            <feFuncA slope="0.37" type="linear" />
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR intercept="-0.23" slope="1.47" type="linear" />
            <feFuncG intercept="-0.23" slope="1.47" type="linear" />
            <feFuncB intercept="-0.23" slope="1.47" type="linear" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>

    {/* Animated Grid Lines */}
    <svg
      aria-hidden="true"
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
        <pattern
          height="100"
          id="grid"
          patternUnits="userSpaceOnUse"
          width="100"
        >
          <motion.path
            animate={{ strokeDashoffset: 12 }}
            d="M 100 0 L 0 0 0 100"
            fill="none"
            initial={{ strokeDashoffset: 0 }}
            stroke="currentColor"
            strokeDasharray="6 6"
            strokeWidth="0.5"
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </pattern>
        <linearGradient id="gridFade" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="30%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="fadeMask">
          <rect fill="url(#gridFade)" height="100%" width="100%" />
        </mask>
      </defs>
      <rect
        fill="url(#grid)"
        height="100%"
        mask="url(#fadeMask)"
        width="100%"
      />
    </svg>
  </>
));

StaticBackgrounds.displayName = "StaticBackgrounds";

const HomeContent = memo(() => (
  <div
    style={{
      position: "relative",
      zIndex: 1,
      maxWidth: "980px",
      margin: "0 auto",
    }}
  >
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
));

HomeContent.displayName = "HomeContent";

// Only the interactive cells component that depends on activeCells
const InteractiveCells = memo<{
  activeCells: Map<string, number>;
  cellSize: number;
}>(({ activeCells, cellSize }) => (
  <svg
    aria-hidden="true"
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
          <g key={cellKey}>
            <defs>
              <clipPath id={`clip-${cellKey}`}>
                <rect height={cellSize} width={cellSize} x={x} y={y} />
              </clipPath>
            </defs>
            <motion.rect
              animate={{ opacity: 0.5, transition: { duration: 0.2 } }}
              clipPath={`url(#clip-${cellKey})`}
              exit={{
                opacity: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
              fill="white"
              filter="url(#noise-filter)"
              height={cellSize}
              initial={{ opacity: 0 }}
              width={cellSize}
              x={x}
              y={y}
            />
          </g>
        );
      })}
    </AnimatePresence>
  </svg>
));

InteractiveCells.displayName = "InteractiveCells";

const InteractiveGrid = memo(() => {
  const [activeCells, setActiveCells] = useState<Map<string, number>>(
    new Map()
  );
  const cellSize = 100;
  const CELL_ACTIVE_DURATION_MS = 400;
  const CLEANUP_INTERVAL_MS = 50;

  const SPRING = {
    mass: 0.1,
  };

  const springX = useSpring(0, SPRING);
  const springY = useSpring(0, SPRING);

  useMotionValueEvent(springX, "change", (x) => {
    const y = springY.get();
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    const cellKey = `${row}-${col}`;

    setActiveCells((prev) => {
      if (prev.has(cellKey)) {
        return prev;
      }
      const newMap = new Map(prev);
      newMap.set(cellKey, Date.now());
      return newMap;
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setActiveCells((prev) => {
        let hasExpiredCells = false;
        for (const [, timestamp] of prev.entries()) {
          if (now - timestamp > CELL_ACTIVE_DURATION_MS) {
            hasExpiredCells = true;
            break;
          }
        }

        if (!hasExpiredCells) {
          return prev;
        }

        const newMap = new Map(prev);
        for (const [key, timestamp] of newMap.entries()) {
          if (now - timestamp > CELL_ACTIVE_DURATION_MS) {
            newMap.delete(key);
          }
        }
        return newMap;
      });
    }, CLEANUP_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onPointerMove={(e) => {
        springX.set(e.clientX);
        springY.set(e.clientY);
      }}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        paddingTop: "clamp(100px, 15vw, 150px)",
        paddingLeft: "max(24px, 5vw)",
        paddingRight: "max(24px, 5vw)",
        backgroundColor: "var(--mix-card-15-bg)",
      }}
    >
      <StaticBackgrounds />
      <InteractiveCells activeCells={activeCells} cellSize={cellSize} />
      <HomeContent />
    </div>
  );
});

InteractiveGrid.displayName = "InteractiveGrid";

export default function HomeClient({ pageTree }: HomeClientProps) {
  return (
    <>
      <MemoizedSiteHeader pageTree={pageTree} />
      <InteractiveGrid />
      <SiteFooter />
    </>
  );
}
