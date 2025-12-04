"use client";

import { Bell, User } from "lucide-react";
import type * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/tailwind/ui/avatar";
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
    <>
      <PopoverTitle>Notifications</PopoverTitle>
      <PopoverDescription>
        You have no new notifications at this time.
      </PopoverDescription>
    </>
  );
}

function ProfileContent() {
  return (
    <div className="w-48">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage alt="@preetecool" src="/preetecool.png" />
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h4 className="m-0 truncate font-medium text-sm leading-5">
            preetecool
          </h4>
          <span className="text-muted-foreground text-xs">Design Engineer</span>
        </div>
      </div>
      <Button className="mt-3 w-full" variant="outline">
        Log out
      </Button>
    </div>
  );
}

export default function PopoverAnimated() {
  return (
    <div className="flex items-center gap-2">
      <PopoverTrigger
        handle={popoverHandle}
        payload={NotificationsContent}
        render={<Button className="h-9 w-9 p-0" variant="outline" />}
      >
        <Bell aria-label="Notifications" size={16} />
      </PopoverTrigger>
      <PopoverTrigger
        handle={popoverHandle}
        payload={ProfileContent}
        render={<Button className="h-9 w-9 p-0" variant="outline" />}
      >
        <User aria-label="Profile" size={16} />
      </PopoverTrigger>
      <Popover handle={popoverHandle}>
        {({ payload }) => {
          const Payload = payload as React.ComponentType | undefined;
          return (
            <PopoverPopup>{Payload !== undefined && <Payload />}</PopoverPopup>
          );
        }}
      </Popover>
    </div>
  );
}
