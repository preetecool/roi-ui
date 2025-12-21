"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
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
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import { Calendar } from "@/registry/brook/ui/calendar/calendar";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
} from "@/registry/brook/ui/combobox/combobox";
import { Dialog, DialogClose, DialogOverlay, DialogPopup, DialogPortal } from "@/registry/brook/ui/dialog/dialog";
import { Field, FieldControl, FieldError } from "@/registry/brook/ui/field/field";
import { Form } from "@/registry/brook/ui/form/form";
import { Input } from "@/registry/brook/ui/input/input";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import { Popover, PopoverPopup, PopoverTrigger } from "@/registry/brook/ui/popover/popover";
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
} from "@/registry/brook/ui/select/select";
import { PRIORITY_ITEMS, TAG_COLORS, TAG_ITEMS, type Tag } from "../lib/project";
import type { Assignee, Column, GroupByField, Priority, Subtask } from "../types";
import styles from "./task-dialog.module.css";

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
  return <span className={styles.tagChip} style={{ backgroundColor: TAG_COLORS[tag] }} />;
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
  onDelete?: () => void;
};

export function TaskDialog({
  open,
  mode,
  task,
  columnId,
  assignees,
  columns,
  groupBy,
  onClose,
  onDelete,
}: TaskDialogProps) {
  const [form, setForm] = useState<TaskFormState>(defaultFormState);

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
        <DialogPopup className={styles.dialogPopup} data-kanban-dialog>
          <Form className={styles.taskForm}>
            <Field name="title">
              <FieldControl
                autoFocus
                className={styles.titleInput}
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
                className={styles.descriptionInput}
                data-variant="borderless"
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Add description..."
                value={form.description}
              />
            </Field>

            <div className={styles.subtasksSection}>
              {form.subtasks.map((subtask) => (
                <div className={styles.subtaskItem} key={subtask.id}>
                  <button
                    className={styles.subtaskCheckbox}
                    onClick={() => updateSubtask(subtask.id, { completed: !subtask.completed })}
                    type="button"
                  >
                    {subtask.completed ? (
                      <SquareCheck className={styles.subtaskChecked} size={16} />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                  <input
                    autoFocus={!subtask.title}
                    className={styles.subtaskInput}
                    data-completed={subtask.completed}
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
                    className={styles.subtaskRemove}
                    onClick={() => removeSubtask(subtask.id)}
                    type="button"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button className={styles.addSubtaskButton} onClick={addSubtask} type="button">
                <Plus size={14} />
                <span>Add subtask</span>
                <Kbd size="sm">
                  <Command size={10} />L
                </Kbd>
              </button>
            </div>

            <div className={styles.fieldRow}>
              <Select
                items={PRIORITY_ITEMS}
                onValueChange={(value) => updateField("priority", value as Priority)}
                value={form.priority}
              >
                <SelectTrigger render={<Button className={styles.fieldButton} size="sm" variant="outline" />}>
                  <SelectValue>
                    {(value) => (
                      <>
                        <span className={styles.fieldIcon} data-urgent={value === "urgent"}>
                          {PRIORITY_CONFIG[value as Priority].icon}
                        </span>
                        {PRIORITY_CONFIG[value as Priority].label}
                      </>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectPortal>
                  <SelectPositioner align="start" alignItemWithTrigger={false} sideOffset={6}>
                    <SelectPopup>
                      <SelectSpacer />
                      <SelectList>
                        {PRIORITY_ITEMS.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            <span className={styles.fieldIcon}>{PRIORITY_CONFIG[p.value].icon}</span>
                            <SelectItemText>{p.label}</SelectItemText>
                            <SelectItemIndicator />
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
                  <SelectTrigger render={<Button className={styles.fieldButton} size="sm" variant="outline" />}>
                    <SelectValue>
                      {(value) => {
                        const col = columns.find((c) => c.id === value);
                        return (
                          <>
                            <span className={styles.fieldIcon}>{COLUMN_ICONS[value] ?? <Circle size={14} />}</span>
                            {col?.name ?? "Select column"}
                          </>
                        );
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectPositioner align="start" alignItemWithTrigger={false} sideOffset={6}>
                      <SelectPopup>
                        <SelectSpacer />
                        <SelectList>
                          {columns.map((col) => (
                            <SelectItem key={col.id} value={col.id}>
                              <span className={styles.fieldIcon}>{COLUMN_ICONS[col.id] ?? <Circle size={14} />}</span>
                              <SelectItemText>{col.name}</SelectItemText>
                              <SelectItemIndicator />
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
                <SelectTrigger render={<Button className={styles.fieldButton} size="sm" variant="outline" />}>
                  <span className={styles.fieldIcon}>
                    <TagIcon size={14} />
                  </span>
                  {form.tags.length > 0 ? (
                    <div className={styles.tagChips}>
                      {form.tags.map((tag) => (
                        <span
                          className={styles.tagChip}
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
                    <SelectPopup>
                      <SelectSpacer />
                      <SelectList>
                        {TAG_ITEMS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            <TagDot tag={item.value as Tag} />
                            <SelectItemText>{item.label}</SelectItemText>
                            <SelectItemIndicator />
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
                  nativeButton
                  render={<Button className={styles.fieldButton} size="sm" variant="outline" />}
                >
                  <span className={styles.fieldIcon}>
                    <Users size={14} />
                  </span>
                  {form.assignees.length > 0
                    ? `${form.assignees.length} assignee${form.assignees.length > 1 ? "s" : ""}`
                    : "Assignees"}
                </ComboboxPrimitive.Trigger>
                <ComboboxPortal>
                  <ComboboxPositioner side="bottom" sideOffset={6}>
                    <ComboboxPopup className={styles.assigneesPopup}>
                      <ComboboxInput placeholder="Search assignees..." />
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
                <PopoverTrigger className={styles.fieldButton} render={<Button size="sm" variant="outline" />}>
                  <span className={styles.fieldIcon}>
                    <CalendarIcon size={14} />
                  </span>
                  {form.dueDate ? parseDateString(form.dueDate).toLocaleDateString() : "Due date"}
                </PopoverTrigger>
                <PopoverPopup align="start" arrow={false} className={styles.calendarPopup} sideOffset={6}>
                  <Calendar
                    className={styles.calendar}
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

            <div className={styles.dialogFooter}>
              {mode === "edit" && onDelete && (
                <Button
                  className={styles.deleteButton}
                  onClick={onDelete}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Delete
                </Button>
              )}
              <div className={styles.footerActions}>
                <Button onClick={onClose} size="sm" type="button">
                  {mode === "create" ? "Create" : "Save"}
                </Button>
              </div>
            </div>
          </Form>

          <Button
            aria-label="Close dialog"
            className={styles.closeButton}
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
