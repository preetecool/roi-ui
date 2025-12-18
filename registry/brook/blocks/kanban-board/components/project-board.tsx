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
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/ui/avatar/avatar";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/brook/ui/card/card";
import { useFilters } from "../hooks/use-filters";
import { useTaskDialog } from "../hooks/use-task-dialog";
import { useView } from "../hooks/use-view";
import { capitalize, TAG_COLORS, type Tag } from "../lib/project";
import type { KanbanData, Task } from "../types";
import { ActiveFilters, FilterBar } from "./filter-bar";
import { KanbanCard, KanbanCardList, KanbanColumn, KanbanColumnHeader, KanbanProvider } from "./kanban";
import { PriorityIcon } from "./priority-icon";
import styles from "./project-board.module.css";
import { TaskDialog } from "./task-dialog";

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
          className={styles.avatarGroup}
          onClick={() => onEdit?.(task)}
          variant="ghost"
        >
          {task.assignees.slice(0, 3).map((user) => (
            <div className={styles.avatarWrapper} key={user.id}>
              <Avatar className={styles.avatar}>
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
          {task.assignees.length > 3 && <div className={styles.avatarOverflow}>+{task.assignees.length - 3}</div>}
        </Button>
      );
    }

    return (
      <Button aria-label="Add assignees" className={styles.avatarGroup} onClick={() => onEdit?.(task)} variant="ghost">
        <div className={styles.avatarPlaceholderAdd}>
          <Plus aria-hidden="true" size={8} />
        </div>
        <div className={styles.avatarPlaceholderUser}>
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
        <div className={styles.cardMeta} onPointerDown={(e) => e.stopPropagation()}>
          <PriorityIcon priority={task.priority} />
          {task.tags.length > 0 && (
            <div className={styles.cardTags}>
              {task.tags.map((tag) => (
                <Badge key={tag} size="sm" variant="outline">
                  <span className={styles.tagDot} style={{ backgroundColor: TAG_COLORS[tag as Tag] }} />
                  {capitalize(tag)}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <div className={styles.cardFooterWrapper} onPointerDown={(e) => e.stopPropagation()}>
        <div className={styles.cardDividerWrapper}>
          <div className={styles.cardDivider} />
        </div>
        <CardFooter className={styles.cardFooter}>
          <div className={styles.footerLeft}>
            {renderAssignees()}
            <Button aria-label="Comments" className={styles.footerIcon} onClick={() => onEdit?.(task)} variant="ghost">
              <MessageCircleMore aria-hidden="true" size={12} />
            </Button>
            {subtaskCount > 0 && (
              <Button
                aria-label={`${completedSubtasks} of ${subtaskCount} subtasks completed`}
                className={styles.footerIcon}
                onClick={() => onEdit?.(task)}
                variant="ghost"
              >
                <ListTodo aria-hidden="true" size={12} />
                <span className={styles.footerIconCount}>
                  {completedSubtasks}/{subtaskCount}
                </span>
              </Button>
            )}
          </div>
          {daysLeft !== null && (
            <Button
              aria-label={`${daysLeft} days left`}
              className={styles.footerIcon}
              data-overdue={daysLeft < 0}
              data-urgent={daysLeft >= 0 && daysLeft <= 2}
              onClick={() => onEdit?.(task)}
              variant="ghost"
            >
              <Calendar aria-hidden="true" size={12} />
              <span className={styles.footerIconCount}>{daysLeft}</span>
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
    <div className={styles.container}>
      {/* Toolbar */}
      <FilterBar
        filters={filters}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
        onTogglePriority={togglePriority}
        onToggleTag={toggleTag}
      />

      {activeFilterCount > 0 && (
        <div className={styles.activeFilters}>
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
            <KanbanColumnHeader className={styles.columnHeader}>
              <div className={styles.columnHeaderLeft}>
                {COLUMN_ICONS[column.id] ? <span className={styles.columnIcon}>{COLUMN_ICONS[column.id]}</span> : null}
                <h2 className={styles.columnTitle}>{column.name}</h2>
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
