"use client";

import { Dialog } from "@base-ui/react/dialog";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
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

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export function ExpandableCardSpread({ data }: ExpandableCardSpreadProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const isExpanded = expandedId !== null;

  if (isMobile) {
    return <MobileStack cards={data.cards} />;
  }

  return (
    <div className={styles.container}>
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
    </div>
  );
}
