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
import { cn } from "@/lib/utils-tailwind";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/tailwind/ui/avatar";
import { Badge } from "@/registry/brook/tailwind/ui/badge";
import { Button } from "@/registry/brook/tailwind/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/brook/tailwind/ui/card";
import { ActiveFilters, FilterBar } from "./filter-bar";
import { KanbanCard, KanbanCardList, KanbanColumn, KanbanColumnHeader, KanbanProvider } from "./kanban";
import { PriorityIcon } from "./priority-icon";
import { TaskDialog } from "./task-dialog";
import type { KanbanData, Task } from "../types";
import { useFilters } from "../hooks/use-filters";
import { useTaskDialog } from "../hooks/use-task-dialog";
import { useView } from "../hooks/use-view";
import { capitalize, TAG_COLORS, type Tag } from "../lib/project";

export type ProjectBoardProps = {
  data: KanbanData;
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void;
  onUpdateTask: (id: string, updates: Partial<Omit<Task, "id">>) => void;
  onDeleteTask: (id: string) => void;
  onTasksChange: (tasks: Task[]) => void;
};

const COLUMN_ICONS: Record<string, React.ReactNode> = {
  backlog: <CircleDashed size={14} />,
  todo: <Circle size={14} />,
  "in-progress": <CircleDot size={14} />,
  done: <CheckCircle2 size={14} />,
};

function getDaysLeft(dueDate: string | undefined): number | null {
  if (!dueDate) {
    return null;
  }
  const due = new Date(dueDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function TaskCardContent({ task, onEdit }: { task: Task; onEdit?: (task: Task) => void }) {
  const subtaskCount = task.subtasks?.length ?? 0;
  const completedSubtasks = task.subtasks?.filter((st) => st.completed).length ?? 0;
  const daysLeft = getDaysLeft(task.dueDate);

  const renderAssignees = () => {
    if (!task.assignees) {
      return null;
    }

    if (task.assignees.length > 0) {
      return (
        <Button
          aria-label="Edit assignees"
          className="flex items-center h-auto p-0 bg-transparent border-none hover:bg-transparent"
          onClick={() => onEdit?.(task)}
          variant="ghost"
        >
          {task.assignees.slice(0, 3).map((user) => (
            <div className="-ml-2 first:ml-0" key={user.id}>
              <Avatar className="w-6 h-6 border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.1)] text-[0.5rem]">
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
            <div className="flex items-center justify-center w-6 h-6 -ml-2 rounded-full bg-muted border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] text-[0.5rem] font-medium text-muted-foreground">
              +{task.assignees.length - 3}
            </div>
          )}
        </Button>
      );
    }

    return (
      <Button
        aria-label="Add assignees"
        className="flex items-center h-auto p-0 bg-transparent border-none hover:bg-transparent"
        onClick={() => onEdit?.(task)}
        variant="ghost"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-dashed border-[oklch(from_var(--border)_l_c_h_/_0.4)] text-muted-foreground cursor-pointer transition-all duration-150 hover:border-[oklch(from_var(--border)_l_c_h_/_0.6)] hover:text-foreground">
          <Plus aria-hidden="true" size={8} />
        </div>
        <div className="flex items-center justify-center w-6 h-6 -ml-2 rounded-full bg-[var(--mix-card-33-bg)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] text-muted-foreground">
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
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: TAG_COLORS[tag as Tag] }}
                  />
                  {capitalize(tag)}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <div className="flex flex-col gap-1 -mb-1" onPointerDown={(e) => e.stopPropagation()}>
        <div className="pt-2 pb-2 -mx-4">
          <div className="h-px bg-[oklch(from_var(--border)_l_c_h_/_0.2)]" />
        </div>
        <CardFooter className="flex items-center justify-between gap-2 p-0">
          <div className="flex items-center gap-2">
            {renderAssignees()}
            <Button
              aria-label="Comments"
              className={cn(
                "flex items-center justify-center gap-1 px-2 py-1 h-auto",
                "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)] rounded-[calc(var(--radius)-2px)]",
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
                  "flex items-center justify-center gap-1 px-2 py-1 h-auto",
                  "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)] rounded-[calc(var(--radius)-2px)]",
                  "text-muted-foreground transition-all duration-150",
                  "hover:bg-[var(--mix-card-50-bg)] hover:text-foreground"
                )}
                onClick={() => onEdit?.(task)}
                variant="ghost"
              >
                <ListTodo aria-hidden="true" size={12} />
                <span className="text-[0.6875rem] font-medium leading-none">
                  {completedSubtasks}/{subtaskCount}
                </span>
              </Button>
            )}
          </div>
          {daysLeft !== null && (
            <Button
              aria-label={`${daysLeft} days left`}
              className={cn(
                "flex items-center justify-center gap-1 px-2 py-1 h-auto",
                "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)] rounded-[calc(var(--radius)-2px)]",
                "text-muted-foreground transition-all duration-150",
                "hover:bg-[var(--mix-card-50-bg)] hover:text-foreground"
              )}
              onClick={() => onEdit?.(task)}
              variant="ghost"
            >
              <Calendar aria-hidden="true" size={12} />
              <span
                className={cn(
                  "text-[0.6875rem] font-medium leading-none",
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

export function ProjectBoard({ data, onAddTask, onUpdateTask, onDeleteTask, onTasksChange }: ProjectBoardProps) {
  // Filtering
  const { filters, filteredTasks, togglePriority, toggleTag, activeFilterCount } = useFilters(data.tasks);

  // View preferences
  const { groupBy, setGroupBy, displayColumns } = useView(data.columns, data.tasks);

  // Dialog state
  const { dialogState, openCreate, openEdit, openDelete, close } = useTaskDialog();

  return (
    <div className="flex flex-col flex-1 min-h-0">
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
        columns={displayColumns}
        data={filteredTasks}
        groupBy={groupBy}
        onDataChange={onTasksChange}
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
                <h2 className="text-sm font-semibold m-0">{column.name}</h2>
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

      {/* Dialog */}
      <TaskDialog
        assignees={data.assignees}
        columns={data.columns}
        groupBy={groupBy}
        onAddTask={onAddTask}
        onClose={close}
        onDeleteTask={onDeleteTask}
        onUpdateTask={onUpdateTask}
        state={dialogState}
      />
    </div>
  );
}
