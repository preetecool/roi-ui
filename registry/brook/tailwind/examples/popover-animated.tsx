"use client";

import { Activity, Bell, User } from "lucide-react";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/tailwind/ui/avatar";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  createPopoverHandle,
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/brook/tailwind/ui/popover";

const popoverHandle = createPopoverHandle<React.ComponentType>();

function NotificationsContent() {
  return (
    <div className="flex flex-col gap-1">
      <PopoverTitle className="text-sm leading-5">Notifications</PopoverTitle>
      <PopoverDescription>You are all caught up.</PopoverDescription>
    </div>
  );
}

function ActivityContent() {
  return (
    <div className="flex flex-col gap-1">
      <PopoverTitle className="text-sm leading-5">Activity</PopoverTitle>
      <PopoverDescription>No recent activity to show.</PopoverDescription>
    </div>
  );
}

function ProfileContent() {
  return (
    <div className="flex w-48 flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage alt="preetecool" src="/preetecool.png" />
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col">
          <PopoverTitle className="text-sm leading-5">preetecool</PopoverTitle>
          <span className="text-muted-foreground text-xs">Design Engineer</span>
        </div>
      </div>
      <Button className="w-full" variant="outline">
        Log out
      </Button>
    </div>
  );
}

export default function PopoverAnimated() {
  return (
    <div className="flex items-center justify-center gap-2">
      <PopoverTrigger
        handle={popoverHandle}
        payload={NotificationsContent}
        render={<Button className="h-9 w-9 p-0" variant="outline" />}
      >
        <Bell aria-label="Notifications" className="size-4" />
      </PopoverTrigger>
      <PopoverTrigger
        handle={popoverHandle}
        payload={ActivityContent}
        render={<Button className="h-9 w-9 p-0" variant="outline" />}
      >
        <Activity aria-label="Activity" className="size-4" />
      </PopoverTrigger>
      <PopoverTrigger
        handle={popoverHandle}
        payload={ProfileContent}
        render={<Button className="h-9 w-9 p-0" variant="outline" />}
      >
        <User aria-label="Profile" className="size-4" />
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
