"use client";

import {
  animate,
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
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

const CARD_OFFSET = 8;
const SCALE_FACTOR = 0.05;

export function MobileStack({ cards }: MobileStackProps) {
  const [cardOrder, setCardOrder] = useState(() => cards.map((c) => c.id));
  const [animatingCardId, setAnimatingCardId] = useState<number | null>(null);
  const animatingRef = useRef(false);
  const x = useMotionValue(0);
  const sendBackProgress = useMotionValue(0);

  const orderedCards = cardOrder.map((id) => cards.find((c) => c.id === id)!);
  const backIndex = orderedCards.length - 1;
  const backScale = 1 - backIndex * SCALE_FACTOR;
  const backY = backIndex * CARD_OFFSET;

  // Derive scale and y from the send-back animation progress
  const animatingScale = useTransform(sendBackProgress, [0, 1], [1, backScale]);
  const animatingY = useTransform(sendBackProgress, [0, 1], [0, backY]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 100;

    if (Math.abs(info.offset.x) > swipeThreshold && !animatingRef.current) {
      animatingRef.current = true;
      const topCardId = cardOrder[0];
      setAnimatingCardId(topCardId);

      // Reorder cards immediately so all cards start transitioning
      setCardOrder((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });

      // Animate x back to 0 and progress from 0 to 1
      const springConfig = { type: "spring", stiffness: 300, damping: 30 } as const;
      animate(x, 0, springConfig);
      animate(sendBackProgress, 1, springConfig).then(() => {
        x.set(0);
        sendBackProgress.set(0);
        setAnimatingCardId(null);
        animatingRef.current = false;
      });
    } else {
      // Snap back
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mobileStack}>
        {orderedCards.map((card, index) => {
          const isTopCard = index === 0;
          const isAnimatingToBack = card.id === animatingCardId;
          const stackIndex = orderedCards.length - 1 - index;

          const cardZIndex = isAnimatingToBack ? 0 : stackIndex;

          return (
            <motion.div
              animate={{
                scale: 1 - index * SCALE_FACTOR,
                y: index * CARD_OFFSET,
              }}
              className={styles.mobileCard}
              drag={isTopCard && !animatingCardId ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              initial={false}
              key={card.id}
              onDragEnd={isTopCard ? handleDragEnd : undefined}
              style={{
                backgroundColor: card.color,
                color: card.textColor || "#ffffff",
                zIndex: cardZIndex,
                cursor: isTopCard && !animatingCardId ? "grab" : "auto",
                x: isAnimatingToBack || (isTopCard && !animatingCardId) ? x : 0,
                scale: isAnimatingToBack ? animatingScale : undefined,
                y: isAnimatingToBack ? animatingY : undefined,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              whileDrag={{ cursor: "grabbing" }}
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
