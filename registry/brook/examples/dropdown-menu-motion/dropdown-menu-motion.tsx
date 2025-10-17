"use client";
import { Menu } from "@base-ui-components/react";
import { CreditCard, LogOut, Plus, Settings, User, Users } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useRef, useState } from "react";
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
  const actionsRef = useRef<Menu.Root.Actions>(null!);

  return (
    <MotionConfig transition={{ type: "spring", duration: 0.4, bounce: 0 }}>
      <Menu.Root open={open} onOpenChange={setOpen} actionsRef={actionsRef}>
        <div style={{ position: "relative" }}>
          <Menu.Trigger nativeButton style={{ borderRadius: 14, opacity: 0 }} className={styles.button}>
            <motion.span layoutId="menu-icon">
              <Plus size={18} />
            </motion.span>
          </Menu.Trigger>
          {!open && (
            <motion.div
              layout
              layoutId="menu-wrapper"
              className={styles.button}
              style={{ borderRadius: 14, position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
            >
              <motion.span layoutId="menu-icon">
                <Plus size={18} />
              </motion.span>
            </motion.div>
          )}
        </div>
        <AnimatePresence mode="popLayout">
          <Menu.Portal keepMounted key="portal">
            {open && (
              <Menu.Positioner side="bottom" align="end">
                <Menu.Popup
                  render={
                    <motion.div
                      layoutId="menu-wrapper"
                      className={styles.popup}
                      style={{ borderRadius: 14 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  }
                >
                  <motion.div>
                    <motion.span
                      layoutId="menu-icon"
                      className={styles.iconPlaceholder}
                      style={{ opacity: 0 }}
                    />
                    <ul>
                      {menuItems.map((item, index) => (
                        <motion.li key={item.label}>
                          {index === menuItems.length - 1 && (
                            <motion.div
                              className={styles.separator}
                              initial={{ opacity: 0, filter: "blur(4px)" }}
                              animate={{ opacity: 1, filter: "blur(0px)" }}
                              exit={{ opacity: 0, filter: "blur(4px)" }}
                            />
                          )}
                          <Menu.Item
                            nativeButton
                            render={
                              <motion.button
                                className={styles.menuItem}
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(4px)" }}
                              />
                            }
                          >
                            <item.icon size={14} />
                            {item.label}
                          </Menu.Item>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </Menu.Popup>
              </Menu.Positioner>
            )}
          </Menu.Portal>
        </AnimatePresence>
      </Menu.Root>
    </MotionConfig>
  );
}
