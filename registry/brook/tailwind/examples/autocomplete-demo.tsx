"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/tailwind/ui/avatar";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
} from "@/registry/brook/tailwind/ui/autocomplete";

type User = {
  value: string;
  label: string;
  email: string;
  avatar: string;
};

const users: User[] = [
  {
    value: "preetecool",
    label: "preetecool",
    email: "@preetecool",
    avatar: "https://github.com/preetecool.png",
  },
  {
    value: "john-doe",
    label: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "jane-smith",
    label: "Jane Smith",
    email: "jane@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "mike-johnson",
    label: "Mike Johnson",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "sarah-wilson",
    label: "Sarah Wilson",
    email: "sarah@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "alex-brown",
    label: "Alex Brown",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "emma-davis",
    label: "Emma Davis",
    email: "emma@example.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
  },
];

export default function AutocompleteDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="p-8 max-sm:p-4">
      <label
        className="mb-2 ml-1 flex flex-col gap-1 text-sm font-medium leading-[17.5px] text-[var(--color-foreground)] max-sm:text-[0.9375rem]"
        htmlFor="ac-input"
      >
        Search and select a user
      </label>

      <Autocomplete
        items={users}
        itemToStringValue={(item) => (item as User).label}
        onValueChange={setValue}
        value={value}
      >
        <AutocompleteInput
          className="w-[300px] max-sm:w-full"
          id="ac-input"
          placeholder="Search users..."
        />

        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>No user found.</AutocompleteEmpty>
              <AutocompleteList>
                {(user: User) => (
                  <AutocompleteItem key={user.value} value={user}>
                    <div className="flex flex-1 items-center gap-4 max-sm:gap-3">
                      <Avatar className="h-6 w-6 max-sm:h-7 max-sm:w-7">
                        <AvatarImage alt={user.label} src={user.avatar} />
                        <AvatarFallback>
                          {user.label
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <div className="text-sm font-medium max-sm:text-[0.9375rem]">
                          {user.label}
                        </div>
                        <div className="text-xs text-[var(--color-muted-foreground)] max-sm:text-[0.8125rem]">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  );
}
