"use client";

import { useCallback } from "react";
import seedData from "../data.json";
import { useLocalStorage } from "./use-local-storage";
import type { KanbanData, Task } from "../types";

const STORAGE_KEY = "kanban-data";
const DEFAULT_DATA: KanbanData = {
  columns: seedData.columns,
  tasks: seedData.tasks as Task[],
  assignees: seedData.assignees,
};

export function useTasks() {
  const [data, setData, isLoaded] = useLocalStorage<KanbanData>(STORAGE_KEY, DEFAULT_DATA);

  const addTask = useCallback(
    (taskInput: Omit<Task, "id" | "createdAt">) => {
      setData((prev) => ({
        ...prev,
        tasks: [
          ...prev.tasks,
          {
            ...taskInput,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
        ],
      }));
    },
    [setData]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Omit<Task, "id">>) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
      }));
    },
    [setData]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== id),
      }));
    },
    [setData]
  );

  const moveTask = useCallback(
    (taskId: string, toColumnId: string, newPriority?: Task["priority"]) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                columnId: toColumnId,
                ...(newPriority && { priority: newPriority }),
              }
            : task
        ),
      }));
    },
    [setData]
  );

  const setTasks = useCallback(
    (tasks: Task[]) => {
      setData((prev) => ({ ...prev, tasks }));
    },
    [setData]
  );

  return {
    data,
    isLoaded,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    setTasks,
  };
}
