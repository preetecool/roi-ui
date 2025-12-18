"use client";

import { useCallback, useState } from "react";
import type { Task } from "../types";

export type DialogState =
  | { mode: "closed" }
  | { mode: "create"; columnId: string }
  | { mode: "edit"; task: Task }
  | { mode: "delete"; task: Task };

export function useTaskDialog() {
  const [dialogState, setDialogState] = useState<DialogState>({ mode: "closed" });

  const openCreate = useCallback((columnId: string) => {
    setDialogState({ mode: "create", columnId });
  }, []);

  const openEdit = useCallback((task: Task) => {
    setDialogState({ mode: "edit", task });
  }, []);

  const openDelete = useCallback((task: Task) => {
    setDialogState({ mode: "delete", task });
  }, []);

  const close = useCallback(() => {
    setDialogState({ mode: "closed" });
  }, []);

  return {
    dialogState,
    openCreate,
    openEdit,
    openDelete,
    close,
    isOpen: dialogState.mode !== "closed",
  };
}
