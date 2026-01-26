"use client";

import { motion, type PanInfo } from "motion/react";
import { useState } from "react";

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
    <div className="relative mx-auto flex min-h-[600px] w-full max-w-[900px] flex-col items-center justify-center">
      <div className="relative flex h-[420px] w-full max-w-[320px] items-center justify-center">
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
              className="absolute flex h-[400px] w-[300px] cursor-grab touch-pan-y select-none flex-col items-start justify-end rounded-[20px] p-6 pb-14 active:cursor-grabbing"
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
              <div className="mb-3 h-8 w-8 rounded-full bg-white/25" />
              <h3 className="whitespace-pre-line text-left font-medium text-[1.4rem] leading-[1.3] tracking-[-0.01em]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.6] opacity-85">{card.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
