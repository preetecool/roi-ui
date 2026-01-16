"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
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
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useActionState, useCallback, useEffect, useId, useState } from "react";
import {
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/registry/brook/ui/alert-dialog/alert-dialog";
import { Button } from "@/registry/brook/ui/button/button";
import { Checkbox, CheckboxIndicator } from "@/registry/brook/ui/checkbox/checkbox";
import { CheckboxGroup } from "@/registry/brook/ui/checkbox-group/checkbox-group";
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
import { Input } from "@/registry/brook/ui/input/input";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
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
import styles from "./kanban.module.css";

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

type SubtaskSectionProps = {
  subtasks: Subtask[];
  onAddSubtask: () => void;
  onUpdateSubtask: (id: string, updates: Partial<Subtask>) => void;
  onRemoveSubtask: (id: string) => void;
};

function SubtaskSection({ subtasks, onAddSubtask, onUpdateSubtask, onRemoveSubtask }: SubtaskSectionProps) {
  const labelId = useId();

  const handleValueChange = (newValue: string[]) => {
    const newSet = new Set(newValue);
    for (const subtask of subtasks) {
      const shouldBeCompleted = newSet.has(subtask.id);
      if (subtask.completed !== shouldBeCompleted) {
        onUpdateSubtask(subtask.id, { completed: shouldBeCompleted });
      }
    }
  };

  return (
    <div className={styles.subtasksSection}>
      <span className={styles.srOnly} id={labelId}>
        Subtasks
      </span>
      <CheckboxGroup
        allValues={subtasks.map((s) => s.id)}
        aria-labelledby={labelId}
        onValueChange={handleValueChange}
        value={subtasks.filter((s) => s.completed).map((s) => s.id)}
      >
        {subtasks.map((subtask) => (
          <div className={styles.subtaskItem} key={subtask.id}>
            <Checkbox className={styles.subtaskCheckbox} name={`subtask-${subtask.id}`} value={subtask.id}>
              <CheckboxIndicator>
                <Check aria-hidden="true" size={12} strokeWidth={3} />
              </CheckboxIndicator>
            </Checkbox>
            <input
              autoFocus={!subtask.title}
              className={styles.subtaskInput}
              data-completed={subtask.completed}
              name={`subtask-title-${subtask.id}`}
              onChange={(e) => onUpdateSubtask(subtask.id, { title: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddSubtask();
                }
                if (e.key === "Backspace" && !subtask.title) {
                  e.preventDefault();
                  onRemoveSubtask(subtask.id);
                }
              }}
              placeholder="Subtask title..."
              value={subtask.title}
            />
            <button
              aria-label="Remove subtask"
              className={styles.subtaskRemove}
              onClick={() => onRemoveSubtask(subtask.id)}
              type="button"
            >
              <X aria-hidden="true" size={14} />
            </button>
          </div>
        ))}
      </CheckboxGroup>
      <button className={styles.addSubtaskButton} onClick={onAddSubtask} type="button">
        <Plus aria-hidden="true" size={14} />
        <span>Add subtask</span>
        <Kbd size="sm">
          <Command aria-hidden="true" size={10} />L
        </Kbd>
      </button>
    </div>
  );
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
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [subtasks, setSubtasks] = useState<Subtask[]>(task?.subtasks ?? []);

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
        <DialogPopup className={styles.dialogPopup} data-kanban-dialog onKeyDown={handleKeyDown}>
          <form action={submitAction} className={styles.taskForm}>
            <input name="subtasks" type="hidden" value={JSON.stringify(subtasks)} />

            <Input
              autoFocus
              className={styles.titleInput}
              data-variant="borderless"
              defaultValue={task?.title ?? ""}
              name="title"
              placeholder={mode === "create" ? "New task..." : "Task title..."}
            />
            {formState.status === "error" && <p className={styles.fieldError}>{formState.message}</p>}

            <Input
              className={styles.descriptionInput}
              data-variant="borderless"
              defaultValue={task?.description ?? ""}
              name="description"
              placeholder="Add description..."
            />

            <SubtaskSection
              onAddSubtask={addSubtask}
              onRemoveSubtask={removeSubtask}
              onUpdateSubtask={updateSubtask}
              subtasks={subtasks}
            />

            <div className={styles.fieldRow}>
              <Select defaultValue={defaultPriority} items={PRIORITY_ITEMS} name="priority">
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
                  <SelectPositioner
                    align="start"
                    alignItemWithTrigger={false}
                    className={styles.priorityPositioner}
                    sideOffset={6}
                  >
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
                  defaultValue={defaultSelectedColumnId}
                  items={columns.map((col) => ({ value: col.id, label: col.name }))}
                  name="columnId"
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
                    <SelectPositioner
                      align="start"
                      alignItemWithTrigger={false}
                      className={styles.columnPositioner}
                      sideOffset={6}
                    >
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

              <Select<string, true> defaultValue={defaultTags} multiple name="tags">
                <SelectTrigger render={<Button className={styles.fieldButton} size="sm" variant="outline" />}>
                  <span className={styles.fieldIcon}>
                    <TagIcon size={14} />
                  </span>
                  <SelectValue>
                    {(value) =>
                      Array.isArray(value) && value.length > 0 ? (
                        <div className={styles.tagChips}>
                          {value.map((tag) => (
                            <span
                              className={styles.tagChip}
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
                  <SelectPositioner
                    align="start"
                    alignItemWithTrigger={false}
                    className={styles.tagsPositioner}
                    sideOffset={6}
                  >
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

              <Combobox<Assignee, true> defaultValue={defaultAssignees} items={assignees} multiple name="assignees">
                <ComboboxPrimitive.Trigger
                  render={<Button className={styles.fieldButton} size="sm" variant="outline" />}
                >
                  <span className={styles.fieldIcon}>
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

              <div className={styles.dueDateField}>
                <CalendarIcon className={styles.dueDateIcon} size={14} />
                <input
                  className={styles.dueDateInput}
                  defaultValue={task?.dueDate?.split("T")[0] ?? ""}
                  name="dueDate"
                  type="date"
                />
              </div>
            </div>

            <div className={styles.dialogFooter}>
              {mode === "edit" && (
                <Button
                  className={styles.deleteButton}
                  onClick={() => setDeleteConfirmOpen(true)}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Delete
                </Button>
              )}
              <div className={styles.footerActions}>
                <Button disabled={isPending} size="sm" type="submit">
                  {isPending ? "Saving..." : mode === "create" ? "Create" : "Save"}
                </Button>
              </div>
            </div>
          </form>

          <Button
            aria-label="Close dialog"
            className={styles.closeButton}
            nativeButton
            render={<DialogClose />}
            size="icon"
            variant="ghost"
          >
            <X aria-hidden="true" size={16} />
          </Button>
        </DialogPopup>
      </DialogPortal>

      <AlertDialog.Root onOpenChange={setDeleteConfirmOpen} open={deleteConfirmOpen}>
        <AlertDialogPopup className={styles.deleteDialog}>
          <div className={styles.deleteIconWrapper}>
            <Trash2 className={styles.deleteIcon} size={28} />
          </div>
          <AlertDialogTitle>Delete task?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="outline" />}>Cancel</AlertDialogClose>
            <AlertDialogClose render={<Button variant="destructive" />}>Delete</AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog.Root>
    </Dialog>
  );
}
