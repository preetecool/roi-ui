"use client";
import { Menu } from "@base-ui/react";
import { CreditCard, Ellipsis, LogOut, Settings, User, Users } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
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
    <div ref={containerRef} style={{ position: "relative" }}>
      <MotionConfig
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.4,
          // biome-ignore lint/style/noMagicNumbers: cubic-bezier easing values
          ease: [0.19, 1, 0.22, 1],
        }}
      >
        <Menu.Root onOpenChange={setOpen} open={open}>
          <Menu.Trigger
            hidden={undefined}
            render={<motion.button className={styles.button} layoutId="menu-wrapper" style={{ borderRadius: "50%" }} />}
          >
            {!open && <Ellipsis size={18} />}
          </Menu.Trigger>

          <AnimatePresence>
            {open && (
              <Menu.Portal container={containerRef} keepMounted key="portal">
                <Menu.Positioner
                  anchor={containerRef}
                  render={<motion.div className={styles.positioner} layout />}
                  side="top"
                  sideOffset={20}
                >
                  <motion.div layoutId="menu-wrapper">
                    <Menu.Popup
                      hidden={undefined}
                      render={<motion.div className={styles.popup} style={{ borderRadius: "0.6rem" }} />}
                    >
                      <motion.ul>
                        <div style={{ height: "4px", width: "100%" }} />
                        {menuItems.map((item, index) => (
                          <motion.li key={item.label}>
                            {index === menuItems.length - 1 && (
                              <div className={styles.seperatorWrapper}>
                                <motion.div className={styles.separator} />
                              </div>
                            )}
                            <Menu.Item
                              className={item.label === "Logout" ? styles.deleteItem : undefined}
                              nativeButton
                              render={<motion.button className={styles.menuItem} />}
                            >
                              <item.icon size={14} />
                              {item.label}
                            </Menu.Item>
                          </motion.li>
                        ))}
                        <div style={{ height: "4px", width: "100%" }} />
                      </motion.ul>
                    </Menu.Popup>
                  </motion.div>
                </Menu.Positioner>
              </Menu.Portal>
            )}
          </AnimatePresence>
        </Menu.Root>
      </MotionConfig>
    </div>
  );
}
