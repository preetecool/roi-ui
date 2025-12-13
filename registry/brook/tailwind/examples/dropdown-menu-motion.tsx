"use client";
import { Menu } from "@base-ui/react";
import {
  CreditCard,
  Ellipsis,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils-tailwind";

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
          bounce: 0.1,
          duration: 0.4,
          // biome-ignore lint/style/noMagicNumbers: cubic-bezier easing values
          ease: [0.19, 1, 0.22, 1],
        }}
      >
        <Menu.Root onOpenChange={setOpen} open={open}>
          <Menu.Trigger
            render={
              <motion.button
                className={cn(
                  "relative z-[999] ml-0 flex h-11 w-11 cursor-pointer items-center justify-center border-[0.5px] border-border bg-[var(--mix-card-33-bg)] text-secondary-foreground",
                  "transition-[background-color] duration-150 ease-out hover:bg-muted",
                  "data-[popup-open]:bg-transparent data-[popup-open]:opacity-0",
                  "data-[pressed]:border-0 data-[pressed]:bg-transparent data-[pressed]:opacity-0",
                  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
                  "max-sm:h-11 max-sm:w-11"
                )}
                layoutId="menu-wrapper"
              />
            }
          >
            {!open && <Ellipsis size={18} />}
          </Menu.Trigger>

          <AnimatePresence>
            {open && (
              <Menu.Portal container={containerRef} key="portal">
                <Menu.Positioner
                  anchor={containerRef}
                  render={
                    <motion.div className="absolute left-0 z-[150]" layout />
                  }
                  side="top"
                  sideOffset={20}
                >
                  <motion.div layoutId="menu-wrapper">
                    <Menu.Popup
                      render={
                        <motion.div
                          className={cn(
                            "-mt-44 min-w-[170px] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.6)] bg-[var(--mix-card-50-bg)]",
                            "flex flex-col transition-none",
                            "shadow-[oklch(from_var(--border)_l_c_h_/_0.1)_0px_1px_2px,oklch(from_var(--border)_l_c_h_/_0.1)_0px_1px_2px,oklch(from_var(--border)_l_c_h_/_0.1)_0px_1px_1px]",
                            "data-[ending-style]:transition-none data-[starting-style]:transition-none",
                            "max-sm:right-auto max-sm:left-0 max-sm:w-[140px] max-sm:p-1.5"
                          )}
                          style={{ borderRadius: "0.3rem" }}
                        />
                      }
                    >
                      <motion.ul className="m-0 list-none p-0">
                        <div style={{ height: "4px", width: "100%" }} />
                        {menuItems.map((item, index) => (
                          <motion.li className="m-0 p-0" key={item.label}>
                            {index === menuItems.length - 1 && (
                              <div className="py-[5px]">
                                <motion.div className="max-sm:-mx-1.5 h-px border-[oklch(from_var(--border)_l_c_h_/_0.6)] border-b-[0.5px] max-sm:my-1" />
                              </div>
                            )}
                            <Menu.Item
                              nativeButton
                              render={
                                <motion.button
                                  className={cn(
                                    "relative isolate m-0 flex h-8 w-full cursor-pointer items-center justify-start gap-3 rounded-[0.3rem] border-0 bg-transparent px-2 pr-1.5 font-normal text-foreground text-sm leading-tight",
                                    "before:-z-10 before:absolute before:inset-x-1 before:inset-y-0 before:rounded-[0.3rem] before:bg-transparent before:content-['']",
                                    "data-[popup-open]:before:bg-[oklch(from_var(--accent)_l_c_h_/_0.7)]",
                                    "data-[highlighted]:before:bg-[oklch(from_var(--accent)_l_c_h_/_0.7)]",
                                    "hover:before:bg-[oklch(from_var(--accent)_l_c_h_/_0.7)]",
                                    "focus:outline-none focus:before:bg-[oklch(from_var(--accent)_l_c_h_/_0.7)]",
                                    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent",
                                    "active:scale-[0.98]",
                                    "[&_svg]:ml-1 [&_svg]:flex [&_svg]:items-center [&_svg]:justify-center [&_svg]:text-muted-foreground",
                                    "hover:[&_svg]:text-secondary-foreground hover:[&_svg]:opacity-100",
                                    "max-sm:min-h-11 max-sm:gap-3 max-sm:text-sm max-sm:[&_svg]:h-4 max-sm:[&_svg]:w-4",
                                    item.label === "Logout" &&
                                      "text-[var(--destructive)] [&_svg]:text-[var(--destructive)]",
                                    item.label === "Logout" &&
                                      "hover:before:!bg-[var(--destructive)] hover:text-[var(--destructive-foreground)] hover:[&_svg]:text-[var(--destructive-foreground)]"
                                  )}
                                />
                              }
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
