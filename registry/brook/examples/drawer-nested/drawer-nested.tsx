"use client";

import * as React from "react";
import { Button } from "@/registry/brook/ui/button/button";
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
} from "@/registry/brook/ui/drawer/drawer";
import styles from "./drawer-nested.module.css";

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
          <DrawerPopup className={styles.popup}>
            <DrawerHandle className={styles.handle} />
            <DrawerContent className={styles.content}>
              <DrawerTitle className={styles.title}>Workspace</DrawerTitle>
              <DrawerDescription className={styles.description}>
                Manage your workspace settings, members, and billing.
              </DrawerDescription>
              <div className={styles.actions}>
                <div className={styles.actionsLeft}>
                  <Drawer
                    open={secondOpen}
                    onOpenChange={(nextOpen) => {
                      setSecondOpen(nextOpen);
                      if (!nextOpen) {
                        setThirdOpen(false);
                      }
                    }}
                  >
                    <DrawerTrigger render={<Button variant="link" size="sm" className={styles.linkButton}>Team members</Button>} />
                    <DrawerPortal>
                      <DrawerViewport>
                        <DrawerPopup className={styles.popup}>
                          <DrawerHandle className={styles.handle} />
                          <DrawerContent className={styles.content}>
                            <DrawerTitle className={styles.title}>Team</DrawerTitle>
                            <DrawerDescription className={styles.description}>
                              Manage who has access to this workspace.
                            </DrawerDescription>
                            <ul className={styles.list}>
                              <li>5 active members</li>
                              <li>2 pending invitations</li>
                              <li>3 roles configured</li>
                            </ul>
                            <div className={styles.actions}>
                              <div className={styles.actionsLeft}>
                                <Drawer open={thirdOpen} onOpenChange={setThirdOpen}>
                                  <DrawerTrigger render={<Button variant="link" className={styles.linkButton}>Invite member</Button>} />
                                  <DrawerPortal>
                                    <DrawerViewport>
                                      <DrawerPopup className={styles.popup}>
                                        <DrawerHandle className={styles.handle} />
                                        <DrawerContent className={styles.content}>
                                          <DrawerTitle className={styles.title}>Invite Member</DrawerTitle>
                                          <DrawerDescription className={styles.description}>
                                            Send an invitation to join your workspace.
                                          </DrawerDescription>
                                          <div className={styles.field}>
                                            <label className={styles.label} htmlFor="invite-email">Email address</label>
                                            <input id="invite-email" className={styles.input} defaultValue="colleague@company.com" />
                                          </div>
                                          <div className={styles.field}>
                                            <label className={styles.label} htmlFor="invite-role">Role</label>
                                            <textarea id="invite-role" className={styles.textarea} defaultValue="Editor" rows={3} />
                                          </div>
                                          <div className={styles.actions}>
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
