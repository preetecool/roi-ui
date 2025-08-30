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

const menuItems = [
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
  { label: "Team", icon: Users },
  { label: "Billing", icon: CreditCard },
];

export default function DropdownMenuFramerMotion() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <div
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <span> Open Menu </span>
              <ChevronDown size={16} style={{ marginTop: "1px" }} />
            </div>
          </Button>
        }
      ></DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuPositioner>
          <AnimatePresence mode="wait">
            {open && (
              <DropdownMenuPopup
                key={"popup"}
                render={
                  <motion.div
                    initial={{ originX: -0.1, originY: -0.1 }}
                    animate={{ opacity: 1, scale: [0.1, 1], y: 0, originX: 0, originY: 0 }}
                    exit={{ opacity: 0, scale: 0.95, originX: -0.1, originY: -0.1 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      bounce: 0.1,
                      stiffness: 400,
                    }}
                  />
                }
              >
                {menuItems.map((item) => (
                  <motion.div key={item.label}>
                    <DropdownMenuItem
                      render={
                        <Button
                          variant="ghost"
                          style={{
                            width: "100%",
                            justifyContent: "flex-start",
                          }}
                          onClick={() => {
                            console.log(`Clicked ${item.label}`);
                          }}
                        />
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <item.icon size={16} />
                        {item.label}
                      </div>
                    </DropdownMenuItem>
                  </motion.div>
                ))}

                <motion.div>
                  <DropdownMenuSeparator
                    style={{
                      height: "1px",
                      backgroundColor: "var(--border)",
                      border: "none",
                    }}
                  />
                </motion.div>

                <DropdownMenuItem
                  render={
                    <Button
                      variant="ghost"
                      style={{
                        width: "100%",
                        justifyContent: "flex-start",
                      }}
                      onClick={() => {
                        console.log("Logout clicked");
                        setOpen(false);
                      }}
                    />
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
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
