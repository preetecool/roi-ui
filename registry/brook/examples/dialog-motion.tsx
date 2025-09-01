"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";

export default function DialogFramerMotion() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={setOpen} key="root">
        <motion.div layoutId="container">
          <motion.div layoutId="button">
            <Dialog.Trigger render={<Button />}>Toggle Dialog</Dialog.Trigger>
          </motion.div>
        </motion.div>

        <Dialog.Backdrop
          render={
            <AnimatePresence>
              {open && (
                <motion.div
                  key="overlay"
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "var(--dialog-overlay)",
                    zIndex: "var(--dialog-z)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          }
        />
        <Dialog.Portal>
          <AnimatePresence>
            {open && (
              <Dialog.Popup
                key="modal"
                render={
                  <motion.div
                    style={{
                      position: "fixed",
                      inset: "50%",
                      marginTop: "-100px",
                      marginLeft: "-200px",
                      borderRadius: "8px",
                      padding: "1.5rem",
                      width: "400px",
                      height: "200px",
                      backgroundColor: "var(--card)",
                      zIndex: 101,
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                    layoutId="container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  />
                }
              >
                <Dialog.Title
                  style={{
                    borderBottom: "none",
                    fontSize: "1.125rem",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  What is a brook?
                </Dialog.Title>
                <Dialog.Description>
                  A small, natural stream of fresh water, often winding gently through forests, meadows, or valleys.
                </Dialog.Description>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Dialog.Close render={<Button variant="secondary">Close</Button>}>Close</Dialog.Close>
                  <motion.div layoutId="button">
                    <Button>Toggle Dialog</Button>
                  </motion.div>
                </div>
              </Dialog.Popup>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
