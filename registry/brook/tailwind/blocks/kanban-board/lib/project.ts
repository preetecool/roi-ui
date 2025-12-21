import type { Priority } from "../types";

export const AVAILABLE_TAGS = ["bug", "feature"] as const;
export type Tag = (typeof AVAILABLE_TAGS)[number];

export const TAG_COLORS: Record<Tag, string> = {
  bug: "var(--destructive)",
  feature: "var(--info)",
};

/** Priority options for dropdowns/filters */
export const PRIORITY_ITEMS: { value: Priority; label: string }[] = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

/** Tag options for dropdowns/filters */
export const TAG_ITEMS = AVAILABLE_TAGS.map((tag) => ({
  value: tag,
  label: capitalize(tag),
}));

/** Group by options for view switching (UI only) */
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

/**
 * Get tasks for a column by columnId.
 */
export function getTasksForColumn<T extends { id: string; columnId: string }>(items: T[], columnId: string): T[] {
  return items.filter((item) => item.columnId === columnId);
}

/**
 * Determine target column from a drag event's over ID.
 */
export function getTargetColumnId<T extends { id: string; columnId: string }, C extends { id: string }>(
  overId: string,
  items: T[],
  columns: C[]
): string | null {
  // Check if we're over a column
  const isOverColumn = columns.some((col) => col.id === overId);
  if (isOverColumn) {
    return overId;
  }

  // We're over another item - get that item's column
  const overItem = items.find((item) => item.id === overId);
  return overItem?.columnId ?? null;
}

/**
 * Get readable column name for accessibility announcements.
 */
export function getColumnName<C extends { id: string; name: string }>(columnId: string, columns: C[]): string {
  const column = columns.find((col) => col.id === columnId);
  return column?.name ?? columnId;
}
