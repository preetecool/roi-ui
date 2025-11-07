"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

export default function DialogFramerMotion() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <div className="relative">
        <motion.div
          className="absolute inset-0 z-0 border border-border bg-card"
          layoutId="wrapper"
          style={{ borderRadius: 8 }}
        />
        <Dialog.Trigger
          className="relative z-10 cursor-pointer border-none px-3 py-2 text-foreground"
          render={<motion.button layoutId="button" />}
        >
          Button
        </Dialog.Trigger>
      </div>

      <AnimatePresence>
        {open && (
          <Dialog.Backdrop
            className="fixed inset-0 z-[100] min-h-dvh bg-[oklch(from_var(--background)_l_c_h_/_0.8)]"
            hidden={undefined}
            key="overlay"
            render={
              <motion.div
                animate={{
                  opacity: 1,
                }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              />
            }
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <Dialog.Portal container={containerRef} keepMounted>
              <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="absolute inset-0 z-0 border border-border bg-card shadow-lg"
                  layoutId="wrapper"
                  style={{ borderRadius: 12 }}
                />
                <Dialog.Popup
                  className="relative z-10 h-48 w-[364px] rounded-xl bg-transparent p-4 outline-none"
                  hidden={undefined}
                >
                  <div className="flex h-full flex-col">
                    <Dialog.Title
                      className="m-0 mb-2 border-b-0 p-0 text-lg"
                      render={
                        <motion.span
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              duration: 0.3,
                              delay: 0.2,
                              type: "spring",
                              bounce: 0,
                            },
                          }}
                          exit={{
                            opacity: 0,
                            transition: {
                              duration: 0.15,
                              type: "spring",
                            },
                          }}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        />
                      }
                    >
                      Title
                    </Dialog.Title>
                    <Dialog.Description
                      className="m-0 flex-1"
                      render={
                        <motion.p
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              duration: 0.3,
                              delay: 0.2,
                              type: "spring",
                              bounce: 0,
                            },
                          }}
                          exit={{
                            opacity: 0,
                            transition: {
                              duration: 0.15,
                              type: "spring",
                            },
                          }}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        />
                      }
                    >
                      This is a description of the dialog.
                    </Dialog.Description>

                    <div className="mt-auto flex justify-end gap-3">
                      <Dialog.Close
                        className="cursor-pointer rounded-md border border-border bg-card px-3 py-2 text-foreground transition-colors hover:bg-accent"
                        render={
                          <motion.button
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              transition: {
                                duration: 0.3,
                                delay: 0.2,
                                type: "spring",
                                bounce: 0,
                              },
                            }}
                            exit={{
                              opacity: 0,
                              transition: {
                                duration: 0.15,
                                type: "spring",
                              },
                            }}
                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                          />
                        }
                      >
                        Close
                      </Dialog.Close>
                      <motion.button
                        className="cursor-pointer rounded-md border border-border bg-card px-3 py-2 text-foreground transition-colors hover:bg-accent"
                        layoutId="button"
                      >
                        Button
                      </motion.button>
                    </div>
                  </div>
                </Dialog.Popup>
              </div>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
  );
}
