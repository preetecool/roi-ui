import type { Priority } from "../types";

export const AVAILABLE_TAGS = ["bug", "feature"] as const;
export type Tag = (typeof AVAILABLE_TAGS)[number];

export const TAG_COLORS: Record<Tag, string> = {
  bug: "var(--destructive)",
  feature: "var(--info)",
};

export const PRIORITY_ITEMS: { value: Priority; label: string }[] = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export const TAG_ITEMS = AVAILABLE_TAGS.map((tag) => ({
  value: tag,
  label: capitalize(tag),
}));

export const GROUP_BY_ITEMS: { value: string; label: string }[] = [
  { value: "column", label: "Status" },
  { value: "priority", label: "Priority" },
  { value: "tag", label: "Tag" },
];

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getTasksForColumn<T extends { id: string; columnId: string }>(items: T[], columnId: string): T[] {
  return items.filter((item) => item.columnId === columnId);
}

export function getTargetColumnId<T extends { id: string; columnId: string }, C extends { id: string }>(
  overId: string,
  items: T[],
  columns: C[]
): string | null {
  const isOverColumn = columns.some((col) => col.id === overId);
  if (isOverColumn) {
    return overId;
  }
  const overItem = items.find((item) => item.id === overId);
  return overItem?.columnId ?? null;
}

export function getColumnName<C extends { id: string; name: string }>(columnId: string, columns: C[]): string {
  const column = columns.find((col) => col.id === columnId);
  return column?.name ?? columnId;
}

export function parseDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

export function formatDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
