"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import {
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  Circle,
  CircleAlert,
  CircleDashed,
  CircleDot,
  Command,
  Plus,
  Tag as TagIcon,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils-tailwind";
import { Button } from "@/registry/brook/tailwind/ui/button";
import { Calendar } from "@/registry/brook/tailwind/ui/calendar";
import { Checkbox, CheckboxIndicator } from "@/registry/brook/tailwind/ui/checkbox";
import { CheckboxGroup } from "@/registry/brook/tailwind/ui/checkbox-group";
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
import { PRIORITY_ITEMS, TAG_COLORS, TAG_ITEMS, type Tag } from "../lib/project";
import type { Assignee, Column, GroupByField, Priority, Subtask } from "../types";
import { DeleteDialog } from "./delete-dialog";

function parseDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

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
  return <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: TAG_COLORS[tag] }} />;
}

export type TaskDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  task?: {
    title: string;
    description: string;
    priority: Priority;
    columnId: string;
    tags: string[];
    assignees?: Assignee[];
    subtasks?: Subtask[];
    dueDate?: string;
  };
  columnId?: string;
  assignees: Assignee[];
  columns: Column[];
  groupBy: GroupByField;
  onClose: () => void;
};

export function TaskDialog({ open, mode, task, columnId, assignees, columns, groupBy, onClose }: TaskDialogProps) {
  const [form, setForm] = useState<TaskFormState>(defaultFormState);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updateField = <K extends keyof TaskFormState>(field: K, value: TaskFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const defaultColumnId = useMemo(() => columns[0]?.id ?? "", [columns]);

  useEffect(() => {
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
        columnId: columnId ?? defaultColumnId,
      });
    }
  }, [mode, task, columnId, defaultColumnId]);

  const addSubtask = useCallback(() => {
    const newSubtask: Subtask = {
      id: `subtask-${crypto.randomUUID()}`,
      title: "",
      completed: false,
    };
    setForm((prev) => ({ ...prev, subtasks: [...prev.subtasks, newSubtask] }));
  }, []);

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

  if (!open) {
    return null;
  }

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && onClose()} open>
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup
          className="max-w-[660px] overflow-visible border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)] p-5"
          data-kanban-dialog
        >
          <Form className="mt-0 flex flex-col gap-1">
            <Field name="title">
              <FieldControl
                autoFocus
                className={cn(
                  "rounded-none py-2 font-semibold text-xl leading-[1.3] tracking-[-0.01em]",
                  "placeholder:font-semibold placeholder:text-muted-foreground placeholder:text-xl placeholder:opacity-60",
                  "h-auto border-none bg-transparent p-0",
                  "focus:border-transparent focus:shadow-none focus:outline-none",
                  "focus-visible:border-transparent focus-visible:shadow-none focus-visible:outline-none"
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
                  "min-h-10 rounded-none py-1.5 text-muted-foreground text-sm",
                  "placeholder:text-sm placeholder:opacity-70",
                  "h-auto border-none bg-transparent p-0",
                  "focus:border-transparent focus:shadow-none focus:outline-none",
                  "focus-visible:border-transparent focus-visible:shadow-none focus-visible:outline-none"
                )}
                data-variant="borderless"
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Add description..."
                value={form.description}
              />
            </Field>

            <div className="mt-3 flex flex-col gap-1">
              <CheckboxGroup
                allValues={form.subtasks.map((st) => st.id)}
                aria-label="Subtasks"
                className="flex flex-col gap-0"
                onValueChange={(values) => {
                  for (const subtask of form.subtasks) {
                    const shouldBeCompleted = values.includes(subtask.id);
                    if (subtask.completed !== shouldBeCompleted) {
                      updateSubtask(subtask.id, { completed: shouldBeCompleted });
                    }
                  }
                }}
                value={form.subtasks.filter((st) => st.completed).map((st) => st.id)}
              >
                {form.subtasks.map((subtask) => (
                  <div className="group flex items-center gap-2 rounded-[var(--radius-sm)] py-1" key={subtask.id}>
                    <Checkbox
                      className={cn(
                        "h-4 w-4 rounded-[0.25rem]",
                        "data-[unchecked]:border-[oklch(from_var(--border)_l_c_h_/_0.6)]",
                        "data-[checked]:border-primary data-[checked]:bg-primary"
                      )}
                      value={subtask.id}
                    >
                      <CheckboxIndicator>
                        <Check aria-hidden="true" size={12} strokeWidth={3} />
                      </CheckboxIndicator>
                    </Checkbox>
                    <input
                      autoFocus={!subtask.title}
                      className={cn(
                        "flex-1 border-none bg-transparent py-1 text-foreground text-sm outline-none",
                        "placeholder:text-muted-foreground placeholder:opacity-60",
                        subtask.completed && "text-muted-foreground line-through"
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
                      className="flex cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border-none bg-transparent p-1 text-muted-foreground opacity-0 transition-opacity duration-150 hover:text-destructive group-hover:opacity-100"
                      onClick={() => removeSubtask(subtask.id)}
                      type="button"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </CheckboxGroup>
              <button
                className="flex cursor-pointer items-center gap-2 border-none bg-transparent py-1.5 text-muted-foreground text-sm transition-colors duration-150 hover:text-foreground"
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

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Select
                items={PRIORITY_ITEMS}
                onValueChange={(value) => updateField("priority", value as Priority)}
                value={form.priority}
              >
                <SelectTrigger
                  className="inline-flex min-w-0 items-center gap-2 [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2"
                  render={
                    <Button
                      className="border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]"
                      size="sm"
                      variant="outline"
                    />
                  }
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
                          <SelectItem className="mx-1 min-h-8 gap-3 px-2 pr-1.5" key={p.value} value={p.value}>
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
                    className="inline-flex min-w-0 items-center gap-2 [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2"
                    render={
                      <Button
                        className="border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]"
                        size="sm"
                        variant="outline"
                      />
                    }
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
                            <SelectItem className="mx-1 min-h-8 gap-3 px-2 pr-1.5" key={col.id} value={col.id}>
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
                  className="inline-flex min-w-0 items-center gap-2"
                  render={
                    <Button
                      className="border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]"
                      size="sm"
                      variant="outline"
                    />
                  }
                >
                  <span className="flex items-center justify-center text-muted-foreground">
                    <TagIcon size={14} />
                  </span>
                  {form.tags.length > 0 ? (
                    <div className="flex items-center gap-1.5">
                      {form.tags.map((tag) => (
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
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
                          <SelectItem className="mx-1 min-h-8 gap-3 px-2 pr-1.5" key={item.value} value={item.value}>
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
                  render={
                    <Button
                      className="inline-flex items-center gap-2 border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]"
                      size="sm"
                      variant="outline"
                    />
                  }
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
                        className="mb-1 min-h-8 w-full rounded-none border-0 border-b-[0.5px] border-b-[oklch(from_var(--border)_l_c_h_/_0.8)] bg-transparent pr-2.5 pl-3 text-xs focus:border-b-[oklch(from_var(--border)_l_c_h_/_0.8)] focus:shadow-none focus:outline-none"
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
                  render={
                    <Button
                      className="border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)]"
                      size="sm"
                      variant="outline"
                    />
                  }
                >
                  <span className="flex items-center justify-center text-muted-foreground">
                    <CalendarIcon size={14} />
                  </span>
                  {form.dueDate ? parseDateString(form.dueDate).toLocaleDateString() : "Due date"}
                </PopoverTrigger>
                <PopoverPopup align="start" arrow={false} className="z-[200]" sideOffset={6}>
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
                    selected={form.dueDate.length > 0 ? parseDateString(form.dueDate) : undefined}
                  />
                </PopoverPopup>
              </Popover>
            </div>

            <div className="-mx-5 mt-6 flex items-center justify-between gap-2 border-t-[0.5px] border-t-[oklch(from_var(--border)_l_c_h_/_0.4)] px-5 pt-4">
              {mode === "edit" && (
                <Button
                  className="border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.4)] text-muted-foreground hover:border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => setShowDeleteDialog(true)}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Delete
                </Button>
              )}
              <div className="ml-auto flex items-center gap-1.5">
                <Button onClick={onClose} size="sm" type="button">
                  {mode === "create" ? "Create" : "Save"}
                </Button>
              </div>
            </div>
          </Form>

          <Button
            aria-label="Close dialog"
            className="absolute top-3 right-3 opacity-50 transition-opacity duration-150 hover:opacity-100"
            render={<DialogClose />}
            size="icon"
            variant="ghost"
          >
            <X aria-hidden="true" size={16} />
          </Button>

          <DeleteDialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog} />
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}
