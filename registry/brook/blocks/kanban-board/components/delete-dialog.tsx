"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/registry/brook/ui/alert-dialog/alert-dialog";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./kanban.module.css";

export type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteDialog({ open, onOpenChange }: DeleteDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent className={styles.deleteDialog}>
        <div className={styles.deleteIconWrapper}>
          <Trash2 className={styles.deleteIcon} size={28} />
        </div>
        <AlertDialogTitle>Delete task?</AlertDialogTitle>
        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="outline" />}>Cancel</AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" />}>Delete</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
