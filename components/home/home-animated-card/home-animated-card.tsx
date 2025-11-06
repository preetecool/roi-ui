"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import styles from "./home-animated-card.module.css";

const cardData = {
  title: "Luna",
  description: "Beautiful Nights",
  longDescription:
    "Gazing at the night sky capturing the essence of tranquility.",
  image: "/scene_00.png",
};

type HomeAnimatedCardProps = {
  isExpanded?: boolean;
};

export const HomeAnimatedCard = ({
  isExpanded = false,
}: HomeAnimatedCardProps) => {
  const [visible, setVisible] = useState(false);
  const [ref, bounds] = useMeasure();
  const EASE_START = 0.19;
  const EASE_MID = 0.22;

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0 }}>
      <AnimatePresence>
        <motion.div
          animate={{
            height: bounds.height,
            transform: "translateY(0px) rotate(0deg)",
            opacity: 1,
          }}
          className={styles.container}
          initial={{ transform: "translateY(40px) rotate(-4deg)", opacity: 0 }}
          transition={{
            height: { duration: 0.4, type: "spring", bounce: 0 },
            transform: {
              duration: 0.8,
              ease: [EASE_START, 1, EASE_MID, 1],
              delay: 0,
            },
            opacity: {
              duration: 0.8,
              ease: [EASE_START, 1, EASE_MID, 1],
              delay: 0,
            },
          }}
        >
          <div ref={ref}>
            {visible && isExpanded && (
              <motion.div
                className={styles.cardExpanded}
                layoutId="card"
                style={{ borderRadius: "24px" }}
              >
                <motion.img
                  alt={cardData.title}
                  className={styles.imageExpanded}
                  height={260}
                  layoutId="image"
                  src={cardData.image}
                  style={{ borderRadius: "12px" }}
                  width={300}
                />
                <motion.div
                  className={styles.wrapperExpanded}
                  layoutId="text-wrapper"
                >
                  <motion.h2 className={styles.titleExpanded} layoutId="title">
                    {cardData.title}
                  </motion.h2>
                  <motion.p
                    className={`${styles.description} ${styles.descriptionExpanded}`}
                    layoutId="description"
                  >
                    {cardData.description}
                  </motion.p>
                  <motion.p
                    animate={{ opacity: 1 }}
                    className={styles.longDescription}
                    initial={{ opacity: 0 }}
                    layout
                  >
                    {cardData.longDescription}
                  </motion.p>
                </motion.div>
              </motion.div>
            )}

            {visible && !isExpanded && (
              <motion.div
                animate={{ opacity: 1 }}
                className={styles.cardCollapsed}
                initial={{ opacity: 0 }}
                layoutId="card"
                style={{ borderRadius: "24px" }}
              >
                <motion.img
                  alt={cardData.title}
                  className={styles.imageCollapsed}
                  height={60}
                  layoutId="image"
                  src={cardData.image}
                  style={{ borderRadius: "12px" }}
                  width={60}
                />
                <motion.div
                  className={styles.wrapperCollapsed}
                  layoutId="text-wrapper"
                >
                  <motion.h2 className={styles.titleCollapsed} layoutId="title">
                    {cardData.title}
                  </motion.h2>
                  <motion.p
                    className={styles.description}
                    layoutId="description"
                  >
                    {cardData.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
};
