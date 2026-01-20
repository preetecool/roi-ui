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
  Loader2,
  Plus,
  Tag as TagIcon,
  Users,
  X,
} from "lucide-react";
import { useActionState, useCallback, useEffect, useState } from "react";
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
import { formatDateString, parseDateString, PRIORITY_ITEMS, TAG_COLORS, TAG_ITEMS, type Tag } from "../lib/project";
import type { Assignee, Column, GroupByField, Priority, Subtask } from "../types";
import { DeleteDialog } from "./delete-dialog";

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

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "success" };

const initialFormState: FormState = { status: "idle" };

async function submitTaskAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const title = formData.get("title") as string;
  if (!title?.trim()) {
    return { status: "error", message: "Title is required" };
  }

  return { status: "success" };
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
  const [formState, submitAction, isPending] = useActionState(submitTaskAction, initialFormState);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [subtasks, setSubtasks] = useState<Subtask[]>(task?.subtasks ?? []);
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.split("T")[0] : "");

  const defaultColumnId = columns[0]?.id ?? "";
  const defaultPriority = task?.priority ?? "medium";
  const defaultSelectedColumnId = task?.columnId ?? columnId ?? defaultColumnId;
  const defaultTags = task?.tags ?? [];
  const defaultAssignees = task?.assignees ?? [];

  const addSubtask = useCallback(() => {
    const newSubtask: Subtask = {
      id: `subtask-${crypto.randomUUID()}`,
      title: "",
      completed: false,
    };
    setSubtasks((prev) => [...prev, newSubtask]);
  }, []);

  const updateSubtask = useCallback((id: string, updates: Partial<Subtask>) => {
    setSubtasks((prev) => prev.map((st) => (st.id === id ? { ...st, ...updates } : st)));
  }, []);

  const removeSubtask = useCallback((id: string) => {
    setSubtasks((prev) => prev.filter((st) => st.id !== id));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "l") {
        e.preventDefault();
        addSubtask();
      }
    },
    [addSubtask]
  );

  useEffect(() => {
    if (formState.status === "success") {
      onClose();
    }
  }, [formState.status, onClose]);

  if (!open) {
    return null;
  }

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && onClose()} open>
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup
          className="max-w-[660px] overflow-visible p-5"
          data-kanban-dialog
          onKeyDown={handleKeyDown}
        >
          <form action={submitAction} className="mt-0 flex flex-col gap-1">
            <input name="subtasks" type="hidden" value={JSON.stringify(subtasks)} />
            <input name="dueDate" type="hidden" value={dueDate} />

            <Input
              autoFocus
              className={cn(
                "rounded-none py-2 font-semibold text-xl leading-[1.3] tracking-[-0.01em]",
                "placeholder:font-semibold placeholder:text-muted-foreground placeholder:text-xl placeholder:opacity-60",
                "h-auto border-none bg-transparent p-0 shadow-none",
                "focus:border-transparent focus:shadow-none focus:outline-none",
                "focus-visible:border-transparent focus-visible:shadow-none focus-visible:outline-none"
              )}
              data-variant="borderless"
              defaultValue={task?.title ?? ""}
              name="title"
              placeholder={mode === "create" ? "New task..." : "Task title..."}
            />
            {formState.status === "error" && (
              <p className="m-0 text-destructive text-xs">{formState.message}</p>
            )}

            <Input
              className={cn(
                "min-h-10 rounded-none py-1.5 text-muted-foreground text-sm",
                "placeholder:text-sm placeholder:opacity-70",
                "h-auto border-none bg-transparent p-0 shadow-none",
                "focus:border-transparent focus:shadow-none focus:outline-none",
                "focus-visible:border-transparent focus-visible:shadow-none focus-visible:outline-none"
              )}
              data-variant="borderless"
              defaultValue={task?.description ?? ""}
              name="description"
              placeholder="Add description..."
            />

            <div className="mt-3 flex flex-col gap-1">
              <CheckboxGroup
                allValues={subtasks.map((st) => st.id)}
                aria-label="Subtasks"
                className="flex flex-col gap-0"
                onValueChange={(values) => {
                  for (const subtask of subtasks) {
                    const shouldBeCompleted = values.includes(subtask.id);
                    if (subtask.completed !== shouldBeCompleted) {
                      updateSubtask(subtask.id, { completed: shouldBeCompleted });
                    }
                  }
                }}
                value={subtasks.filter((st) => st.completed).map((st) => st.id)}
              >
                {subtasks.map((subtask) => (
                  <div className="group flex items-center gap-2 rounded-[var(--radius-sm)] py-1" key={subtask.id}>
                    <Checkbox
                      className={cn(
                        "h-4 w-4 rounded-[0.25rem]",
                        "data-[unchecked]:border-[oklch(from_var(--border)_l_c_h_/_0.6)]",
                        "data-[checked]:border-primary data-[checked]:bg-primary"
                      )}
                      name={`subtask-${subtask.id}`}
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
                      name={`subtask-title-${subtask.id}`}
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
              <Select defaultValue={defaultPriority} items={PRIORITY_ITEMS} name="priority">
                <SelectTrigger
                  className="inline-flex items-center gap-2 whitespace-nowrap [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2"
                  render={
                    <Button
                      className="shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4)]"
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
                  <SelectPositioner align="start" alignItemWithTrigger={false} className="min-w-[140px]" sideOffset={6}>
                    <SelectPopup
                      className="w-[200px] shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4)] shadow-[var(--shadow-border-stack)]"
                      data-slot="select-popup"
                    >
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
                  defaultValue={defaultSelectedColumnId}
                  items={columns.map((col) => ({ value: col.id, label: col.name }))}
                  name="columnId"
                >
                  <SelectTrigger
                    className="inline-flex items-center gap-2 whitespace-nowrap [&_[data-slot=select-value]]:flex [&_[data-slot=select-value]]:items-center [&_[data-slot=select-value]]:gap-2"
                    render={
                      <Button
                        className="shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4)]"
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
                    <SelectPositioner align="start" alignItemWithTrigger={false} className="min-w-[160px]" sideOffset={6}>
                      <SelectPopup
                        className="w-[200px] shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4)] shadow-[var(--shadow-border-stack)]"
                        data-slot="select-popup"
                      >
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

              <Select<string, true> defaultValue={defaultTags} multiple name="tags">
                <SelectTrigger
                  className="inline-flex items-center gap-2 whitespace-nowrap"
                  render={
                    <Button
                      className="shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4)]"
                      size="sm"
                      variant="outline"
                    />
                  }
                >
                  <span className="flex items-center justify-center text-muted-foreground">
                    <TagIcon size={14} />
                  </span>
                  <SelectValue>
                    {(value) =>
                      Array.isArray(value) && value.length > 0 ? (
                        <div className="flex items-center gap-1.5">
                          {value.map((tag) => (
                            <span
                              className="h-2 w-2 shrink-0 rounded-full"
                              key={tag}
                              style={{ backgroundColor: TAG_COLORS[tag as Tag] }}
                            />
                          ))}
                        </div>
                      ) : (
                        "Tags"
                      )
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectPortal>
                  <SelectPositioner align="start" alignItemWithTrigger={false} className="min-w-[130px]" sideOffset={6}>
                    <SelectPopup
                      className="w-[200px] shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4)] shadow-[var(--shadow-border-stack)]"
                      data-slot="select-popup"
                    >
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

              <Combobox<Assignee, true> defaultValue={defaultAssignees} items={assignees} multiple name="assignees">
                <ComboboxPrimitive.Trigger
                  render={
                    <Button
                      className="inline-flex items-center gap-2 whitespace-nowrap shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4)]"
                      size="sm"
                      variant="outline"
                    />
                  }
                >
                  <span className="flex items-center justify-center text-muted-foreground">
                    <Users size={14} />
                  </span>
                  <ComboboxPrimitive.Value>
                    {(value) =>
                      Array.isArray(value) && value.length > 0
                        ? `${value.length} assignee${value.length > 1 ? "s" : ""}`
                        : "Assignees"
                    }
                  </ComboboxPrimitive.Value>
                </ComboboxPrimitive.Trigger>
                <ComboboxPortal>
                  <ComboboxPositioner side="bottom" sideOffset={6}>
                    <ComboboxPopup className="w-[200px] min-w-0 shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4)] shadow-[var(--shadow-border-stack)]">
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
                      className="shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4)]"
                      size="sm"
                      variant="outline"
                    />
                  }
                >
                  <span className="flex items-center justify-center text-muted-foreground">
                    <CalendarIcon size={14} />
                  </span>
                  {dueDate ? parseDateString(dueDate).toLocaleDateString() : "Due date"}
                </PopoverTrigger>
                <PopoverPopup align="start" arrow={false} className="z-[200]" sideOffset={6}>
                  <Calendar
                    className="p-0"
                    mode="single"
                    onSelect={(date) => {
                      setDueDate(date ? formatDateString(date) : "");
                    }}
                    selected={dueDate.length > 0 ? parseDateString(dueDate) : undefined}
                  />
                </PopoverPopup>
              </Popover>
            </div>

            <div className="-mx-5 mt-6 flex items-center justify-between gap-2 border-t-[0.5px] border-t-[oklch(from_var(--border)_l_c_h_/_0.4)] px-5 pt-4">
              {mode === "edit" && (
                <Button
                  className="text-muted-foreground shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4)] hover:border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => setShowDeleteDialog(true)}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Delete
                </Button>
              )}
              <div className="ml-auto flex items-center gap-1.5">
                <Button disabled={isPending} size="sm" type="submit">
                  {mode === "create" ? "Create" : "Save"}
                  {isPending && <Loader2 aria-hidden="true" className="animate-spin" size={14} />}
                </Button>
              </div>
            </div>
          </form>

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
