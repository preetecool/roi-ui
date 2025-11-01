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

export function CardTask() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [collaboratorDialogOpen, setCollaboratorDialogOpen] = useState(false);
  const [currentCollaborators, setCurrentCollaborators] = useState<User[]>([
    users[0],
  ]);
  const [selectedCollaborators, setSelectedCollaborators] = useState<User[]>([
    users[0],
  ]);
  const [newlyAddedCollaborators, setNewlyAddedCollaborators] = useState<
    string[]
  >([]);

  const handleConfirm = () => {
    const previousCollaborators = currentCollaborators;
    setCurrentCollaborators(selectedCollaborators);

    // Track newly added: items that weren't in the previous list OR were removed and re-added
    const newlyAdded = selectedCollaborators
      .filter((s) => !previousCollaborators.find((c) => c.value === s.value))
      .map((s) => s.value);

    // Preserve previously newly-added items that are still selected
    const stillNewlyAdded = newlyAddedCollaborators.filter((value) =>
      selectedCollaborators.find((s) => s.value === value)
    );

    // Combine: keep old newly-added + add new ones
    setNewlyAddedCollaborators([
      ...new Set([...stillNewlyAdded, ...newlyAdded]),
    ]);
    setCollaboratorDialogOpen(false);
  };

  const handleDialogOpen = (open: boolean) => {
    if (open) {
      // Reset selected to current when opening
      setSelectedCollaborators([...currentCollaborators]);
      // Clear newly added collaborators when opening
      setNewlyAddedCollaborators([]);
    }
    setCollaboratorDialogOpen(open);
  };

  return (
    <>
      <Card className="w-full max-w-[300px] gap-4 p-4 xl:min-h-auto">
        <CardHeader>
          <CardTitle style={{ fontSize: "1rem" }}>
            {" "}
            Update Documentation
          </CardTitle>
          <CardDescription>
            Update the card component documentation to reflect the new style
          </CardDescription>
          <CardAction>
            <TaskCardDropdownMenu
              onAddCollaborator={() => handleDialogOpen(true)}
              onDeleteTask={() => setAlertOpen(true)}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge size="sm" variant="destructive">
                <span>Urgent</span>
              </Badge>
              <Badge size="sm">
                <span>Docs</span>
              </Badge>
            </div>
            <AvatarGroup users={currentCollaborators} />
          </div>
        </CardContent>

        <CardFooter className="mt-0 mb-0 flex flex-col gap-[0.65rem]">
          <div
            style={{
              padding: "5px 0",
              width: "calc(100% + 32px)",
              marginLeft: "-16px",
              marginRight: "-16px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "100%",
                borderBottom:
                  "0.5px solid oklch(from var(--border) l c h / 0.6)",
              }}
            />
          </div>
          <div className="flex w-full justify-between text-[oklch(from_var(--muted-foreground)_l_c_h_/_0.6)] text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
                <Users size="14" />
                <span>{currentCollaborators.length}</span>
              </div>
              <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
                <MessageCircleMore size="14" />
                <span>4</span>
              </div>
              <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
                <ListTodo size="14" />
                <span>4/5</span>
              </div>
            </div>
            <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
              <Calendar size="14" />
              <span className="text-[var(--warning-foreground)]">1d </span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <DeleteTaskAlertDialog onOpenChange={setAlertOpen} open={alertOpen} />

      <CollaboratorDialog
        currentCollaborators={currentCollaborators}
        onConfirm={handleConfirm}
        onOpenChange={handleDialogOpen}
        onSelectedCollaboratorsChange={setSelectedCollaborators}
        open={collaboratorDialogOpen}
        selectedCollaborators={selectedCollaborators}
        users={users}
      />
    </>
  );
}
