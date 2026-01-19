"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Badge, BadgeIcon } from "@/registry/brook/ui/badge/badge";
import styles from "./home-animated-badge.module.css";
import { Spinner } from "./spinner";

export function HomeAnimatedBadge() {
  const [phase, setPhase] = useState<"loading" | "success">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev === "loading" ? "success" : "loading"));
    }, 2000);

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
          {/* Spinner - always mounted, fades out */}
          <motion.div
            animate={{
              opacity: isLoading ? 1 : 0,
              scale: isLoading ? 1 : 0.8,
              filter: isLoading ? "blur(0px)" : "blur(4px)",
            }}
            className={styles.spinnerOverlay}
            transition={{ duration: 0.2, delay: isLoading ? 0 : 0.1 }}
          >
            <Spinner size={16} />
          </motion.div>

          {/* Success content - drives the layout */}
          <motion.div
            animate={{
              width: isLoading ? 16 : "auto",
              opacity: isLoading ? 0 : 1,
            }}
            className={styles.successContent}
            transition={{ duration: 0.4 }}
          >
            <BadgeIcon>
              <motion.div
                animate={{
                  opacity: isLoading ? 0 : 1,
                  scale: isLoading ? 0.5 : 1,
                  x: isLoading ? 8 : 0,
                }}
                className={styles.checkBackground}
                transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
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
                    animate={{
                      pathLength: isLoading ? 0 : 1,
                      opacity: isLoading ? 0 : 1,
                    }}
                    d="m3 8 3 3 7-7"
                    transition={{ duration: 0.2 }}
                  />
                </svg>
              </motion.div>
            </BadgeIcon>
            <motion.div
              animate={{
                opacity: isLoading ? 0 : 1,
                x: isLoading ? -8 : 0,
                scale: isLoading ? 0.85 : 1,
                filter: isLoading ? "blur(4px)" : "blur(0px)",
              }}
              className={styles.successText}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
              Success
            </motion.div>
          </motion.div>
        </div>
      </Badge>
    </div>
  );
}
