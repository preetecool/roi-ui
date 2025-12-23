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
import styles from "./delete-dialog.module.css";

export type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteDialog({ open, onOpenChange }: DeleteDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent data-delete-dialog>
        <div className={styles.iconWrapper}>
          <Trash2 className={styles.icon} size={28} />
        </div>
        <AlertDialogTitle>Delete task?</AlertDialogTitle>
        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button nativeButton variant="outline" />}>Cancel</AlertDialogClose>
          <AlertDialogClose render={<Button nativeButton variant="destructive" />}>Delete</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
