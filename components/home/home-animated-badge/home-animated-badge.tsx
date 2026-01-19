"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Badge } from "@/registry/brook/ui/badge/badge";
import styles from "./home-animated-badge.module.css";
import { Spinner } from "./spinner";

export function HomeAnimatedBadge() {
  const [phase, setPhase] = useState<"loading" | "success">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev === "loading" ? "success" : "loading"));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const isLoading = phase === "loading";

  return (
    <div className={styles.badgeContainer}>
      <Badge
        className={styles.badge}
        render={<motion.div layout style={{ borderRadius: 12 }} />}
        size="lg"
        style={{ border: "0.5px solid oklch(1 0 0 / 0.15)" }}
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
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
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
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <motion.div
              animate={{ scale: isLoading ? 0.9 : 1 }}
              className={styles.checkBackground}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
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
                  transition={{ duration: 0.2 }}
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
