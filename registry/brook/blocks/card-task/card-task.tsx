"use client";

import {
  Calendar,
  ListTodo,
  MessageCircleMore,
  MoreHorizontal,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/brook/ui/alert-dialog/alert-dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/ui/avatar/avatar";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/brook/ui/card/card";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "@/registry/brook/ui/combobox/combobox";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
  DialogTitle,
} from "@/registry/brook/ui/dialog/dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/ui/tooltip/tooltip";
import styles from "./card-task.module.css";

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
  const [currentCollaborators] = useState<User[]>([users[0]]);
  const comboboxAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Card className={styles.taskCard}>
        <CardHeader>
          <CardTitle style={{ fontSize: "1rem" }}>
            {" "}
            Update Documentation
          </CardTitle>
          <CardDescription>
            Update the card component documentation to reflect the new style
          </CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={(props) => (
                  <Button {...props} size="icon" variant="ghost">
                    <MoreHorizontal size="16" style={{ color: "oklch(from var(--muted-foreground) l c h / 0.8)" }} />
                  </Button>
                )}
              />
              <DropdownMenuPortal>
                <DropdownMenuPositioner sideOffset={8}>
                  <DropdownMenuPopup
                    render={<ul />}
                    style={{ minWidth: "160px" }}
                  >
                    <div style={{ height: "4px", width: "100%" }} />
                    <DropdownMenuItem
                      icon={<UserPlus size="14" />}
                      onClick={() => setCollaboratorDialogOpen(true)}
                      render={<li />}
                    >
                      Add collaborator
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      icon={<Calendar size="14" />}
                      render={<li />}
                    >
                      Change due date
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className={styles.destructiveMenuItem}
                      icon={<Trash size="14" />}
                      onClick={() => setAlertOpen(true)}
                      render={<li />}
                    >
                      Delete task
                    </DropdownMenuItem>
                    <div style={{ height: "4px", width: "100%" }} />
                  </DropdownMenuPopup>
                </DropdownMenuPositioner>
              </DropdownMenuPortal>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className={styles.contentContainer}>
            <div className={styles.badgeContainer}>
              <Badge size="sm" variant="destructive">
                <span>Urgent</span>
              </Badge>
              <Badge size="sm">
                <span>Docs</span>
              </Badge>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <div>
                      <Avatar style={{ width: "24px", height: "24px" }}>
                        <AvatarImage
                          alt="profile image for @preetecool"
                          src="/preetecool.png"
                        />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </div>
                  }
                />
                <TooltipPortal>
                  <TooltipPositioner>
                    <TooltipPopup>
                      <TooltipArrow />
                      preetecool
                    </TooltipPopup>
                  </TooltipPositioner>
                </TooltipPortal>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>

        <CardFooter className={styles.taskFooter}>
          <div style={{ padding: "5px 0", width: "calc(100% + 32px)", marginLeft: "-16px", marginRight: "-16px" }}>
            <div style={{ height: "1px", width: "100%", borderBottom: "0.5px solid oklch(from var(--border) l c h / 0.6)" }} />
          </div>
          <div className={styles.footerContainer}>
            <div className={styles.footerLeftGroup}>
              <div className={styles.footerItem}>
                <Users size="14" />

                <span>2</span>
              </div>
              <div className={styles.footerItem}>
                <MessageCircleMore size="14" />
                <span>4</span>
              </div>
              <div className={styles.footerItem}>
                <ListTodo size="14" />
                <span>4/5</span>
              </div>
            </div>
            <div className={styles.footerItem}>
              <Calendar size="14" />
              <span className={styles.tomorrowText}>1d </span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog onOpenChange={setAlertOpen} open={alertOpen}>
        <AlertDialogContent className={styles.alertContent}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription className={styles.alertDescription}>
              Are you sure you want to delete this task?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={styles.alertFooter}>
            <AlertDialogClose
              render={<Button variant="outline">Cancel</Button>}
            />
            <Button onClick={() => setAlertOpen(false)} variant="destructive">
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        onOpenChange={setCollaboratorDialogOpen}
        open={collaboratorDialogOpen}
      >
        <DialogPortal>
          <DialogOverlay />
          <DialogPopup style={{ maxWidth: "410px" }}>
            <DialogHeader>
              <DialogTitle>Add Collaborator</DialogTitle>
              <DialogDescription>
                Invite a team member to collaborate on this task.
              </DialogDescription>
            </DialogHeader>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {/* Current Collaborators */}
              <div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  Current Collaborators
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <TooltipProvider>
                    {currentCollaborators.map((collaborator) => (
                      <Tooltip key={collaborator.value}>
                        <TooltipTrigger
                          render={
                            <div>
                              <Avatar style={{ width: "32px", height: "32px" }}>
                                <AvatarImage
                                  alt={collaborator.label}
                                  src={collaborator.avatar}
                                />
                                <AvatarFallback>
                                  {collaborator.label
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          }
                        />
                        <TooltipPortal>
                          <TooltipPositioner>
                            <TooltipPopup>
                              <TooltipArrow />
                              {collaborator.label}
                            </TooltipPopup>
                          </TooltipPositioner>
                        </TooltipPortal>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
              </div>

              {/* Add New Collaborator */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Add New Collaborator
                </div>
                <Combobox<User>
                  items={users}
                  itemToStringLabel={(item) => item?.label || ""}
                  itemToStringValue={(item) => item?.value || ""}
                >
                  <div
                    ref={comboboxAnchorRef}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      background: "var(--mix-card-50-bg)",
                      transition: "all 150ms ease",
                    }}
                  >
                    <ComboboxInput placeholder="Search users..." />
                    <ComboboxTrigger />
                  </div>

                  <ComboboxPortal>
                    <ComboboxPositioner anchor={comboboxAnchorRef}>
                      <ComboboxPopup style={{ width: "var(--anchor-width)" }}>
                        <ComboboxEmpty>No user found.</ComboboxEmpty>
                        <ComboboxList>
                          {(user: User) => (
                            <ComboboxItem
                              indicatorPosition="right"
                              key={user.value}
                              value={user}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "1rem",
                                  flex: 1,
                                }}
                              >
                                <Avatar
                                  style={{ width: "1.5rem", height: "1.5rem" }}
                                >
                                  <AvatarImage
                                    alt={user.label}
                                    src={user.avatar}
                                  />
                                  <AvatarFallback>
                                    {user.label
                                      .split(" ")
                                      .map((n: string) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div style={{ textAlign: "left" }}>
                                  <div
                                    style={{
                                      fontSize: "0.875rem",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {user.label}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "0.75rem",
                                      color: "var(--muted-foreground)",
                                    }}
                                  >
                                    {user.email}
                                  </div>
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

            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button onClick={() => setCollaboratorDialogOpen(false)}>
                Add
              </Button>
            </DialogFooter>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </>
  );
}
