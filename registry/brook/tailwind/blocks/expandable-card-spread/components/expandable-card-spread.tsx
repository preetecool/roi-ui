"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { Fragment, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileStack } from "./mobile-stack";

const CARD_LAYOUT_TRANSITION = { type: "spring", duration: 0.65, bounce: 0 } as const;
const OPEN_CARD_Z_INDEX = 100;

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

function CardTitleLines({ card, crossfade = true }: { card: CardData; crossfade?: boolean }) {
  const lines = card.title.split("\n");

  return lines.map((line, index) => (
    <Fragment key={`${card.id}-${index}`}>
      {/* Exclude the heading's changing line height from the shared glyph bounds. */}
      <motion.span
        layoutCrossfade={crossfade}
        layoutId={`spread-title-${card.id}-${index}`}
        style={{ display: "inline-block", lineHeight: 1 }}
      >
        {line}
      </motion.span>
      {index < lines.length - 1 ? "\n" : null}
    </Fragment>
  ));
}

// A plain child of the card, so it scales up with it on the way in and follows it home on the way out. The rise
// rides the card's own spring, so both finish together and the text only travels up: a shorter rise ended early
// and the still-growing card pushed it back down.
const DESCRIPTION_MOTION = {
  initial: { opacity: 0, y: 110, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.9,
    filter: "blur(4px)",
    transition: { duration: 0.15, ease: "easeIn" },
  },
  transition: {
    y: CARD_LAYOUT_TRANSITION,
    opacity: { duration: 0.3, ease: [0.32, 0.72, 0, 1] },
    scale: { duration: 0.3, ease: [0.32, 0.72, 0, 1] },
    filter: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
  },
} as const;
const DESCRIPTION_REDUCED_MOTION = {
  initial: false,
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0 } },
} as const;

function CardDescription({ reducedMotion, text }: { reducedMotion: boolean | null; text: string }) {
  const motionProps = reducedMotion ? DESCRIPTION_REDUCED_MOTION : DESCRIPTION_MOTION;

  return (
    <motion.p {...motionProps} className="m-0 text-base leading-[1.8] opacity-80" style={{ color: "oklch(0.75 0 0)" }}>
      {text}
    </motion.p>
  );
}

type SpreadCardProps = {
  card: CardData;
  index: number;
  isExpanded: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  portalContainer: HTMLElement | null;
  prefersReducedMotion: boolean | null;
};

function SpreadCard({
  card,
  index,
  isExpanded,
  isOpen,
  onOpenChange,
  portalContainer,
  prefersReducedMotion,
}: SpreadCardProps) {
  const dialogActionsRef = useRef<Dialog.Root.Actions>(null);
  const textColor = card.textColor || "#ffffff";
  const layoutTransition = prefersReducedMotion ? { duration: 0 } : CARD_LAYOUT_TRANSITION;

  return (
    // One layout transition for every shared card element, the exiting popup included.
    <MotionConfig transition={{ layout: layoutTransition }}>
      <Dialog.Root
        actionsRef={dialogActionsRef}
        modal={false}
        onOpenChange={(open, eventDetails) => {
          if (!open) {
            // Motion owns the closing phase; hiding the popup early flashes the background.
            eventDetails.preventUnmountOnClose();
          }
          // Pressing another card would close this one on pointerdown and open that one on click: two renders a
          // frame apart that send every card toward the spread and back. Leave the switch to the click.
          if (eventDetails.reason === "outside-press" && portalContainer?.contains(eventDetails.event.target as Node)) {
            eventDetails.cancel();
            return;
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
            />
          }
        >
          <motion.div
            className={`rounded-full bg-white/25 ${isExpanded ? "mb-1.5 h-5 w-5" : "mb-2 h-5 w-5 lg:mb-3 lg:h-8 lg:w-8"}`}
            layoutId={`spread-circle-${card.id}`}
          />
          <h3
            className={`whitespace-pre-line text-left font-medium tracking-[-0.01em] ${
              isExpanded ? "text-[0.9rem] leading-[1.2]" : "text-[1rem] leading-[1.3] lg:text-[1.4rem]"
            }`}
            style={{ color: "oklch(0.75 0 0)" }}
          >
            <CardTitleLines card={card} />
          </h3>
        </Dialog.Trigger>

        <Dialog.Portal container={portalContainer} keepMounted>
          <AnimatePresence
            onExitComplete={() => {
              if (!isOpen) {
                dialogActionsRef.current?.unmount();
              }
            }}
          >
            {isOpen ? (
              // Portaled into the deck and dropped to the card's own zIndex on exit, so the closing
              // card stays behind higher cards while it crossfades back into the trigger. A body
              // portal paints above every card: the card slid over its neighbours, then sank.
              <motion.div
                className="pointer-events-none fixed inset-0 bottom-10 flex items-center justify-center"
                exit={{ zIndex: index, transition: { duration: 0 } }}
                key={`positioner-${card.id}`}
                layoutRoot
                style={{ zIndex: OPEN_CARD_Z_INDEX }}
              >
                <Dialog.Popup
                  aria-label={card.title}
                  render={
                    // Open without a crossfade: a half-faded popup ghosts the cards behind it.
                    <motion.div
                      className="pointer-events-auto flex min-h-[500px] w-[400px] flex-col items-start justify-end gap-3 overflow-hidden p-6 will-change-transform"
                      layoutCrossfade={false}
                      layoutId={`spread-card-${card.id}`}
                      onClick={() => dialogActionsRef.current?.close()}
                      style={{
                        borderRadius: 20,
                        backgroundColor: card.color,
                        color: textColor,
                        cursor: "pointer",
                      }}
                    />
                  }
                >
                  <motion.div
                    className="mb-[26px] h-[140px] w-[140px] self-center rounded-full bg-white/25"
                    layoutCrossfade={false}
                    layoutId={`spread-circle-${card.id}`}
                  />
                  <h2
                    className="m-0 whitespace-pre-line text-left font-medium text-4xl leading-[1.1] tracking-[-0.01em]"
                    style={{ color: "oklch(0.75 0 0)" }}
                  >
                    <CardTitleLines card={card} crossfade={false} />
                  </h2>

                  <CardDescription reducedMotion={prefersReducedMotion} text={card.description} />
                </Dialog.Popup>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>
    </MotionConfig>
  );
}

export function ExpandableCardSpread({ data }: ExpandableCardSpreadProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  // State, not a ref: the keepMounted portals resolve their container before refs attach.
  const [deck, setDeck] = useState<HTMLDivElement | null>(null);
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
              {/* Centred without transform: the popups portal in here and must stay viewport-fixed. */}
              <div
                className={`flex items-center justify-center gap-0 ${
                  isExpanded ? "fixed inset-x-0 bottom-[90px] mx-auto h-auto w-fit flex-row" : ""
                }`}
                ref={setDeck}
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
                    portalContainer={deck}
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
