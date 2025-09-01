"use client";

import { useState } from "react";
import { Combobox, ComboboxOption } from "@/registry/brook/ui/combobox/combobox";
import { Avatar, AvatarImage, AvatarFallback } from "@/registry/brook/ui/avatar/avatar";
import styles from "./combobox-demo.module.css";

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
      <div className={styles.userContainer}>
        <Avatar className={styles.avatar}>
          <AvatarImage src={user.avatar} alt={user.label} />
          <AvatarFallback>
            {user.label
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{user.label}</div>
          <div className={styles.userEmail}>{user.email}</div>
        </div>
      </div>
    );
  };

  const renderOption = (option: ComboboxOption) => {
    const user = option as User;

    return (
      <div className={styles.userContainer}>
        <Avatar className={styles.avatar}>
          <AvatarImage src={user.avatar} alt={user.label} />
          <AvatarFallback>
            {user.label
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className={styles.userInfoOption}>
          <div className={styles.userName}>{user.label}</div>
          <div className={styles.userEmail}>{user.email}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>User Search</h3>
        <p className={styles.description}>Search and select a user from the list</p>
      </div>

      <div className={styles.comboboxWrapper}>
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
