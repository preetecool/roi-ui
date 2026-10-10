"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Fragment, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
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
            className={`flex cursor-pointer flex-col items-start justify-end border-none first:ml-0 focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2 ${
              isExpanded
                ? "-ml-[120px] h-[210px] w-[170px] p-3"
                : "-ml-[55px] lg:-ml-[60px] h-[195px] w-[155px] p-3.5 lg:h-[290px] lg:w-[230px] lg:p-6"
            }`}
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
          className={`rounded-full bg-white/25 ${isExpanded ? "mb-1.5 h-5 w-5" : "mb-2 h-5 w-5 lg:mb-3 lg:h-8 lg:w-8"}`}
          layoutId={`spread-circle-${card.id}`}
          transition={{ layout: layoutTransition }}
        />
        <h3
          className={`whitespace-pre-line text-left font-medium tracking-[-0.01em] ${
            isExpanded ? "text-[0.9rem] leading-[1.2]" : "text-[1rem] leading-[1.3] lg:text-[1.4rem]"
          }`}
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
            <motion.div
              className="pointer-events-none fixed inset-0 bottom-10 flex items-center justify-center"
              key={`positioner-${card.id}`}
              layoutRoot
            >
              <Dialog.Popup
                render={
                  <motion.div
                    className="pointer-events-auto flex min-h-[500px] w-[400px] flex-col items-start justify-end gap-3 overflow-hidden p-6"
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
                  className="mb-[26px] h-[140px] w-[140px] self-center rounded-full bg-white/25"
                  layoutId={`spread-circle-${card.id}`}
                  transition={{ layout: layoutTransition }}
                />
                <h2
                  className="m-0 whitespace-pre-line text-left font-medium text-4xl leading-[1.1] tracking-[-0.01em]"
                  style={{ color: "oklch(0.75 0 0)" }}
                >
                  <CardTitleLines card={card} reducedMotion={prefersReducedMotion} />
                </h2>

                <motion.p
                  animate={{ opacity: 1, y: "calc(0% + 0px)", filter: "blur(0px)" }}
                  className="m-0 text-base leading-[1.8] opacity-80"
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
    <section
      aria-labelledby="expandable-card-heading"
      className="relative mx-auto flex h-full w-full max-w-[900px] flex-col items-center pt-10"
    >
      <div className="w-full shrink-0 text-left">
        <h2
          className="m-0 mb-3 font-semibold text-4xl text-[var(--text-primary)] leading-tight tracking-tight"
          id="expandable-card-heading"
        >
          Expandable Card Spread
        </h2>
        <p className="m-0 max-w-[600px] text-[var(--text-tertiary)] text-lg leading-relaxed">
          Click on any card to expand and explore more details. Each card reveals additional content with smooth
          animations.
        </p>
      </div>
      <div className="flex min-h-[400px] w-full items-start justify-center pt-20">
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
              <div
                className={`flex items-center justify-center gap-0 ${
                  isExpanded ? "-translate-x-1/2 fixed bottom-[90px] left-1/2 h-auto flex-row" : ""
                }`}
              >
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
