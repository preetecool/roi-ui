"use client";

import { Calendar, ListTodo, MessageCircleMore, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/brook/ui/badge/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/brook/ui/card/card";
import { AvatarGroup } from "./avatar-group";
import styles from "./card-task.module.css";
import { CollaboratorDialog } from "./collaborator-dialog";
import { DeleteTaskAlertDialog } from "./delete-task-alert-dialog";
import { TaskCardDropdownMenu } from "./task-card-dropdown-menu";

export type User = {
  value: string;
  label: string;
  email: string;
  avatar: string;
};

type TaskCardProps = {
  title: string;
  description: string;
  tags: Array<{
    label: string;
    variant?: "default" | "destructive";
  }>;
  collaborators: User[];
  onCollaboratorsChange?: (collaborators: User[]) => void;
  availableUsers?: User[];
  stats: {
    comments: number;
    subtasks: string;
  };
  dueDate: {
    label: string;
    variant?: "default" | "warning";
  };
  onDelete?: () => void;
};

export function CardTask({
  title,
  description,
  tags,
  collaborators,
  onCollaboratorsChange,
  availableUsers = [],
  stats,
  dueDate,
  onDelete,
}: TaskCardProps) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [collaboratorDialogOpen, setCollaboratorDialogOpen] = useState(false);

  const handleCollaboratorsConfirm = (newCollaborators: User[]) => {
    onCollaboratorsChange?.(newCollaborators);
  };

  const handleDelete = () => {
    onDelete?.();
    setAlertOpen(false);
  };

  return (
    <>
      <Card className={styles.taskCard}>
        <CardHeader>
          <CardTitle style={{ fontSize: "1rem" }}>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardAction>
            <TaskCardDropdownMenu
              onAddCollaborator={() => setCollaboratorDialogOpen(true)}
              onDeleteTask={() => setAlertOpen(true)}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className={styles.contentContainer}>
            <div className={styles.badgeContainer}>
              {tags.map((tag) => (
                <Badge key={tag.label} size="sm" variant={tag.variant}>
                  <span>{tag.label}</span>
                </Badge>
              ))}
            </div>
            <AvatarGroup users={collaborators} />
          </div>
        </CardContent>

        <CardFooter className={styles.taskFooter}>
          <div className={styles.dividerWrapper}>
            <div className={styles.divider} />
          </div>
          <div className={styles.footerContainer}>
            <div className={styles.footerLeftGroup}>
              <div className={styles.iconBubble}>
                <Users size="14" />
                <span>{collaborators.length}</span>
              </div>
              <div className={styles.iconBubble}>
                <MessageCircleMore size="14" />
                <span>{stats.comments}</span>
              </div>
              <div className={styles.iconBubble}>
                <ListTodo size="14" />
                <span>{stats.subtasks}</span>
              </div>
            </div>
            <div className={styles.iconBubble}>
              <Calendar size="14" />
              <span
                className={
                  dueDate.variant === "warning" ? styles.tomorrowText : undefined
                }
              >
                {dueDate.label}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <DeleteTaskAlertDialog
        onDelete={handleDelete}
        onOpenChange={setAlertOpen}
        open={alertOpen}
      />

      {availableUsers.length > 0 && (
        <CollaboratorDialog
          availableUsers={availableUsers}
          currentCollaborators={collaborators}
          onConfirm={handleCollaboratorsConfirm}
          onOpenChange={setCollaboratorDialogOpen}
          open={collaboratorDialogOpen}
        />
      )}
    </>
  );
}

// Demo data for examples/documentation
const demoUsers: User[] = [
  {
    value: "preetecool",
    label: "preetecool",
    email: "@preetecool",
    avatar: "/preetecool.png",
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
];

export default function CardTaskDemo() {
  const [collaborators, setCollaborators] = useState<User[]>([demoUsers[0]]);

  return (
    <CardTask
      availableUsers={demoUsers}
      collaborators={collaborators}
      description="Update the card component documentation to reflect the new style"
      dueDate={{ label: "1d", variant: "warning" }}
      onCollaboratorsChange={setCollaborators}
      onDelete={() => console.log("Task deleted")}
      stats={{ comments: 4, subtasks: "4/5" }}
      tags={[
        { label: "Urgent", variant: "destructive" },
        { label: "Docs" },
      ]}
      title="Update Documentation"
    />
  );
}
