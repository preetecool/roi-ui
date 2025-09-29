"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuPopup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown, User, Settings, Users, CreditCard, LogOut } from "lucide-react";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./dropdown-menu-motion.module.css";

const menuItems = [
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
  { label: "Team", icon: Users },
  { label: "Billing", icon: CreditCard },
];

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8, originX: -0.1, originY: -0.1 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8, originX: -0.1, originY: -0.1 },
};

const popupTransition = {
  opacity: { duration: 0.15 },
  scale: { type: "spring" as const, duration: 0.4, bounce: 0.5 },
};

export default function DropdownMenuFramerMotion() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <div className={styles.triggerContent}>
              <span> Open Menu </span>
              <ChevronDown size={16} className={styles.chevronIcon} />
            </div>
          </Button>
        }
      ></DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <AnimatePresence>
            {open && (
              <DropdownMenuPopup
                render={
                  <motion.div
                    variants={popupVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={popupTransition}
                  />
                }
              >
                {menuItems.map((item) => (
                  <motion.div key={item.label}>
                    <DropdownMenuItem render={<Button variant="ghost" className={styles.menuItemButton} />} nativeButton>
                      <div className={styles.menuItemContent}>
                        <item.icon size={16} />
                        {item.label}
                      </div>
                    </DropdownMenuItem>
                  </motion.div>
                ))}

                <motion.div>
                  <DropdownMenuSeparator className={styles.separator} />
                </motion.div>

                <DropdownMenuItem render={<Button variant="ghost" className={styles.menuItemButton} />} nativeButton>
                  <div className={styles.menuItemContent}>
                    <LogOut size={16} />
                    Logout
                  </div>
                </DropdownMenuItem>
              </DropdownMenuPopup>
            )}
          </AnimatePresence>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
