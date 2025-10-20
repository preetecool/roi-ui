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
  image: "/art-brook.png",
};

export const HomeAnimatedCard = () => {
  const [visible, setVisible] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [ref, bounds] = useMeasure();
  const CARD_OPEN_DELAY_MS = 2150;
  const EASE_START = 0.19;
  const EASE_MID = 0.22;

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 0);

    setTimeout(() => {
      setCardOpen(true);
    }, CARD_OPEN_DELAY_MS);
  }, []);

  return (
    <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0 }}>
      <AnimatePresence>
        <motion.div
          animate={{ height: bounds.height, y: 0, opacity: 1 }}
          className={styles.container}
          initial={{ rotate: -4, y: 40, opacity: 0 }}
          transition={{
            height: { duration: 0.4, type: "spring", bounce: 0 },
            y: { duration: 0.8, ease: [EASE_START, 1, EASE_MID, 1], delay: 0 },
            opacity: {
              duration: 0.8,
              ease: [EASE_START, 1, EASE_MID, 1],
              delay: 0,
            },
          }}
        >
          <div ref={ref}>
            {visible && cardOpen && (
              <motion.div
                className={styles.cardExpanded}
                layoutId="card"
                style={{ borderRadius: "24px" }}
              >
                <motion.img
                  alt={cardData.title}
                  className={styles.imageExpanded}
                  layoutId="image"
                  src={cardData.image}
                  style={{ borderRadius: "12px" }}
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

            {visible && !cardOpen && (
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
                  layoutId="image"
                  src={cardData.image}
                  style={{ borderRadius: "12px" }}
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
