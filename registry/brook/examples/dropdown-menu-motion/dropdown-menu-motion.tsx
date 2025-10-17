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
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <MotionConfig transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}>
        <Menu.Root open={open} onOpenChange={setOpen}>
          {!open && (
            <Menu.Trigger
              nativeButton
              render={
                <motion.button
                  layoutId="menu-wrapper"
                  className={styles.button}
                  style={{ borderRadius: 14 }}
                />
              }
            >
              <motion.div
                layoutId="menu-icon"
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Plus size={18} />
              </motion.div>
            </Menu.Trigger>
          )}

          <AnimatePresence>
            {open && (
              <Menu.Portal key="portal">
                <Menu.Positioner anchor={containerRef}>
                  <Menu.Popup
                    render={
                      <motion.div
                        layoutId="menu-wrapper"
                        className={styles.popup}
                        style={{ borderRadius: 14 }}
                      />
                    }
                  >
                    <motion.div className={styles.iconPlaceholder} layoutId="menu-icon" />

                    <ul>
                      {menuItems.map((item, index) => (
                        <motion.li key={item.label}>
                          {index === menuItems.length - 1 && <motion.div className={styles.separator} />}
                          <Menu.Item nativeButton render={<motion.button className={styles.menuItem} />}>
                            <item.icon size={14} />
                            {item.label}
                          </Menu.Item>
                        </motion.li>
                      ))}
                    </ul>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            )}
          </AnimatePresence>
        </Menu.Root>
      </MotionConfig>
    </div>
  );
}
