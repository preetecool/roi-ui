"use client";

import {
  Calendar,
  CheckCircle2,
  Circle,
  CircleDashed,
  CircleDot,
  ListTodo,
  MessageCircleMore,
  Plus,
  User,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils-tailwind";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/tailwind/ui/avatar";
import { Badge } from "@/registry/brook/tailwind/ui/badge";
import { Button } from "@/registry/brook/tailwind/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/brook/tailwind/ui/card";
import { capitalize, TAG_COLORS, type Tag } from "../lib/project";
import type { FilterConfig, GroupByField, KanbanData, Priority, Task } from "../types";
import { DeleteDialog } from "./delete-dialog";
import { ActiveFilters, FilterBar } from "./filter-bar";
import { KanbanCard, KanbanCardList, KanbanColumn, KanbanColumnHeader, KanbanProvider } from "./kanban";
import { PriorityIcon } from "./priority-icon";
import { TaskDialog } from "./task-dialog";

export type ProjectBoardProps = {
  data: KanbanData;
};

const COLUMN_ICONS: Record<string, React.ReactNode> = {
  backlog: <CircleDashed size={14} />,
  todo: <Circle size={14} />,
  "in-progress": <CircleDot size={14} />,
  done: <CheckCircle2 size={14} />,
};

function getDaysLeft(dueDate: string | undefined, now: Date | null): number | null {
  if (!(dueDate && now)) {
    return null;
  }
  const due = new Date(dueDate);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function useCurrentDate() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);
  return now;
}

function TaskCardContent({ task, onEdit }: { task: Task; onEdit?: (task: Task) => void }) {
  const now = useCurrentDate();
  const subtaskCount = task.subtasks?.length ?? 0;
  const completedSubtasks = task.subtasks?.filter((st) => st.completed).length ?? 0;
  const daysLeft = getDaysLeft(task.dueDate, now);

  const renderAssignees = () => {
    if (!task.assignees) {
      return null;
    }

    if (task.assignees.length > 0) {
      return (
        <Button
          aria-label="Edit assignees"
          className="flex h-auto items-center border-none bg-transparent p-0 hover:bg-transparent"
          onClick={() => onEdit?.(task)}
          variant="ghost"
        >
          {task.assignees.slice(0, 3).map((user) => (
            <div className="-ml-2 first:ml-0" key={user.id}>
              <Avatar className="h-6 w-6 border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.1)] text-[0.5rem]">
                <AvatarImage alt={user.name} src={user.avatar} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
          {task.assignees.length > 3 && (
            <div className="-ml-2 flex h-6 w-6 items-center justify-center rounded-full border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-muted font-medium text-[0.5rem] text-muted-foreground">
              +{task.assignees.length - 3}
            </div>
          )}
        </Button>
      );
    }

    return (
      <Button
        aria-label="Add assignees"
        className="flex h-auto items-center border-none bg-transparent p-0 hover:bg-transparent"
        onClick={() => onEdit?.(task)}
        variant="ghost"
      >
        <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-[oklch(from_var(--border)_l_c_h_/_0.4)] border-dashed text-muted-foreground transition-all duration-150 hover:border-[oklch(from_var(--border)_l_c_h_/_0.6)] hover:text-foreground">
          <Plus aria-hidden="true" size={8} />
        </div>
        <div className="-ml-2 flex h-6 w-6 items-center justify-center rounded-full border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] text-muted-foreground">
          <User aria-hidden="true" size={10} />
        </div>
      </Button>
    );
  };

  return (
    <>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {task.description ? <CardDescription>{task.description}</CardDescription> : null}
        <div className="flex items-center gap-1 pt-2" onPointerDown={(e) => e.stopPropagation()}>
          <PriorityIcon priority={task.priority} />
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag) => (
                <Badge key={tag} size="sm" variant="outline">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: TAG_COLORS[tag as Tag] }}
                  />
                  {capitalize(tag)}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <div className="-mb-1 flex flex-col gap-1" onPointerDown={(e) => e.stopPropagation()}>
        <div className="-mx-4 pt-2 pb-2">
          <div className="h-px bg-[oklch(from_var(--border)_l_c_h_/_0.2)]" />
        </div>
        <CardFooter className="flex items-center justify-between gap-2 p-0">
          <div className="flex items-center gap-2">
            {renderAssignees()}
            <Button
              aria-label="Comments"
              className={cn(
                "flex h-auto items-center justify-center gap-1 px-2 py-1",
                "rounded-[calc(var(--radius)-2px)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]",
                "text-muted-foreground transition-all duration-150",
                "hover:bg-[var(--mix-card-50-bg)] hover:text-foreground"
              )}
              onClick={() => onEdit?.(task)}
              variant="ghost"
            >
              <MessageCircleMore aria-hidden="true" size={12} />
            </Button>
            {subtaskCount > 0 && (
              <Button
                aria-label={`${completedSubtasks} of ${subtaskCount} subtasks completed`}
                className={cn(
                  "flex h-auto items-center justify-center gap-1 px-2 py-1",
                  "rounded-[calc(var(--radius)-2px)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]",
                  "text-muted-foreground transition-all duration-150",
                  "hover:bg-[var(--mix-card-50-bg)] hover:text-foreground"
                )}
                onClick={() => onEdit?.(task)}
                variant="ghost"
              >
                <ListTodo aria-hidden="true" size={12} />
                <span className="font-medium text-[0.6875rem] leading-none">
                  {completedSubtasks}/{subtaskCount}
                </span>
              </Button>
            )}
          </div>
          {daysLeft !== null && (
            <Button
              aria-label={`${daysLeft} days left`}
              className={cn(
                "flex h-auto items-center justify-center gap-1 px-2 py-1",
                "rounded-[calc(var(--radius)-2px)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]",
                "text-muted-foreground transition-all duration-150",
                "hover:bg-[var(--mix-card-50-bg)] hover:text-foreground"
              )}
              onClick={() => onEdit?.(task)}
              variant="ghost"
            >
              <Calendar aria-hidden="true" size={12} />
              <span
                className={cn(
                  "font-medium text-[0.6875rem] leading-none",
                  daysLeft >= 0 && daysLeft <= 2 && "text-[var(--warning)]",
                  daysLeft < 0 && "text-destructive"
                )}
              >
                {daysLeft}
              </span>
            </Button>
          )}
        </CardFooter>
      </div>
    </>
  );
}

const DEFAULT_FILTERS: FilterConfig = { priority: [], tags: [] };

type DialogState =
  | { mode: "closed" }
  | { mode: "create"; columnId: string }
  | { mode: "edit"; task: Task }
  | { mode: "delete"; task: Task };

export function ProjectBoard({ data }: ProjectBoardProps) {
  // Local state for tasks (for DnD)
  const [tasks, setTasks] = useState<Task[]>(data.tasks);

  // Filter state (UI only)
  const [filters, setFilters] = useState<FilterConfig>(DEFAULT_FILTERS);

  const togglePriority = useCallback((priority: Priority, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      priority: checked ? [...prev.priority, priority] : prev.priority.filter((p) => p !== priority),
    }));
  }, []);

  const toggleTag = useCallback((tag: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      tags: checked ? [...prev.tags, tag] : prev.tags.filter((t) => t !== tag),
    }));
  }, []);

  const activeFilterCount = filters.priority.length + filters.tags.length;

  // View state (UI only)
  const [groupBy, setGroupBy] = useState<GroupByField>("column");

  // Dialog state
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

  const closeDialog = useCallback(() => {
    setDialogState({ mode: "closed" });
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Toolbar */}
      <FilterBar
        filters={filters}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
        onTogglePriority={togglePriority}
        onToggleTag={toggleTag}
      />

      {activeFilterCount > 0 && (
        <div className="px-4 pb-2">
          <ActiveFilters
            filters={filters}
            onRemovePriority={(p) => togglePriority(p, false)}
            onRemoveTag={(t) => toggleTag(t, false)}
          />
        </div>
      )}

      {/* Board */}
      <KanbanProvider
        columns={data.columns}
        data={tasks}
        onDataChange={setTasks}
        onDeleteItem={openDelete}
        onEditItem={openEdit}
        renderOverlay={(task) => (
          <KanbanCard id={task.id} isOverlay item={task}>
            <TaskCardContent task={task} />
          </KanbanCard>
        )}
      >
        {(column) => (
          <KanbanColumn id={column.id} key={column.id}>
            <KanbanColumnHeader>
              <div className="flex items-center gap-2">
                {COLUMN_ICONS[column.id] ? (
                  <span className="flex items-center justify-center text-muted-foreground">
                    {COLUMN_ICONS[column.id]}
                  </span>
                ) : null}
                <h2 className="m-0 font-semibold text-sm">{column.name}</h2>
              </div>
              <Button
                aria-label={`Add task to ${column.name}`}
                onClick={() => openCreate(column.id)}
                size="icon"
                variant="ghost"
              >
                <Plus size={16} />
              </Button>
            </KanbanColumnHeader>

            <KanbanCardList<Task> id={column.id}>
              {(task) => (
                <KanbanCard id={task.id} item={task} key={task.id}>
                  <TaskCardContent onEdit={openEdit} task={task} />
                </KanbanCard>
              )}
            </KanbanCardList>
          </KanbanColumn>
        )}
      </KanbanProvider>

      {/* Task Dialog */}
      <TaskDialog
        assignees={data.teamMembers}
        columnId={dialogState.mode === "create" ? dialogState.columnId : undefined}
        columns={data.columns}
        groupBy={groupBy}
        mode={dialogState.mode === "create" ? "create" : "edit"}
        onClose={closeDialog}
        open={dialogState.mode === "create" || dialogState.mode === "edit"}
        task={dialogState.mode === "edit" ? dialogState.task : undefined}
      />

      {/* Delete Dialog (standalone - from context menu) */}
      <DeleteDialog onOpenChange={(open) => !open && closeDialog()} open={dialogState.mode === "delete"} />
    </div>
  );
}
