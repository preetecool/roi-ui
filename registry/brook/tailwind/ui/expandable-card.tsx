"use client";
import { Dialog } from "@base-ui/react/dialog";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils-tailwind";

type ExpandableCardItem = {
  id: string | number;
  imageSrc: string;
  alt: string;
  cardHeading: string;
  content?: React.ReactNode;
};

type ExpandableCardProps = {
  item: ExpandableCardItem;
  className?: string;
};

function ExpandableCard({ item, className }: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("relative h-fit w-fit", className)}>
      <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
        <AnimatePresence>
          {isOpen ? (
            <Dialog.Backdrop
              hidden={undefined}
              key="overlay"
              render={
                <motion.div
                  animate={{
                    opacity: 0.99,
                  }}
                  className="fixed inset-0 z-[101] min-h-dvh bg-background"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.1,
                    duration: prefersReducedMotion ? 0 : 0.25,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                />
              }
            />
          ) : null}
        </AnimatePresence>
        <Dialog.Portal keepMounted>
          <AnimatePresence>
            {isOpen ? (
              <div
                className="pointer-events-none fixed inset-0 z-[9999] flex max-h-full items-center justify-center overflow-y-auto"
                key="positioner"
              >
                <Dialog.Popup
                  hidden={undefined}
                  render={
                    <motion.div
                      className={cn(
                        "fixed top-[5vh] h-dvh w-full max-w-[960px] overflow-hidden",
                        "bg-[var(--mix-card-15-bg)] p-0 shadow-[inset_0_0_0_0.5px_oklch(from_var(--border)_l_c_h/0.6)]",
                        "pointer-events-auto flex flex-col items-center gap-[16px]",
                        "transform-none animate-none opacity-100 transition-none"
                      )}
                      layoutId={`card-${item.id}`}
                      style={{
                        borderRadius: "32px",
                        overflow: "hidden",
                      }}
                    />
                  }
                >
                  <ScrollArea.Root className="relative h-full w-full">
                    <ScrollArea.Viewport
                      className={cn(
                        "h-full w-full overscroll-contain",
                        "before:[--scroll-area-overflow-y-start:inherit] after:[--scroll-area-overflow-y-end:inherit]",
                        "before:content-[''] after:content-['']",
                        "before:block after:block",
                        "before:absolute after:absolute",
                        "before:left-0 after:left-0",
                        "before:w-full after:w-full",
                        "before:pointer-events-none after:pointer-events-none",
                        "before:rounded-md after:rounded-md",
                        "before:transition-[height] after:transition-[height]",
                        "before:duration-100 after:duration-100",
                        "before:ease-out after:ease-out",
                        "before:z-10 after:z-10",
                        "before:top-0 after:bottom-0",
                        "before:bg-[linear-gradient(to_bottom,oklch(from_var(--background)_l_c_h_/_0.7),transparent)]",
                        "after:bg-[linear-gradient(to_top,var(--background)_0%,var(--background)_30%,transparent_100%)]",
                        "before:[height:min(40px,var(--scroll-area-overflow-y-start))]",
                        "after:[height:min(10vh,var(--scroll-area-overflow-y-end,10vh))]"
                      )}
                    >
                      <ScrollArea.Content
                        className={cn(
                          "flex w-full flex-col items-center gap-[16px]",
                          "px-[max(1.5rem,env(safe-area-inset-left))] pb-[max(12vh,env(safe-area-inset-bottom))] pt-0"
                        )}
                      >
                        <div className="sticky top-8 z-20 mr-2 flex h-11 w-11 cursor-pointer items-center justify-center self-end rounded-full">
                          <Dialog.Close
                            aria-label="Close"
                            className={cn(
                              "z-20 p-2 rounded-full shadow-[inset_0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.7)]",
                              "flex cursor-pointer items-center justify-center bg-[var(--background)] text-[var(--muted-foreground)] transition-colors duration-150 ease-out md:bg-transparent",
                              "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                              "focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
                              "motion-reduce:transition-none"
                            )}
                            render={
                              <motion.button
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, display: "flex" }}
                                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                                transition={{
                                  type: "spring",
                                  duration: prefersReducedMotion ? 0 : 0.3,
                                  delay: prefersReducedMotion ? 0 : 0.1,
                                }}
                              />
                            }
                          >
                            <X height={21} strokeWidth={2} width={21} />
                          </Dialog.Close>
                        </div>

                        <motion.img
                          alt={item.alt}
                          className="h-auto w-full max-w-[700px] object-contain"
                          height={600}
                          layoutId={`image-${item.id}`}
                          src={item.imageSrc}
                          style={{ borderRadius: "24px" }}
                          width={600}
                        />

                        <motion.div className="mx-auto flex h-auto w-full max-w-[700px] flex-col items-start gap-9 pt-7 pr-0 pb-0 pl-0 text-left leading-[2]">
                          <motion.div layoutId={`heading-${item.id}`}>
                            <h3 className="m-0 w-full self-start font-medium text-[48px] text-[var(--foreground)] leading-[1.5] tracking-[-0.02em]">
                              {item.cardHeading}
                            </h3>
                          </motion.div>

                          <motion.div
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="text-[oklch(from_var(--secondary-foreground)_l_c_h_/_0.8)]"
                            exit={{
                              opacity: 0,
                              display: "block",
                              y: prefersReducedMotion ? 0 : -40,
                              scale: prefersReducedMotion ? 1 : 0.92,
                            }}
                            initial={{
                              opacity: prefersReducedMotion ? 1 : 0,
                              y: prefersReducedMotion ? 0 : -40,
                              scale: prefersReducedMotion ? 1 : 0.92,
                            }}
                            transition={{
                              delay: prefersReducedMotion ? 0 : 0.1,
                              duration: prefersReducedMotion ? 0 : 0.3,
                              type: "spring",
                              bounce: 0,
                            }}
                          >
                            {item.content}
                          </motion.div>
                        </motion.div>
                      </ScrollArea.Content>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                      className={cn(
                        "flex w-1.5 justify-center rounded-sm",
                        "m-[2px] mt-[calc(32px+0.5vh)]",
                        "touch-none select-none",
                        "opacity-0 pointer-events-none",
                        "transition-opacity duration-150 ease-out delay-[800ms]",
                        "data-[scrolling]:opacity-100 data-[scrolling]:pointer-events-auto data-[scrolling]:delay-0"
                      )}
                      orientation="vertical"
                    >
                      <ScrollArea.Thumb
                        className={cn(
                          "w-full rounded",
                          "bg-[oklch(from_var(--border)_l_c_h_/_0.5)]",
                          "transition-colors duration-150 ease-out",
                          "hover:bg-[oklch(from_var(--border)_l_c_h_/_0.8)]"
                        )}
                      />
                    </ScrollArea.Scrollbar>
                  </ScrollArea.Root>
                </Dialog.Popup>
              </div>
            ) : null}
          </AnimatePresence>
        </Dialog.Portal>

        <Dialog.Trigger
          render={
            <motion.button
              aria-label={`Expand ${item.cardHeading}`}
              className="group flex w-[320px] cursor-pointer flex-col items-center overflow-hidden bg-transparent p-0 shadow-[inset_0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.7)] focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2"
              layoutId={`card-${item.id}`}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "320px",
                overflow: "hidden",
                borderRadius: "24px",
                position: "relative",
              }}
            />
          }
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.7)]" />
          <motion.img
            alt={item.alt}
            className="h-[320px] w-full object-cover"
            height={300}
            layoutId={`image-${item.id}`}
            src={item.imageSrc}
            style={{ borderRadius: "24px" }}
            width={300}
          />

          <div className="flex w-full items-center justify-center p-4">
            <motion.div layoutId={`heading-${item.id}`}>
              <h3 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap font-medium text-2xl text-[var(--secondary-foreground)] leading-[1.5] tracking-[-0.02em] transition-colors duration-150 ease-out group-hover:text-[var(--foreground)] motion-reduce:transition-none">
                {item.cardHeading}
              </h3>
            </motion.div>

            <motion.div className="ml-auto flex h-9 min-h-9 w-9 min-w-9 shrink-0 items-center justify-center rounded-full text-[var(--muted-foreground)] shadow-[inset_0_0_0_0.5px_oklch(from_var(--border)_l_c_h_/_0.7)] transition-colors duration-150 ease-out hover:bg-[var(--card)] hover:text-[var(--foreground)] group-hover:bg-[var(--card)] group-hover:text-[var(--foreground)] motion-reduce:transition-none">
              <Plus height={21} strokeWidth={2} width={21} />
            </motion.div>
          </div>
        </Dialog.Trigger>
      </Dialog.Root>
    </div>
  );
}

export { ExpandableCard };
export type { ExpandableCardItem, ExpandableCardProps };
