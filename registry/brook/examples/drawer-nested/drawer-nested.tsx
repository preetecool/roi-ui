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
      onOpenChange={(nextOpen: boolean) => {
        setFirstOpen(nextOpen);
        if (!nextOpen) {
          setSecondOpen(false);
          setThirdOpen(false);
        }
      }}
      open={firstOpen}
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
                    onOpenChange={(nextOpen: boolean) => {
                      setSecondOpen(nextOpen);
                      if (!nextOpen) {
                        setThirdOpen(false);
                      }
                    }}
                    open={secondOpen}
                  >
                    <DrawerTrigger
                      render={
                        <Button className={styles.linkButton} size="sm" variant="link">
                          Team members
                        </Button>
                      }
                    />
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
                                <Drawer onOpenChange={setThirdOpen} open={thirdOpen}>
                                  <DrawerTrigger
                                    render={
                                      <Button className={styles.linkButton} variant="link">
                                        Invite member
                                      </Button>
                                    }
                                  />
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
                                            <label className={styles.label} htmlFor="invite-email">
                                              Email address
                                            </label>
                                            <input
                                              className={styles.input}
                                              defaultValue="colleague@company.com"
                                              id="invite-email"
                                            />
                                          </div>
                                          <div className={styles.field}>
                                            <label className={styles.label} htmlFor="invite-role">
                                              Role
                                            </label>
                                            <textarea
                                              className={styles.textarea}
                                              defaultValue="Editor"
                                              id="invite-role"
                                              rows={3}
                                            />
                                          </div>
                                          <div className={styles.actions}>
                                            <DrawerClose
                                              render={
                                                <Button size="sm" variant="outline">
                                                  Send Invite
                                                </Button>
                                              }
                                            />
                                          </div>
                                        </DrawerContent>
                                      </DrawerPopup>
                                    </DrawerViewport>
                                  </DrawerPortal>
                                </Drawer>
                              </div>
                              <DrawerClose
                                render={
                                  <Button size="sm" variant="outline">
                                    Close
                                  </Button>
                                }
                              />
                            </div>
                          </DrawerContent>
                        </DrawerPopup>
                      </DrawerViewport>
                    </DrawerPortal>
                  </Drawer>
                </div>
                <DrawerClose
                  render={
                    <Button size="sm" variant="outline">
                      Close
                    </Button>
                  }
                />
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
