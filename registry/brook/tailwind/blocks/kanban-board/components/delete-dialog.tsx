"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/registry/brook/tailwind/ui/alert-dialog";
import { Button } from "@/registry/brook/tailwind/ui/button";

export type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteDialog({ open, onOpenChange }: DeleteDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent className="flex max-w-[400px] flex-col items-center gap-2">
        <div className="mb-3 flex size-16 items-center justify-center rounded-lg bg-destructive/15">
          <Trash2 className="text-destructive" size={28} />
        </div>
        <AlertDialogTitle className="text-center font-medium text-base">Delete task?</AlertDialogTitle>
        <AlertDialogDescription className="text-center text-base">This action cannot be undone.</AlertDialogDescription>
        <AlertDialogFooter className="mt-4 flex w-full flex-row gap-3">
          <AlertDialogClose render={<Button className="flex-1" variant="outline" />}>Cancel</AlertDialogClose>
          <AlertDialogClose render={<Button className="flex-1" variant="destructive" />}>Delete</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
