import type { Column, FilterConfig, GroupByField, Priority, Task } from "../types";

export const AVAILABLE_TAGS = ["bug", "feature"] as const;
export type Tag = (typeof AVAILABLE_TAGS)[number];

export const TAG_COLORS: Record<Tag, string> = {
  bug: "var(--destructive)",
  feature: "var(--info)",
};

/** Priority sort order: urgent = 0, high = 1, medium = 2, low = 3 */
export const PRIORITY_ORDER = { urgent: 0, high: 1, medium: 2, low: 3 } as const;

/** Priority columns for grouping by priority */
export const PRIORITY_COLUMNS: Column[] = [
  { id: "urgent", name: "Urgent", order: 0 },
  { id: "high", name: "High Priority", order: 1 },
  { id: "medium", name: "Medium Priority", order: 2 },
  { id: "low", name: "Low Priority", order: 3 },
];

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

/** Group by options for view switching */
export const GROUP_BY_ITEMS: { value: GroupByField; label: string }[] = [
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
 * Filter tasks based on priority and tag filters.
 */
export function filterTasks(tasks: Task[], filters: FilterConfig): Task[] {
  return tasks.filter((task) => {
    // Priority filter
    if (filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
      return false;
    }

    // Tags filter
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag) => task.tags.includes(tag));

      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort tasks by priority (high → medium → low).
 */
export function sortByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
}

/**
 * Sort items by priority (generic version).
 */
export function sortItemsByPriority<T extends { priority: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => (PRIORITY_ORDER[a.priority as Priority] ?? 999) - (PRIORITY_ORDER[b.priority as Priority] ?? 999)
  );
}

/**
 * Get items grouped by a field.
 * All views sort by priority within each group.
 */
export function getTasksForGroup<T extends { id: string; columnId: string; priority: string; tags?: string[] }>(
  items: T[],
  groupId: string,
  groupBy: GroupByField
): T[] {
  let filtered: T[];

  if (groupBy === "column") {
    filtered = items.filter((item) => item.columnId === groupId);
  } else if (groupBy === "priority") {
    filtered = items.filter((item) => item.priority === groupId);
  } else {
    // groupBy === "tag"
    filtered = items.filter((item) => {
      const tags = (item as unknown as { tags?: string[] }).tags;
      return tags?.includes(groupId) ?? false;
    });
  }

  return sortItemsByPriority(filtered);
}

/**
 * Generate dynamic tag columns from tasks.
 */
export function getTagColumns(tasks: Task[]): Column[] {
  const tagSet = new Set<string>();
  for (const task of tasks) {
    for (const tag of task.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet)
    .sort()
    .map((tag, index) => ({
      id: tag,
      name: capitalize(tag),
      order: index,
    }));
}

/**
 * Get display columns based on groupBy field.
 */
export function getDisplayColumns(groupBy: GroupByField, columns: Column[], tasks: Task[]): Column[] {
  if (groupBy === "column") {
    return columns;
  }
  if (groupBy === "priority") {
    return PRIORITY_COLUMNS;
  }
  return getTagColumns(tasks);
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

function toggleArrayItem<T>(arr: T[], item: T, add: boolean): T[] {
  return add ? [...arr, item] : arr.filter((i) => i !== item);
}

/**
 * Toggle a priority value in the filter config.
 */
export function toggleFilterPriority(filters: FilterConfig, priority: Priority, add: boolean): FilterConfig {
  return { ...filters, priority: toggleArrayItem(filters.priority, priority, add) };
}

/**
 * Toggle a tag value in the filter config.
 */
export function toggleFilterTag(filters: FilterConfig, tag: string, add: boolean): FilterConfig {
  return { ...filters, tags: toggleArrayItem(filters.tags, tag, add) };
}

/**
 * Calculate the target index for a card drop, adjusting for priority changes.
 * When priorities differ, the index is adjusted to maintain visual consistency
 * after the subsequent priority-based sort.
 */
export function calculateDropIndex(
  oldIndex: number,
  newIndex: number,
  oldPriority: string,
  newPriority: string
): number {
  if (oldPriority === newPriority) {
    return newIndex;
  }

  const oldOrder = PRIORITY_ORDER[oldPriority as Priority] ?? 999;
  const newOrder = PRIORITY_ORDER[newPriority as Priority] ?? 999;
  const movingToHigherPriority = newOrder < oldOrder;

  if (movingToHigherPriority && oldIndex < newIndex) {
    return newIndex - 1;
  }
  if (!movingToHigherPriority && oldIndex > newIndex) {
    return newIndex + 1;
  }
  return newIndex;
}
