"use client";

import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Circle,
  CircleAlert,
  CircleDashed,
  CircleDot,
  Command,
  Plus,
  Square,
  SquareCheck,
  Tag as TagIcon,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils-tailwind";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/registry/brook/tailwind/ui/alert-dialog";
import { Button } from "@/registry/brook/tailwind/ui/button";
import { Calendar } from "@/registry/brook/tailwind/ui/calendar";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
} from "@/registry/brook/tailwind/ui/combobox";
import { Dialog, DialogClose, DialogOverlay, DialogPopup, DialogPortal } from "@/registry/brook/tailwind/ui/dialog";
import { Field, FieldControl, FieldError } from "@/registry/brook/tailwind/ui/field";
import { Form } from "@/registry/brook/tailwind/ui/form";
import { Input } from "@/registry/brook/tailwind/ui/input";
import { Kbd } from "@/registry/brook/tailwind/ui/kbd";
import { Popover, PopoverPopup, PopoverTrigger } from "@/registry/brook/tailwind/ui/popover";
import {
  Select,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectSpacer,
  SelectTrigger,
  SelectValue,
} from "@/registry/brook/tailwind/ui/select";
import type { Assignee, Column, GroupByField, Priority, Subtask, Task } from "../types";
import type { DialogState } from "../hooks/use-task-dialog";
import { PRIORITY_ITEMS, TAG_COLORS, TAG_ITEMS, type Tag } from "../lib/project";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type TaskFormState = {
  title: string;
  description: string;
  priority: Priority;
  columnId: string;
  tags: string[];
  assignees: Assignee[];
  subtasks: Subtask[];
  dueDate: string;
};

const defaultFormState: TaskFormState = {
  title: "",
  description: "",
  priority: "medium",
  columnId: "",
  tags: [],
  assignees: [],
  subtasks: [],
  dueDate: "",
};

const PRIORITY_CONFIG: Record<Priority, { icon: React.ReactNode; label: string }> = {
  urgent: { icon: <CircleAlert size={14} />, label: "Urgent" },
  high: { icon: <PriorityBars count={3} />, label: "High" },
  medium: { icon: <PriorityBars count={2} />, label: "Medium" },
  low: { icon: <PriorityBars count={1} />, label: "Low" },
};

const COLUMN_ICONS: Record<string, React.ReactNode> = {
  backlog: <CircleDashed size={14} />,
  todo: <Circle size={14} />,
  "in-progress": <CircleDot size={14} />,
  done: <CheckCircle2 size={14} />,
};

function PriorityBars({ count }: { count: number }) {
  return (
    <svg fill="currentColor" height="14" viewBox="0 0 14 14" width="14">
      <rect height="4" rx="1" width="3" x="1" y="9" />
      <rect height="7" opacity={count >= 2 ? 1 : 0.3} rx="1" width="3" x="5.5" y="6" />
      <rect height="10" opacity={count >= 3 ? 1 : 0.3} rx="1" width="3" x="10" y="3" />
    </svg>
  );
}

function TagDot({ tag }: { tag: Tag }) {
  return <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: TAG_COLORS[tag] }} />;
}

export type TaskDialogProps = {
  state: DialogState;
  assignees: Assignee[];
  columns: Column[];
  groupBy: GroupByField;
  onClose: () => void;
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void;
  onUpdateTask: (id: string, updates: Partial<Omit<Task, "id">>) => void;
  onDeleteTask: (id: string) => void;
};

export function TaskDialog({
  state,
  assignees,
  columns,
  groupBy,
  onClose,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: TaskDialogProps) {
  if (state.mode === "closed") {
    return null;
  }

  if (state.mode === "delete") {
    return (
      <DeleteConfirmDialog
        onClose={onClose}
        onDelete={() => {
          onDeleteTask(state.task.id);
          onClose();
        }}
        task={state.task}
      />
    );
  }

  return (
    <TaskFormDialog
      assignees={assignees}
      columnId={state.mode === "create" ? state.columnId : undefined}
      columns={columns}
      groupBy={groupBy}
      mode={state.mode}
      onAddTask={onAddTask}
      onClose={onClose}
      onDeleteTask={onDeleteTask}
      onUpdateTask={onUpdateTask}
      task={state.mode === "edit" ? state.task : undefined}
    />
  );
}

type DeleteConfirmDialogProps = {
  task: Task;
  onClose: () => void;
  onDelete: () => void;
};

function DeleteConfirmDialog({ task, onClose, onDelete }: DeleteConfirmDialogProps) {
  return (
    <AlertDialog onOpenChange={(open) => !open && onClose()} open>
      <AlertDialogContent>
        <AlertDialogTitle>Delete Task</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete "{task.title}"? This action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="outline" />}>Cancel</AlertDialogClose>
          <Button onClick={onDelete} variant="destructive">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type TaskFormDialogProps = {
  mode: "create" | "edit";
  task?: Task;
  assignees: Assignee[];
  columnId?: string;
  columns: Column[];
  groupBy: GroupByField;
  onClose: () => void;
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void;
  onUpdateTask: (id: string, updates: Partial<Omit<Task, "id">>) => void;
  onDeleteTask: (id: string) => void;
};

function TaskFormDialog({
  mode,
  task,
  assignees,
  columnId,
  columns,
  groupBy,
  onClose,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: TaskFormDialogProps) {
  const [form, setForm] = useState<TaskFormState>(defaultFormState);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const updateField = <K extends keyof TaskFormState>(field: K, value: TaskFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setErrors({});
    if (mode === "edit" && task) {
      setForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        columnId: task.columnId,
        tags: task.tags,
        assignees: task.assignees ?? [],
        subtasks: task.subtasks ?? [],
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    } else {
      setForm({
        ...defaultFormState,
        columnId: columnId ?? columns[0]?.id ?? "",
      });
    }
  }, [mode, task, columnId, columns]);

  const addSubtask = () => {
    const newSubtask: Subtask = {
      id: `subtask-${Date.now()}`,
      title: "",
      completed: false,
    };
    updateField("subtasks", [...form.subtasks, newSubtask]);
  };

  const updateSubtask = (id: string, updates: Partial<Subtask>) => {
    updateField(
      "subtasks",
      form.subtasks.map((st) => (st.id === id ? { ...st, ...updates } : st))
    );
  };

  const removeSubtask = (id: string) => {
    updateField(
      "subtasks",
      form.subtasks.filter((st) => st.id !== id)
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "l") {
        e.preventDefault();
        addSubtask();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addSubtask]);

  const handleSubmit = () => {
    const result = taskSchema.safeParse(form);

    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors);
      return;
    }

    setErrors({});

    const formData = {
      ...form,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
    };

    if (mode === "create") {
      onAddTask(formData);
    } else if (task) {
      onUpdateTask(task.id, formData);
    }

    onClose();
  };

  const handleDelete = () => {
    if (mode === "edit" && task) {
      onDeleteTask(task.id);
      onClose();
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open>
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup
          className="max-w-[660px] overflow-visible p-5 border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]"
          data-kanban-dialog
        >
          <Form className="flex flex-col gap-1 mt-0" errors={errors}>
            <Field name="title">
              <FieldControl
                autoFocus
                className={cn(
                  "text-xl font-semibold leading-[1.3] rounded-none py-2 tracking-[-0.01em]",
                  "placeholder:text-xl placeholder:font-semibold placeholder:text-muted-foreground placeholder:opacity-60",
                  "border-none bg-transparent p-0 h-auto",
                  "focus:outline-none focus:border-transparent focus:shadow-none",
                  "focus-visible:outline-none focus-visible:border-transparent focus-visible:shadow-none"
                )}
                data-variant="borderless"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("title", e.target.value)}
                placeholder={mode === "create" ? "New task..." : "Task title..."}
                render={<Input />}
                value={form.title}
              />
              <FieldError />
            </Field>

            <Field>
              <Input
                className={cn(
                  "text-sm text-muted-foreground rounded-none py-1.5 min-h-10",
                  "placeholder:text-sm placeholder:opacity-70",
                  "border-none bg-transparent p-0 h-auto",
                  "focus:outline-none focus:border-transparent focus:shadow-none",
                  "focus-visible:outline-none focus-visible:border-transparent focus-visible:shadow-none"
                )}
                data-variant="borderless"
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Add description..."
                value={form.description}
              />
            </Field>

            <div className="flex flex-col gap-1 mt-3">
              {form.subtasks.map((subtask) => (
                <div className="flex items-center gap-2 py-1 rounded-[var(--radius-sm)] group" key={subtask.id}>
                  <button
                    className="flex items-center justify-center p-0 border-none bg-transparent text-muted-foreground cursor-pointer shrink-0 transition-colors duration-150 hover:text-foreground"
                    onClick={() => updateSubtask(subtask.id, { completed: !subtask.completed })}
                    type="button"
                  >
                    {subtask.completed ? (
                      <SquareCheck className="text-primary" size={16} />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                  <input
                    autoFocus={!subtask.title}
                    className={cn(
                      "flex-1 border-none bg-transparent text-sm text-foreground outline-none py-1",
                      "placeholder:text-muted-foreground placeholder:opacity-60",
                      subtask.completed && "line-through text-muted-foreground"
                    )}
                    onChange={(e) => updateSubtask(subtask.id, { title: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSubtask();
                      }
                      if (e.key === "Backspace" && !subtask.title) {
                        e.preventDefault();
                        removeSubtask(subtask.id);
                      }
                    }}
                    placeholder="Subtask title..."
                    value={subtask.title}
                  />
                  <button
                    aria-label="Remove subtask"
                    className="flex items-center justify-center p-1 border-none bg-transparent text-muted-foreground cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-[var(--radius-sm)] hover:text-destructive"
                    onClick={() => removeSubtask(subtask.id)}
                    type="button"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button
                className="flex items-center gap-2 py-1.5 border-none bg-transparent text-muted-foreground text-sm cursor-pointer transition-colors duration-150 hover:text-foreground"
                onClick={addSubtask}
                type="button"
              >
                <Plus size={14} />
                <span>Add subtask</span>
                <Kbd className="ml-auto" size="sm">
                  <Command size={10} />L
                </Kbd>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Select
                items={PRIORITY_ITEMS}
                onValueChange={(value) => updateField("priority", value as Priority)}
                value={form.priority}
              >
                <SelectTrigger
                  className="inline-flex items-center gap-2 min-w-0 [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2"
                  render={<Button className="border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]" size="sm" variant="outline" />}
                >
                  <SelectValue>
                    {(value) => (
                      <>
                        <span
                          className={cn(
                            "flex items-center justify-center text-muted-foreground",
                            value === "urgent" && "text-[var(--urgent)]"
                          )}
                        >
                          {PRIORITY_CONFIG[value as Priority].icon}
                        </span>
                        {PRIORITY_CONFIG[value as Priority].label}
                      </>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectPortal>
                  <SelectPositioner align="start" alignItemWithTrigger={false} sideOffset={6}>
                    <SelectPopup className="min-w-[200px] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)] shadow-[var(--shadow-border-stack)]">
                      <SelectSpacer />
                      <SelectList className="p-0">
                        {PRIORITY_ITEMS.map((p) => (
                          <SelectItem
                            className="gap-3 px-2 pr-1.5 mx-1 min-h-8"
                            key={p.value}
                            value={p.value}
                          >
                            <span className="flex items-center justify-center text-muted-foreground">
                              {PRIORITY_CONFIG[p.value].icon}
                            </span>
                            <SelectItemText>{p.label}</SelectItemText>
                            <SelectItemIndicator className="text-muted-foreground" />
                          </SelectItem>
                        ))}
                      </SelectList>
                      <SelectSpacer />
                    </SelectPopup>
                  </SelectPositioner>
                </SelectPortal>
              </Select>

              {groupBy === "column" && (
                <Select
                  items={columns.map((col) => ({ value: col.id, label: col.name }))}
                  onValueChange={(value) => {
                    if (value) {
                      updateField("columnId", value);
                    }
                  }}
                  value={form.columnId}
                >
                  <SelectTrigger
                    className="inline-flex items-center gap-2 min-w-0 [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2"
                    render={<Button className="border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]" size="sm" variant="outline" />}
                  >
                    <SelectValue>
                      {(value) => {
                        const col = columns.find((c) => c.id === value);
                        return (
                          <>
                            <span className="flex items-center justify-center text-muted-foreground">
                              {COLUMN_ICONS[value] ?? <Circle size={14} />}
                            </span>
                            {col?.name ?? "Select column"}
                          </>
                        );
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectPositioner align="start" alignItemWithTrigger={false} sideOffset={6}>
                      <SelectPopup className="min-w-[200px] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)] shadow-[var(--shadow-border-stack)]">
                        <SelectSpacer />
                        <SelectList className="p-0">
                          {columns.map((col) => (
                            <SelectItem
                              className="gap-3 px-2 pr-1.5 mx-1 min-h-8"
                              key={col.id}
                              value={col.id}
                            >
                              <span className="flex items-center justify-center text-muted-foreground">
                                {COLUMN_ICONS[col.id] ?? <Circle size={14} />}
                              </span>
                              <SelectItemText>{col.name}</SelectItemText>
                              <SelectItemIndicator className="text-muted-foreground" />
                            </SelectItem>
                          ))}
                        </SelectList>
                        <SelectSpacer />
                      </SelectPopup>
                    </SelectPositioner>
                  </SelectPortal>
                </Select>
              )}

              <Select<string, true> multiple onValueChange={(values) => updateField("tags", values)} value={form.tags}>
                <SelectTrigger
                  className="inline-flex items-center gap-2 min-w-0"
                  render={<Button className="border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]" size="sm" variant="outline" />}
                >
                  <span className="flex items-center justify-center text-muted-foreground">
                    <TagIcon size={14} />
                  </span>
                  {form.tags.length > 0 ? (
                    <div className="flex items-center gap-1.5">
                      {form.tags.map((tag) => (
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          key={tag}
                          style={{ backgroundColor: TAG_COLORS[tag as Tag] }}
                        />
                      ))}
                    </div>
                  ) : (
                    "Tags"
                  )}
                </SelectTrigger>
                <SelectPortal>
                  <SelectPositioner align="start" alignItemWithTrigger={false} sideOffset={6}>
                    <SelectPopup className="min-w-[200px] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)] shadow-[var(--shadow-border-stack)]">
                      <SelectSpacer />
                      <SelectList className="p-0">
                        {TAG_ITEMS.map((item) => (
                          <SelectItem
                            className="gap-3 px-2 pr-1.5 mx-1 min-h-8"
                            key={item.value}
                            value={item.value}
                          >
                            <TagDot tag={item.value as Tag} />
                            <SelectItemText>{item.label}</SelectItemText>
                            <SelectItemIndicator className="text-muted-foreground" />
                          </SelectItem>
                        ))}
                      </SelectList>
                      <SelectSpacer />
                    </SelectPopup>
                  </SelectPositioner>
                </SelectPortal>
              </Select>

              <Combobox<Assignee, true>
                items={assignees}
                multiple
                onValueChange={(values) => updateField("assignees", values)}
                value={form.assignees}
              >
                <ComboboxPrimitive.Trigger
                  render={<Button className="inline-flex items-center gap-2 border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]" size="sm" variant="outline" />}
                >
                  <span className="flex items-center justify-center text-muted-foreground">
                    <Users size={14} />
                  </span>
                  {form.assignees.length > 0
                    ? `${form.assignees.length} assignee${form.assignees.length > 1 ? "s" : ""}`
                    : "Assignees"}
                </ComboboxPrimitive.Trigger>
                <ComboboxPortal>
                  <ComboboxPositioner side="bottom" sideOffset={6}>
                    <ComboboxPopup className="min-w-[200px] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)] shadow-[var(--shadow-border-stack)]">
                      <ComboboxInput
                        className="mb-1 pl-3 pr-2.5 w-full min-h-8 text-xs border-0 border-b-[0.5px] border-b-[oklch(from_var(--border)_l_c_h_/_0.8)] rounded-none bg-transparent focus:outline-none focus:shadow-none focus:border-b-[oklch(from_var(--border)_l_c_h_/_0.8)]"
                        placeholder="Search assignees..."
                      />
                      <ComboboxEmpty>No users found</ComboboxEmpty>
                      <ComboboxList>
                        {(assignee: Assignee) => (
                          <ComboboxItem indicatorPosition="right" key={assignee.id} value={assignee}>
                            <span style={{ flex: 1 }}>{assignee.name}</span>
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxPopup>
                  </ComboboxPositioner>
                </ComboboxPortal>
              </Combobox>

              <Popover>
                <PopoverTrigger
                  className="inline-flex items-center gap-2"
                  render={<Button className="border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]" size="sm" variant="outline" />}
                >
                  <span className="flex items-center justify-center text-muted-foreground">
                    <CalendarIcon size={14} />
                  </span>
                  {form.dueDate ? new Date(form.dueDate).toLocaleDateString() : "Due date"}
                </PopoverTrigger>
                <PopoverPopup align="start" arrow={false} className="rounded-[var(--radius)] z-[200]" sideOffset={6}>
                  <Calendar
                    className="p-0"
                    mode="single"
                    onSelect={(date) => {
                      if (date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const day = String(date.getDate()).padStart(2, "0");
                        updateField("dueDate", `${year}-${month}-${day}`);
                      } else {
                        updateField("dueDate", "");
                      }
                    }}
                    selected={form.dueDate.length > 0 ? new Date(`${form.dueDate}T00:00:00`) : undefined}
                  />
                </PopoverPopup>
              </Popover>
            </div>

            <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t-[0.5px] border-t-[oklch(from_var(--border)_l_c_h_/_0.4)] -mx-5 px-5">
              {mode === "edit" && (
                <Button
                  className="text-muted-foreground border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)] hover:text-destructive-foreground hover:bg-destructive hover:border-destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Delete
                </Button>
              )}
              <div className="flex items-center gap-1.5 ml-auto">
                <Button onClick={handleSubmit} size="sm" type="button">
                  {mode === "create" ? "Create" : "Save"}
                </Button>
              </div>
            </div>

            {mode === "edit" && task && (
              <AlertDialog onOpenChange={setShowDeleteConfirm} open={showDeleteConfirm}>
                <AlertDialogContent>
                  <AlertDialogTitle>Delete Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{task.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogClose render={<Button variant="outline" />}>Cancel</AlertDialogClose>
                    <Button onClick={handleDelete} variant="destructive">
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </Form>

          <Button
            aria-label="Close dialog"
            className="absolute right-3 top-3 opacity-50 transition-opacity duration-150 hover:opacity-100"
            render={<DialogClose />}
            size="icon"
            variant="ghost"
          >
            <X aria-hidden="true" size={16} />
          </Button>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}
