"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import styles from "./expandable-card-spread.module.css";
import { MobileStack } from "./mobile-stack";

type CardData = {
  id: number;
  title: string;
  color: string;
  textColor?: string;
  description: string;
};

type ExpandableCardSpreadProps = {
  data: {
    cards: CardData[];
  };
};

export function ExpandableCardSpread({ data }: ExpandableCardSpreadProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(640);

  const isExpanded = expandedId !== null;

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {isMobile ? (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.95 }}
            key="stack"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <MobileStack cards={data.cards} />
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.95 }}
            key="spread"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={`${styles.spreadLayout} ${isExpanded ? styles.spreadLayoutSmall : ""}`}>
              {data.cards.map((card, index) => {
                const isOpen = expandedId === card.id;
                return (
                  <Dialog.Root
                    key={`root-${card.id}`}
                    modal={false}
                    onOpenChange={(open) => {
                      if (!open) {
                        setExpandedId(null);
                      }
                    }}
                    open={isOpen}
                  >
                    <Dialog.Trigger
                      nativeButton={false}
                      render={
                        <motion.li
                          aria-label={`Expand ${card.title}`}
                          className={`${styles.spreadCard} ${isExpanded ? styles.spreadCardSmall : ""}`}
                          layoutId={`spread-card-${card.id}`}
                          onClick={() => {
                            setExpandedId(card.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setExpandedId(card.id);
                            }
                          }}
                          style={{
                            backgroundColor: card.color,
                            borderRadius: 20,
                            color: card.textColor || "#ffffff",
                            zIndex: index,
                          }}
                          transition={{
                            layout: {
                              type: "spring",
                              bounce: 0.25,
                            },
                          }}
                        />
                      }
                    >
                      <motion.div
                        className={`${styles.circle} ${isExpanded ? styles.circleSmall : ""}`}
                        layoutId={`spread-circle-${card.id}`}
                      />
                      <motion.h3
                        className={`${styles.cardTitle} ${isExpanded ? styles.cardTitleSmall : ""}`}
                        layoutId={`spread-title-${card.id}`}
                      >
                        {card.title}
                      </motion.h3>
                    </Dialog.Trigger>

                    <Dialog.Portal keepMounted>
                      {isOpen ? (
                        <div className={styles.popupPositioner} key={`positioner-${card.id}`}>
                          <Dialog.Popup
                            hidden={undefined}
                            render={
                              <motion.li
                                className={styles.expandedCard}
                                layoutId={`spread-card-${card.id}`}
                                onClick={() => setExpandedId(null)}
                                style={{
                                  borderRadius: 20,
                                  backgroundColor: card.color,
                                  color: card.textColor || "#ffffff",
                                  zIndex: index,
                                  cursor: "pointer",
                                }}
                                transition={{
                                  layout: {
                                    type: "spring",
                                    bounce: 0.15,
                                  },
                                }}
                              />
                            }
                          >
                            <motion.div className={styles.circleExpanded} layoutId={`spread-circle-${card.id}`} />
                            <motion.h2 className={styles.expandedTitle} layoutId={`spread-title-${card.id}`}>
                              {card.title}
                            </motion.h2>

                            <motion.p
                              animate={{ opacity: 1, y: 0 }}
                              className={styles.expandedDescription}
                              exit={{ opacity: 0, y: 8 }}
                              initial={{
                                opacity: prefersReducedMotion ? 1 : 0,
                                y: prefersReducedMotion ? 0 : 16,
                              }}
                              transition={{
                                delay: prefersReducedMotion ? 0 : 0.15,
                                duration: prefersReducedMotion ? 0 : 0.3,
                                type: "spring",
                                bounce: 0,
                              }}
                            >
                              {card.description}
                            </motion.p>
                          </Dialog.Popup>
                        </div>
                      ) : null}
                    </Dialog.Portal>
                  </Dialog.Root>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
