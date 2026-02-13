"use client";

import * as React from "react";
import { cn } from "@/lib/utils-tailwind";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/registry/brook/tailwind/ui/drawer";

const popupClasses = cn(
  "[--bleed:3rem] [--peek:1rem]",
  "[--stack-progress:clamp(0,var(--drawer-swipe-progress),1)]",
  "[--stack-step:0.05]",
  "[--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))]",
  "[--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))]",
  "[--stack-scale:calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress)))]",
  "[--stack-shrink:calc(1-var(--stack-scale))]",
  "[--stack-height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))-var(--bleed)))]",
  "[--translate-y:calc(var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]",
  "relative h-[var(--drawer-height,auto)]",
  "shadow-[0_2px_10px_rgb(0_0_0/0.1),0_0_0_1px_oklch(from_var(--border)_l_c_h/0.5)]",
  "[transform-origin:50%_calc(100%-var(--bleed))]",
  "transition-[transform,height,box-shadow] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
  "[transform:translateY(var(--translate-y))_scale(var(--stack-scale))]",
  "data-[swiping]:!duration-0 data-[nested-drawer-swiping]:!duration-0",
  "data-[nested-drawer-open]:h-[calc(var(--stack-height)+var(--bleed))] data-[nested-drawer-open]:overflow-hidden",
  "data-[starting-style]:[transform:translateY(calc(100%-var(--bleed)))]",
  "data-[ending-style]:[transform:translateY(calc(100%-var(--bleed)))]",
  "data-[ending-style]:shadow-[0_2px_10px_rgb(0_0_0/0),0_0_0_1px_oklch(from_var(--border)_l_c_h/0)]",
  "data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
);

const contentClasses = cn(
  "transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)]",
  "[*[data-nested-drawer-open]_&]:opacity-0",
  "[*[data-nested-drawer-open][data-nested-drawer-swiping]_&]:opacity-100",
);

const handleClasses = cn(
  "transition-opacity duration-200",
  "[*[data-nested-drawer-open]_&]:opacity-0",
  "[*[data-nested-drawer-open][data-nested-drawer-swiping]_&]:opacity-100",
);

export default function DrawerNested() {
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [thirdOpen, setThirdOpen] = React.useState(false);

  return (
    <Drawer
      open={firstOpen}
      onOpenChange={(nextOpen) => {
        setFirstOpen(nextOpen);
        if (!nextOpen) {
          setSecondOpen(false);
          setThirdOpen(false);
        }
      }}
    >
      <DrawerTrigger render={<Button>Workspace Settings</Button>} />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup className={popupClasses}>
            <DrawerHandle className={handleClasses} />
            <DrawerContent className={contentClasses}>
              <DrawerTitle className="text-center">Workspace</DrawerTitle>
              <DrawerDescription className="text-center">
                Manage your workspace settings, members, and billing.
              </DrawerDescription>
              <div className="flex items-center justify-end gap-4">
                <div className="mr-auto">
                  <Drawer
                    open={secondOpen}
                    onOpenChange={(nextOpen) => {
                      setSecondOpen(nextOpen);
                      if (!nextOpen) {
                        setThirdOpen(false);
                      }
                    }}
                  >
                    <DrawerTrigger render={<Button variant="link" size="sm" className="pl-0">Team members</Button>} />
                    <DrawerPortal>
                      <DrawerViewport>
                        <DrawerPopup className={popupClasses}>
                          <DrawerHandle className={handleClasses} />
                          <DrawerContent className={contentClasses}>
                            <DrawerTitle className="text-center">Team</DrawerTitle>
                            <DrawerDescription className="text-center">
                              Manage who has access to this workspace.
                            </DrawerDescription>
                            <ul className="mb-6 pl-5 text-muted-foreground">
                              <li>5 active members</li>
                              <li>2 pending invitations</li>
                              <li>3 roles configured</li>
                            </ul>
                            <div className="flex items-center justify-end gap-4">
                              <div className="mr-auto">
                                <Drawer open={thirdOpen} onOpenChange={setThirdOpen}>
                                  <DrawerTrigger render={<Button variant="link" className="pl-0">Invite member</Button>} />
                                  <DrawerPortal>
                                    <DrawerViewport>
                                      <DrawerPopup className={popupClasses}>
                                        <DrawerHandle className={handleClasses} />
                                        <DrawerContent className={contentClasses}>
                                          <DrawerTitle className="text-center">Invite Member</DrawerTitle>
                                          <DrawerDescription className="text-center">
                                            Send an invitation to join your workspace.
                                          </DrawerDescription>
                                          <div className="mb-4 grid gap-1.5">
                                            <label className="text-sm font-medium leading-5 text-muted-foreground" htmlFor="invite-email">Email address</label>
                                            <input id="invite-email" className="box-border w-full rounded-[var(--radius)] border border-border bg-background px-2.5 py-2 font-[inherit] text-sm text-foreground focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:-outline-offset-1" defaultValue="colleague@company.com" />
                                          </div>
                                          <div className="mb-4 grid gap-1.5">
                                            <label className="text-sm font-medium leading-5 text-muted-foreground" htmlFor="invite-role">Role</label>
                                            <textarea id="invite-role" className="box-border w-full resize-y rounded-[var(--radius)] border border-border bg-background px-2.5 py-2 font-[inherit] text-sm text-foreground focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:-outline-offset-1" defaultValue="Editor" rows={3} />
                                          </div>
                                          <div className="flex items-center justify-end gap-4">
                                            <DrawerClose render={<Button variant="outline" size="sm">Send Invite</Button>} />
                                          </div>
                                        </DrawerContent>
                                      </DrawerPopup>
                                    </DrawerViewport>
                                  </DrawerPortal>
                                </Drawer>
                              </div>
                              <DrawerClose render={<Button variant="outline" size="sm">Close</Button>} />
                            </div>
                          </DrawerContent>
                        </DrawerPopup>
                      </DrawerViewport>
                    </DrawerPortal>
                  </Drawer>
                </div>
                <DrawerClose render={<Button variant="outline" size="sm">Close</Button>} />
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
