"use client";

import type { Announcements } from "@dnd-kit/core";
import {
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useCallback, useMemo, useRef, useState } from "react";
import type { GroupByField, Priority } from "../types";
import { calculateDropIndex, getColumnName, getTargetColumnId, getTasksForGroup, PRIORITY_ORDER } from "../lib/project";

export type KanbanItemProps = {
  id: string;
  columnId: string;
  priority: string;
} & Record<string, unknown>;

export type KanbanColumnDataProps = {
  id: string;
  name: string;
} & Record<string, unknown>;

/** Get the group ID for an item based on groupBy mode */
function getItemGroupId<T extends KanbanItemProps>(item: T, groupBy: GroupByField): string {
  return groupBy === "priority" ? item.priority : item.columnId;
}

/** Apply group change to an item */
function applyGroupChange<T extends KanbanItemProps>(item: T, groupId: string, groupBy: GroupByField): T {
  if (groupBy === "priority") {
    return { ...item, priority: groupId };
  }
  return { ...item, columnId: groupId };
}

/** Get the target group ID from a drag over event */
function getOverGroupId<T extends KanbanItemProps, C extends KanbanColumnDataProps>(
  overId: string,
  data: T[],
  columns: C[],
  groupBy: GroupByField
): string | null {
  const overItem = data.find((item) => item.id === overId);
  if (overItem) {
    return getItemGroupId(overItem, groupBy);
  }

  const isOverColumn = columns.some((col) => col.id === overId);
  if (isOverColumn) {
    return overId;
  }

  return null;
}

/** Calculate the insertion index for cross-group moves */
function getCrossGroupInsertIndex<T extends KanbanItemProps, C extends KanbanColumnDataProps>(
  overId: string,
  data: T[],
  columns: C[],
  targetGroupId: string,
  activeIndex: number,
  groupBy: GroupByField
): number {
  // Check if overId is a column (not an item)
  const isOverColumn = columns.some((col) => col.id === overId);

  if (isOverColumn) {
    // Dropping on the column itself - insert at the beginning of the column
    const firstItemInColumn = data.find((item) => getItemGroupId(item, groupBy) === targetGroupId);
    if (firstItemInColumn) {
      const firstItemIndex = data.findIndex((item) => item.id === firstItemInColumn.id);
      // Adjust for removal of active item if it comes before
      if (activeIndex < firstItemIndex) {
        return firstItemIndex - 1;
      }
      return firstItemIndex;
    }
    // Empty column - append at end
    return data.length;
  }

  // Dropping on an item - find its index
  const overIndex = data.findIndex((item) => item.id === overId);
  if (overIndex === -1) {
    return data.length;
  }

  // Adjust for arrayMove behavior:
  // When activeIndex < overIndex, arrayMove places the item AFTER the target
  // position due to index shifting. We subtract 1 to place it BEFORE.
  if (activeIndex < overIndex) {
    return overIndex - 1;
  }
  return overIndex;
}

type UseKanbanDndOptions<
  T extends KanbanItemProps = KanbanItemProps,
  C extends KanbanColumnDataProps = KanbanColumnDataProps,
> = {
  data: T[];
  columns: C[];
  groupBy: GroupByField;
  enabled: boolean;
  onDataChange: (data: T[]) => void;
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
};

export function useKanbanDnd<
  T extends KanbanItemProps = KanbanItemProps,
  C extends KanbanColumnDataProps = KanbanColumnDataProps,
>({ data, columns, groupBy, enabled, onDataChange, onDragStart, onDragEnd, onDragOver }: UseKanbanDndOptions<T, C>) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const lastCrossGroupMoveRef = useRef<string | null>(null);
  const isUpdatingRef = useRef(false);
  const originalPriorityRef = useRef<string | null>(null);

  const activeItem = useMemo(() => data.find((item) => item.id === activeItemId) ?? null, [data, activeItemId]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const activeId = event.active.id as string;
      const item = data.find((i) => i.id === activeId);
      setActiveItemId(activeId);
      lastCrossGroupMoveRef.current = null;
      isUpdatingRef.current = false;
      originalPriorityRef.current = item?.priority ?? null;
      onDragStart?.(event);
    },
    [data, onDragStart]
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      // Prevent processing while an update is in flight
      if (isUpdatingRef.current) {
        return;
      }

      const { over } = event;

      if (enabled && over) {
        const activeId = event.active.id as string;
        const overId = over.id as string;
        const draggedItem = data.find((item) => item.id === activeId);

        if (draggedItem) {
          const overGroupId = getOverGroupId(overId, data, columns, groupBy);
          const draggedGroupId = getItemGroupId(draggedItem, groupBy);

          if (overGroupId && draggedGroupId !== overGroupId) {
            // Dedupe: skip if we already processed this exact cross-group move
            const moveKey = `${activeId}:${overGroupId}`;
            if (lastCrossGroupMoveRef.current === moveKey) {
              return;
            }
            lastCrossGroupMoveRef.current = moveKey;
            isUpdatingRef.current = true;

            // Cross-group move
            const newData = [...data];
            const activeIndex = newData.findIndex((item) => item.id === activeId);
            const finalIndex = getCrossGroupInsertIndex(overId, data, columns, overGroupId, activeIndex, groupBy);

            // Apply group change only (column/priority group) - priority inheritance
            // is handled in handleDragEnd based on final drop position
            newData[activeIndex] = applyGroupChange(newData[activeIndex], overGroupId, groupBy);

            onDataChange(arrayMove(newData, activeIndex, finalIndex));

            // Reset the updating flag after a microtask to allow the update to propagate
            queueMicrotask(() => {
              isUpdatingRef.current = false;
            });
            return;
          }
        }
      }

      onDragOver?.(event);
    },
    [data, columns, groupBy, enabled, onDataChange, onDragOver]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const didCrossGroupMove = lastCrossGroupMoveRef.current !== null;

      setActiveItemId(null);
      lastCrossGroupMoveRef.current = null;
      isUpdatingRef.current = false;
      originalPriorityRef.current = null;
      onDragEnd?.(event);

      if (!over || active.id === over.id) {
        return;
      }

      // For cross-group moves, apply priority inheritance based on final position
      if (didCrossGroupMove) {
        // Find the final drop target (the card we're dropping ON)
        const overItem = data.find((item) => item.id === over.id);

        if (groupBy === "column" && overItem) {
          const draggedItem = data.find((item) => item.id === active.id);
          if (draggedItem && draggedItem.priority !== overItem.priority) {
            const newData = [...data];
            const draggedIndex = newData.findIndex((item) => item.id === active.id);

            const draggedPriorityOrder = PRIORITY_ORDER[draggedItem.priority as Priority] ?? 999;
            const targetPriorityOrder = PRIORITY_ORDER[overItem.priority as Priority] ?? 999;
            const movingToHigherPriority = targetPriorityOrder < draggedPriorityOrder;

            newData[draggedIndex] = { ...newData[draggedIndex], priority: overItem.priority };

            const [removed] = newData.splice(draggedIndex, 1);
            const targetIndex = newData.findIndex((item) => item.id === over.id);

            if (movingToHigherPriority) {
              newData.splice(targetIndex, 0, removed);
            } else {
              newData.splice(targetIndex + 1, 0, removed);
            }

            onDataChange(newData);
          }
        }
        return;
      }

      // Same-group reorder
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      const newData = [...data];
      const draggedItem = newData[oldIndex];
      const targetItem = newData[newIndex];

      if (groupBy === "column" && draggedItem.priority !== targetItem.priority) {
        newData[oldIndex] = { ...draggedItem, priority: targetItem.priority };
        const targetIndex = calculateDropIndex(oldIndex, newIndex, draggedItem.priority, targetItem.priority);
        onDataChange(arrayMove(newData, oldIndex, targetIndex));
        return;
      }

      if (groupBy === "column" && draggedItem.priority === targetItem.priority) {
        const columnItems = getTasksForGroup(data, draggedItem.columnId, groupBy);
        const draggedSortedIdx = columnItems.findIndex((item) => item.id === active.id);
        const targetSortedIdx = columnItems.findIndex((item) => item.id === over.id);

        if (draggedSortedIdx === -1 || targetSortedIdx === -1) {
          return;
        }

        const filteredData = data.filter((item) => item.id !== active.id);
        const targetDataIndex = filteredData.findIndex((item) => item.id === over.id);
        const insertIndex = draggedSortedIdx < targetSortedIdx ? targetDataIndex + 1 : targetDataIndex;

        filteredData.splice(insertIndex, 0, draggedItem);
        onDataChange(filteredData);
        return;
      }

      const targetIndex = calculateDropIndex(oldIndex, newIndex, draggedItem.priority, targetItem.priority);
      onDataChange(arrayMove(newData, oldIndex, targetIndex));
    },
    [data, groupBy, onDataChange, onDragEnd]
  );

  const announcements: Announcements = useMemo(
    () => ({
      onDragStart({ active }) {
        const item = data.find((i) => i.id === active.id);
        if (!item) {
          return "";
        }
        const columnName = getColumnName(item.columnId, columns);
        return `Picked up item "${(item as { title?: string }).title ?? item.id}" from the "${columnName}" column`;
      },
      onDragOver({ active, over }) {
        const item = data.find((i) => i.id === active.id);
        if (!(item && over)) {
          return "";
        }
        const targetColumnId = getTargetColumnId(over.id as string, data, columns);
        const columnName = getColumnName(targetColumnId ?? "", columns);
        return `Dragged item "${(item as { title?: string }).title ?? item.id}" over the "${columnName}" column`;
      },
      onDragEnd({ active, over }) {
        const item = data.find((i) => i.id === active.id);
        if (!(item && over)) {
          return "";
        }
        const targetColumnId = getTargetColumnId(over.id as string, data, columns);
        const columnName = getColumnName(targetColumnId ?? "", columns);
        return `Dropped item "${(item as { title?: string }).title ?? item.id}" into the "${columnName}" column`;
      },
      onDragCancel({ active }) {
        const item = data.find((i) => i.id === active.id);
        if (!item) {
          return "";
        }
        return `Cancelled dragging item "${(item as { title?: string }).title ?? item.id}"`;
      },
    }),
    [data, columns]
  );

  return {
    activeItem,
    sensors,
    announcements,
    handleDragStart: enabled ? handleDragStart : undefined,
    handleDragOver: enabled ? handleDragOver : undefined,
    handleDragEnd: enabled ? handleDragEnd : undefined,
  };
}
