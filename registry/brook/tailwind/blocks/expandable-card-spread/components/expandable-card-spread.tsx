"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
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
              <div
                className={`flex items-center justify-center gap-0 ${
                  isExpanded ? "-translate-x-1/2 fixed bottom-[90px] left-1/2 h-auto flex-row" : ""
                }`}
              >
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
                            className={`flex cursor-pointer flex-col items-start justify-end border-none first:ml-0 focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2 ${
                              isExpanded
                                ? "-ml-[120px] h-[210px] w-[170px] p-3"
                                : "-ml-[55px] lg:-ml-[60px] h-[195px] w-[155px] p-3.5 lg:h-[290px] lg:w-[230px] lg:p-6"
                            }`}
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
                                type: prefersReducedMotion ? "tween" : "spring",
                                duration: prefersReducedMotion ? 0 : undefined,
                                bounce: isExpanded ? 0 : 0.15,
                              },
                            }}
                          />
                        }
                      >
                        <motion.div
                          className={`rounded-full bg-white/25 ${isExpanded ? "mb-1.5 h-5 w-5" : "mb-2 h-5 w-5 lg:mb-3 lg:h-8 lg:w-8"}`}
                          layoutId={`spread-circle-${card.id}`}
                          transition={{ layout: { type: "spring", bounce: 0 } }}
                        />
                        <motion.h3
                          className={`whitespace-pre-line text-left font-medium tracking-[-0.01em] ${
                            isExpanded ? "text-[0.9rem] leading-[1.2]" : "text-[1rem] leading-[1.3] lg:text-[1.4rem]"
                          }`}
                          layoutId={`spread-title-${card.id}`}
                          style={{ color: "oklch(0.75 0 0)" }}
                          transition={{ layout: { type: "spring", bounce: 0 } }}
                        >
                          {card.title}
                        </motion.h3>
                      </Dialog.Trigger>

                      <Dialog.Portal keepMounted>
                        {isOpen ? (
                          <div
                            className="pointer-events-none fixed inset-0 bottom-10 flex items-center justify-center"
                            key={`positioner-${card.id}`}
                          >
                            <Dialog.Popup
                              render={
                                <motion.li
                                  className="pointer-events-auto flex min-h-[500px] w-[400px] flex-col items-start justify-end gap-3 p-6"
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
                                      type: prefersReducedMotion ? "tween" : "spring",
                                      duration: prefersReducedMotion ? 0 : undefined,
                                      bounce: 0.15,
                                    },
                                  }}
                                />
                              }
                            >
                              <motion.div
                                className="mb-[26px] h-[140px] w-[140px] self-center rounded-full bg-white/25"
                                layoutId={`spread-circle-${card.id}`}
                                transition={{ layout: { type: "spring", bounce: 0 } }}
                              />
                              <motion.h2
                                className="m-0 whitespace-pre-line text-left font-medium text-4xl leading-[1.1] tracking-[-0.02em]"
                                layoutId={`spread-title-${card.id}`}
                                style={{ color: "oklch(0.75 0 0)" }}
                                transition={{ layout: { type: "spring", bounce: 0 } }}
                              >
                                {card.title}
                              </motion.h2>

                              <motion.p
                                animate={{ opacity: 1, y: 0 }}
                                className="m-0 text-base leading-[1.8] opacity-80"
                                exit={{ opacity: 0, y: 8 }}
                                initial={{
                                  opacity: prefersReducedMotion ? 1 : 0,
                                  y: prefersReducedMotion ? 0 : 16,
                                }}
                                style={{ color: "oklch(0.75 0 0)" }}
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
    </section>
  );
}
