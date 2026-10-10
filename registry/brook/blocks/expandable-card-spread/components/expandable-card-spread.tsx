"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Fragment, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import styles from "./expandable-card-spread.module.css";
import { MobileStack } from "./mobile-stack";

const CARD_LAYOUT_TRANSITION = { type: "spring", duration: 0.8, bounce: 0 } as const;

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

function CardTitleLines({ card, reducedMotion }: { card: CardData; reducedMotion: boolean | null }) {
  const lines = card.title.split("\n");
  const layoutTransition = reducedMotion ? { duration: 0 } : CARD_LAYOUT_TRANSITION;

  return lines.map((line, index) => (
    <Fragment key={`${card.id}-${index}`}>
      {/* Exclude the heading's changing line height from the shared glyph bounds. */}
      <motion.span
        layoutId={`spread-title-${card.id}-${index}`}
        style={{ display: "inline-block", lineHeight: 1 }}
        transition={{ layout: layoutTransition }}
      >
        {line}
      </motion.span>
      {index < lines.length - 1 ? "\n" : null}
    </Fragment>
  ));
}

type SpreadCardProps = {
  card: CardData;
  index: number;
  isExpanded: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  prefersReducedMotion: boolean | null;
};

function SpreadCard({ card, index, isExpanded, isOpen, onOpenChange, prefersReducedMotion }: SpreadCardProps) {
  const dialogActionsRef = useRef<Dialog.Root.Actions>(null);
  const textColor = card.textColor || "#ffffff";
  const descriptionStart = prefersReducedMotion
    ? { y: "calc(0% + 0px)", filter: "blur(0px)" }
    : { y: "calc(100% + 24px)", filter: "blur(4px)" };
  const layoutTransition = prefersReducedMotion ? { duration: 0 } : CARD_LAYOUT_TRANSITION;

  return (
    <Dialog.Root
      actionsRef={dialogActionsRef}
      modal={false}
      onOpenChange={(open, eventDetails) => {
        if (!open) {
          // Motion owns the closing phase; hiding the popup early flashes the background.
          eventDetails.preventUnmountOnClose();
        }
        onOpenChange(open);
      }}
      open={isOpen}
    >
      <Dialog.Trigger
        nativeButton={false}
        render={
          <motion.div
            aria-label={`Expand ${card.title}`}
            className={`${styles.spreadCard} ${isExpanded ? styles.spreadCardSmall : ""}`}
            layoutId={`spread-card-${card.id}`}
            style={{
              backgroundColor: card.color,
              borderRadius: 20,
              color: textColor,
              zIndex: index,
            }}
            transition={{ layout: layoutTransition }}
          />
        }
      >
        <motion.div
          className={`${styles.circle} ${isExpanded ? styles.circleSmall : ""}`}
          layoutId={`spread-circle-${card.id}`}
          transition={{ layout: layoutTransition }}
        />
        <h3
          className={`${styles.cardTitle} ${isExpanded ? styles.cardTitleSmall : ""}`}
          style={{ color: "oklch(0.75 0 0)" }}
        >
          <CardTitleLines card={card} reducedMotion={prefersReducedMotion} />
        </h3>
      </Dialog.Trigger>

      <Dialog.Portal keepMounted>
        <AnimatePresence
          onExitComplete={() => {
            if (!isOpen) {
              dialogActionsRef.current?.unmount();
            }
          }}
        >
          {isOpen ? (
            <motion.div className={styles.popupPositioner} key={`positioner-${card.id}`} layoutRoot>
              <Dialog.Popup
                aria-label={card.title}
                render={
                  <motion.div
                    className={styles.expandedCard}
                    layoutId={`spread-card-${card.id}`}
                    onClick={() => dialogActionsRef.current?.close()}
                    style={{
                      borderRadius: 20,
                      backgroundColor: card.color,
                      color: textColor,
                      zIndex: index,
                      cursor: "pointer",
                    }}
                    transition={{ layout: layoutTransition }}
                  />
                }
              >
                <motion.div
                  className={styles.circleExpanded}
                  layoutId={`spread-circle-${card.id}`}
                  transition={{ layout: layoutTransition }}
                />
                <h2 className={styles.expandedTitle} style={{ color: "oklch(0.75 0 0)" }}>
                  <CardTitleLines card={card} reducedMotion={prefersReducedMotion} />
                </h2>

                <motion.p
                  animate={{ opacity: 1, y: "calc(0% + 0px)", filter: "blur(0px)" }}
                  className={styles.expandedDescription}
                  exit={{
                    opacity: 0,
                    transition: {
                      delay: 0,
                      duration: prefersReducedMotion ? 0.08 : 0.12,
                      ease: "easeOut",
                    },
                  }}
                  initial={{
                    opacity: 0,
                    ...descriptionStart,
                  }}
                  style={{ color: "oklch(0.75 0 0)" }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.06,
                    duration: prefersReducedMotion ? 0.12 : 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {card.description}
                </motion.p>
              </Dialog.Popup>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ExpandableCardSpread({ data }: ExpandableCardSpreadProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile(640);

  const isExpanded = expandedId !== null;

  return (
    <section aria-labelledby="expandable-card-heading" className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading} id="expandable-card-heading">
          Expandable Card Spread
        </h2>
        <p className={styles.subheading}>
          Click on any card to expand and explore more details. Each card reveals additional content with smooth
          animations.
        </p>
      </div>
      <div className={styles.cardsWrapper}>
        <AnimatePresence mode="wait">
          {isMobile ? (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.95 }}
              key="stack"
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
            >
              <MobileStack cards={data.cards} />
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.95 }}
              key="spread"
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
            >
              <div className={`${styles.spreadLayout} ${isExpanded ? styles.spreadLayoutSmall : ""}`}>
                {data.cards.map((card, index) => (
                  <SpreadCard
                    card={card}
                    index={index}
                    isExpanded={isExpanded}
                    isOpen={expandedId === card.id}
                    key={card.id}
                    onOpenChange={(open) => {
                      if (open) {
                        setExpandedId(card.id);
                      } else {
                        setExpandedId((current) => {
                          if (current === card.id) {
                            return null;
                          }
                          return current;
                        });
                      }
                    }}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
