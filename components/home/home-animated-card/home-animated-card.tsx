"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import styles from "./home-animated-card.module.css";

const cardData = {
  title: "Luna",
  description: "Beautiful Nights",
  longDescription:
    "Gazing at the night sky capturing the essence of tranquility.",
  image: "/scene_00.svg",
};

type HomeAnimatedCardProps = {
  isExpanded?: boolean;
};

export const HomeAnimatedCard = ({
  isExpanded = false,
}: HomeAnimatedCardProps) => (
  <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0 }}>
    <div className={styles.container}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.cardExpanded}
            layoutId="card"
            style={{ borderRadius: "24px" }}
          >
            <motion.img
              alt={cardData.title}
              className={styles.imageExpanded}
              height={220}
              layoutId="image"
              src={cardData.image}
              style={{ borderRadius: "12px" }}
              width={260}
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

        {!isExpanded && (
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
              <motion.p className={styles.description} layoutId="description">
                {cardData.description}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </MotionConfig>
);
