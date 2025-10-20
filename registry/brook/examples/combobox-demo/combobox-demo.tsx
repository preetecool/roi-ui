"use client";

import {
  Combobox,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxList,
} from "@/registry/brook/ui/combobox/combobox";
import { Avatar, AvatarImage, AvatarFallback } from "@/registry/brook/ui/avatar/avatar";
import styles from "./combobox-demo.module.css";

interface User {
  value: string;
  label: string;
  email: string;
  avatar: string;
}

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
  return (
    <div className={styles.container}>
      <label className={styles.label}>Search and select a user</label>

      <div className={styles.comboboxWrapper}>
        <Combobox<User>
          items={users}
          itemToStringLabel={(item) => item?.label || ""}
          itemToStringValue={(item) => item?.value || ""}
        >
          <div className={styles.inputWrapper}>
            <ComboboxInput placeholder="Search users..." />
            <ComboboxTrigger />
          </div>

          <ComboboxPortal>
            <ComboboxPositioner>
              <ComboboxPopup className={styles.popup}>
                <ComboboxEmpty>No user found.</ComboboxEmpty>
                <ComboboxList>
                  {(user: User) => (
                    <ComboboxItem key={user.value} value={user} indicatorPosition="right">
                      <div className={styles.userContainer}>
                        <Avatar id={styles.avatar}>
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
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxPopup>
            </ComboboxPositioner>
          </ComboboxPortal>
        </Combobox>
      </div>
    </div>
  );
}
