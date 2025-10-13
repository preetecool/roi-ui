"use client";

import {
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
} from "@/registry/brook/ui/alert-dialog/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/ui/avatar/avatar";
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
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuTrigger,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";
import { Calendar, LayoutList, MessageCircle, MoreHorizontal, Trash, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import styles from "./card-task.module.css";

export function CardTask() {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <Card className={styles.taskCard}>
        <CardHeader>
          <CardTitle style={{ fontSize: "1rem" }}> Update Documentation</CardTitle>
          <CardDescription>Update the card component documentation to reflect the new style</CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={(props) => (
                  <Button {...props} variant="ghost" size="icon">
                    <MoreHorizontal size="16" />
                  </Button>
                )}
              />
              <DropdownMenuPortal>
                <DropdownMenuPositioner>
                  <DropdownMenuPopup className={styles.taskDropdown} style={{ minWidth: "160px" }}>
                    <DropdownMenuItem icon={<Calendar size="14" />}>Change due date</DropdownMenuItem>
                    <DropdownMenuItem icon={<UserPlus size="14" />}>Add collaborator</DropdownMenuItem>

                    <DropdownMenuItem
                      className={styles.destructiveMenuItem}
                      icon={<Trash size="14" />}
                      onClick={() => setAlertOpen(true)}
                    >
                      Delete task
                    </DropdownMenuItem>
                  </DropdownMenuPopup>
                </DropdownMenuPositioner>
              </DropdownMenuPortal>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className={styles.contentContainer}>
            <div className={styles.badgeContainer}>
              <Badge variant="destructive" size="sm">
                <span>Urgent</span>
              </Badge>
              <Badge size="sm">
                <span>Docs</span>
              </Badge>
            </div>
            <div>
              <Avatar style={{ width: "28px", height: "28px" }}>
                <AvatarImage src="/preetecool.png" alt="profile image for @preetecool" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardContent>

        <div className={styles.divider}></div>
        <CardFooter className={styles.taskFooter}>
          <div className={styles.footerContainer}>
            <div className={styles.footerLeftGroup}>
              <div className={styles.footerItem}>
                <Users size="14" />

                <span>2</span>
              </div>
              <div className={styles.footerItem}>
                <MessageCircle size="14" />
                <span>4</span>
              </div>
              <div className={styles.footerItem}>
                <LayoutList size="14" />
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

      <AlertDialogRoot open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent
          style={{ backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))" }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this task?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              variant="destructive"
              style={{ backgroundColor: "color-mix(in oklch, var(--destructive) 90%, var(--background))" }}
              onClick={() => setAlertOpen(false)}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
}
