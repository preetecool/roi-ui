"use client";

import { Calendar, ListTodo, MessageCircleMore, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/brook/tailwind/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/brook/tailwind/ui/card";
import { AvatarGroup } from "./avatar-group";
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
      <Card className="w-full max-w-[300px] gap-4 p-4 xl:min-h-auto">
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardAction>
            <TaskCardDropdownMenu
              onAddCollaborator={() => setCollaboratorDialogOpen(true)}
              onDeleteTask={() => setAlertOpen(true)}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <Badge key={tag.label} size="sm" variant={tag.variant}>
                  <span>{tag.label}</span>
                </Badge>
              ))}
            </div>
            <AvatarGroup users={collaborators} />
          </div>
        </CardContent>

        <CardFooter className="mt-0 mb-0 flex flex-col gap-[0.65rem]">
          <div className="-mx-4 w-[calc(100%+32px)] py-[5px]">
            <div className="h-px w-full border-[oklch(from_var(--border)_l_c_h_/_0.6)] border-b-[0.5px]" />
          </div>
          <div className="flex w-full justify-between text-[oklch(from_var(--muted-foreground)_l_c_h_/_0.6)] text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
                <Users size="14" />
                <span>{collaborators.length}</span>
              </div>
              <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
                <MessageCircleMore size="14" />
                <span>{stats.comments}</span>
              </div>
              <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
                <ListTodo size="14" />
                <span>{stats.subtasks}</span>
              </div>
            </div>
            <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
              <Calendar size="14" />
              <span className={dueDate.variant === "warning" ? "text-[var(--warning-foreground)]" : undefined}>
                {dueDate.label}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <DeleteTaskAlertDialog onDelete={handleDelete} onOpenChange={setAlertOpen} open={alertOpen} />

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
      tags={[{ label: "Urgent", variant: "destructive" }, { label: "Docs" }]}
      title="Update Documentation"
    />
  );
}
