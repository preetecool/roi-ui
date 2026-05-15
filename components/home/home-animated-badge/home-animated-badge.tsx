"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/registry/brook/ui/badge/badge";
import styles from "./home-animated-badge.module.css";
import { Spinner } from "./spinner";

export function HomeAnimatedBadge() {
  const [phase, setPhase] = useState<"loading" | "success">("loading");
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setPhase((prev) => (prev === "loading" ? "success" : "loading"));
    }, 3500);
    return () => clearInterval(interval);
  }, [isVisible]);

  const isLoading = phase === "loading";
  const stateTransition = shouldReduceMotion
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0, duration: 0.4 } as const);
  const checkPopTransition = shouldReduceMotion
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0.25, duration: 0.4 } as const);
  const pathTransition = shouldReduceMotion
    ? { duration: 0 }
    : ({ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] } as const);

  return (
    <div aria-hidden="true" className={styles.badgeContainer} data-paused={!isVisible} ref={containerRef}>
      <Badge
        className={styles.badge}
        render={<motion.div layout style={{ borderRadius: 12 }} />}
        size="lg"
        variant="success"
      >
        <div className={styles.content}>
          <motion.div
            animate={{
              opacity: isLoading ? 1 : 0,
              y: isLoading ? 0 : -12,
              filter: isLoading ? "blur(0px)" : "blur(4px)",
            }}
            className={`${styles.stateInner} ${isLoading ? "" : styles.stateHidden}`}
            layout="position"
            transition={stateTransition}
          >
            <Spinner size={16} />
            <span className={styles.processingText}>Processing</span>
          </motion.div>
          <motion.div
            animate={{
              opacity: isLoading ? 0 : 1,
              y: isLoading ? 12 : 0,
              filter: isLoading ? "blur(4px)" : "blur(0px)",
            }}
            className={`${styles.stateInner} ${isLoading ? styles.stateHidden : ""}`}
            layout="position"
            transition={stateTransition}
          >
            <motion.div
              animate={{ scale: isLoading ? 0.9 : 1 }}
              className={styles.checkBackground}
              transition={checkPopTransition}
            >
              <svg
                aria-hidden="true"
                className={styles.checkIcon}
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 16 16"
                width="16"
              >
                <motion.path
                  animate={{ pathLength: isLoading ? 0 : 1, pathOffset: 0 }}
                  d="m3 8 3 3 7-7"
                  strokeDasharray="0 1"
                  transition={pathTransition}
                />
              </svg>
            </motion.div>
            <span className={styles.stateText}>Success</span>
          </motion.div>
        </div>
      </Badge>
    </div>
  );
}
