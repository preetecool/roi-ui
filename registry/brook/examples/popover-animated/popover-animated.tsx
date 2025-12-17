"use client";

import { Bell, User } from "lucide-react";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/ui/avatar/avatar";
import { Button } from "@/registry/brook/ui/button/button";
import {
  createPopoverHandle,
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/brook/ui/popover/popover";
import styles from "./popover-animated.module.css";

const popoverHandle = createPopoverHandle<React.ComponentType>();

function NotificationsContent() {
  return (
    <>
      <PopoverTitle>Notifications</PopoverTitle>
      <PopoverDescription>You have no new notifications at this time.</PopoverDescription>
    </>
  );
}

function ProfileContent() {
  return (
    <div className={styles.profilePanel}>
      <div className={styles.profileHeader}>
        <Avatar className={styles.avatar}>
          <AvatarImage alt="@preetecool" src="/preetecool.png" />
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
        <div className={styles.profileInfo}>
          <h4 className={styles.profileName}>preetecool</h4>
          <span className={styles.profileRole}>Design Engineer</span>
        </div>
      </div>
      <Button className={styles.logoutButton} variant="outline">
        Log out
      </Button>
    </div>
  );
}

export default function PopoverAnimated() {
  return (
    <div className={styles.container}>
      <PopoverTrigger
        handle={popoverHandle}
        payload={NotificationsContent}
        render={<Button className={styles.iconButton} variant="outline" />}
      >
        <Bell aria-label="Notifications" size={16} />
      </PopoverTrigger>
      <PopoverTrigger
        handle={popoverHandle}
        payload={ProfileContent}
        render={<Button className={styles.iconButton} variant="outline" />}
      >
        <User aria-label="Profile" size={16} />
      </PopoverTrigger>
      <Popover handle={popoverHandle}>
        {({ payload }) => {
          const Payload = payload as React.ComponentType | undefined;
          return <PopoverPopup>{Payload !== undefined && <Payload />}</PopoverPopup>;
        }}
      </Popover>
    </div>
  );
}
