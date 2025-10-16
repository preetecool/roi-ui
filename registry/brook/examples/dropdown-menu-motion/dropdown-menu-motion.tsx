"use client";

import { CreditCard, LogOut, Plus, Settings, User, Users } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./dropdown-menu-motion.module.css";

const menuItems = [
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
  { label: "Team", icon: Users },
  { label: "Billing", icon: CreditCard },
  { label: "Logout", icon: LogOut },
];

export default function DropdownMenuFramerMotion() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <MotionConfig
      transition={{ type: "spring", duration: 0.4, bounce: 0.25, ease: [0.785, 0.135, 0.15, 0.86] }}
    >
      <div className={styles.container}>
        <AnimatePresence>
          {!open && (
            <motion.button
              layoutId="wrapper"
              key={"button"}
              className={styles.button}
              onClick={() => setOpen(!open)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen(!open);
                }
              }}
              style={{ borderRadius: 50 }}
              tabIndex={0}
              aria-label="Open menu"
              aria-expanded={open}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(4px)", scale: 0.4 }}
              transition={{ duration: 0.225 }}
            >
              <motion.span layoutId="icon">
                <Plus size={18} />
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              ref={containerRef}
              layoutId="wrapper"
              className={styles.popup}
              style={{ borderRadius: 14 }}
            >
              <motion.span className={styles.iconPlaceholder} layoutId="icon" initial={{ scale: 1 }} />

              <motion.div>
                {menuItems.map((item, index) => (
                  <>
                    {index === menuItems.length - 1 && (
                      <motion.div
                        key="separator"
                        className={styles.separator}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{
                          opacity: 1,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          filter: "blur(4px)",
                        }}
                      />
                    )}
                    <motion.button
                      key={item.label}
                      className={styles.menuItem}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        filter: "blur(4px)",
                      }}
                    >
                      <item.icon size={14} />
                      {item.label}
                    </motion.button>
                  </>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
