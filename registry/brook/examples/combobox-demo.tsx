"use client";

import { useState } from "react";
import { Combobox, ComboboxOption } from "@/registry/brook/ui/combobox/combobox";
import { Avatar, AvatarImage, AvatarFallback } from "@/registry/brook/ui/avatar/avatar";

interface User extends ComboboxOption {
  email: string;
  avatar: string;
}

const users = [
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
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "jane-smith",
    label: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "mike-johnson",
    label: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "sarah-wilson",
    label: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "alex-brown",
    label: "Alex Brown",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
  },
  {
    value: "emma-davis",
    label: "Emma Davis",
    email: "emma@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
  },
];

export default function ComboboxDemo() {
  const [selectedUser, setSelectedUser] = useState<string>("");

  const renderTrigger = (selectedOption: ComboboxOption | undefined) => {
    if (!selectedOption) return null;

    const user = selectedOption as User;

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
        <Avatar style={{ width: "1.5rem", height: "1.5rem" }}>
          <AvatarImage src={user.avatar} alt={user.label} />
          <AvatarFallback>
            {user.label
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>{user.label}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{user.email}</div>
        </div>
      </div>
    );
  };

  const renderOption = (option: ComboboxOption) => {
    const user = option as User;

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
        <Avatar style={{ width: "1.5rem", height: "1.5rem" }}>
          <AvatarImage src={user.avatar} alt={user.label} />
          <AvatarFallback>
            {user.label
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>{user.label}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{user.email}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>User Search</h3>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Search and select a user from the list</p>
      </div>

      <div style={{ width: "300px" }}>
        <Combobox
          options={users}
          value={selectedUser}
          onValueChange={setSelectedUser}
          placeholder="Select a user..."
          searchPlaceholder="Search users..."
          emptyText="No user found."
          renderTrigger={renderTrigger}
          renderOption={renderOption}
          contentWidth="300px"
        />
      </div>
    </div>
  );
}
