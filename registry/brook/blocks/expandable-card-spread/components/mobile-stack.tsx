"use client";

import { motion, type PanInfo } from "motion/react";
import { useState } from "react";
import styles from "./expandable-card-spread.module.css";

type CardData = {
  id: number;
  title: string;
  color: string;
  textColor?: string;
  description: string;
};

type MobileStackProps = {
  cards: CardData[];
};

const SWIPE_THRESHOLD = 100;

export function MobileStack({ cards }: MobileStackProps) {
  const [frontIndex, setFrontIndex] = useState(0);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      setFrontIndex((prev) => (prev + 1) % cards.length);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mobileStack}>
        {cards.map((card, i) => {
          const stackPosition = (i - frontIndex + cards.length) % cards.length;
          const isTopCard = stackPosition === 0;

          return (
            <motion.div
              animate={{
                scale: 1 - stackPosition * 0.03,
                x: stackPosition * (13 - stackPosition),
                y: stackPosition * 6,
                rotate: Math.sqrt(stackPosition) * 3,
              }}
              className={styles.mobileCard}
              drag={isTopCard ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              key={card.id}
              layout
              onDragEnd={isTopCard ? handleDragEnd : undefined}
              style={{
                backgroundColor: card.color,
                color: card.textColor || "#ffffff",
                zIndex: cards.length - stackPosition,
                cursor: isTopCard ? "grab" : "auto",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              whileDrag={{ cursor: "grabbing", scale: 1.02 }}
            >
              <div className={styles.circle} />
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.mobileDescription}>{card.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
