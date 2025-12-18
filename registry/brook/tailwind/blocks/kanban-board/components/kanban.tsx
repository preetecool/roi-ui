"use client";

import {
  type CollisionDetection,
  closestCorners,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  pointerWithin,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2 } from "lucide-react";
import { createContext, useContext, useMemo } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils-tailwind";
import { Card } from "@/registry/brook/tailwind/ui/card";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuSeparator,
  ContextMenuSpacer,
  ContextMenuTrigger,
} from "@/registry/brook/tailwind/ui/context-menu";
import { type KanbanColumnDataProps, type KanbanItemProps, useKanbanDnd } from "../hooks/use-kanban-dnd";
import { getTasksForGroup } from "../lib/project";
import type { GroupByField } from "../types";

// =============================================================================
// Custom Collision Detection for Kanban
// =============================================================================

const kanbanCollisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  if (pointerCollisions.length > 0) {
    return pointerCollisions;
  }
  return closestCorners(args);
};

// =============================================================================
// Context
// =============================================================================

type KanbanContextValue<T extends KanbanItemProps = KanbanItemProps> = {
  getItemsForColumn: (columnId: string) => T[];
  onEditItem: (item: T) => void;
  onDeleteItem: (item: T) => void;
};

const KanbanContext = createContext<KanbanContextValue<KanbanItemProps> | null>(null);

export function useKanbanContext<T extends KanbanItemProps = KanbanItemProps>() {
  const context = useContext(KanbanContext) as KanbanContextValue<T> | null;
  if (!context) {
    throw new Error("useKanbanContext must be used within a KanbanProvider");
  }
  return context;
}

// =============================================================================
// KanbanProvider
// =============================================================================

export type KanbanProviderProps<
  T extends KanbanItemProps = KanbanItemProps,
  C extends KanbanColumnDataProps = KanbanColumnDataProps,
> = {
  children: (column: C) => React.ReactNode;
  columns: C[];
  data: T[];
  groupBy?: GroupByField;
  className?: string;
  onDataChange: (data: T[]) => void;
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onEditItem: (item: T) => void;
  onDeleteItem: (item: T) => void;
  renderOverlay?: (item: T) => React.ReactNode;
};

export function KanbanProvider<
  T extends KanbanItemProps = KanbanItemProps,
  C extends KanbanColumnDataProps = KanbanColumnDataProps,
>({
  children,
  columns,
  data,
  groupBy = "column",
  className,
  onDataChange,
  onDragStart,
  onDragEnd,
  onDragOver,
  onEditItem,
  onDeleteItem,
  renderOverlay,
}: KanbanProviderProps<T, C>) {
  const isDragEnabled = groupBy === "column" || groupBy === "priority";

  const { activeItem, sensors, announcements, handleDragStart, handleDragOver, handleDragEnd } = useKanbanDnd({
    data,
    columns,
    groupBy,
    enabled: isDragEnabled,
    onDataChange,
    onDragStart,
    onDragEnd,
    onDragOver,
  });

  const getItemsForColumn = useMemo(
    () => (columnId: string) => getTasksForGroup(data, columnId, groupBy) as T[],
    [data, groupBy]
  );

  const contextValue = useMemo<KanbanContextValue<T>>(
    () => ({
      getItemsForColumn,
      onEditItem,
      onDeleteItem,
    }),
    [getItemsForColumn, onEditItem, onDeleteItem]
  );

  return (
    <KanbanContext.Provider value={contextValue as KanbanContextValue<KanbanItemProps>}>
      <DndContext
        accessibility={{ announcements }}
        collisionDetection={kanbanCollisionDetection}
        id="kanban-dnd"
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <div className={cn("flex min-h-0 flex-1 flex-col", className)} data-slot="kanban-root">
          <div
            className="flex min-h-0 flex-1 items-stretch gap-4 overflow-x-auto overflow-y-hidden p-4"
            data-slot="kanban-board"
          >
            {columns.map((column) => children(column))}
          </div>
        </div>
        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>{activeItem && renderOverlay ? renderOverlay(activeItem as T) : null}</DragOverlay>,
            document.body
          )}
      </DndContext>
    </KanbanContext.Provider>
  );
}

// =============================================================================
// KanbanColumn
// =============================================================================

export type KanbanColumnProps = React.ComponentProps<"div"> & {
  id: string;
};

export function KanbanColumn({ id, className, children, ...props }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      className={cn(
        "flex w-80 shrink-0 flex-col rounded-[var(--radius)] bg-[var(--col-background)]",
        className
      )}
      data-slot="kanban-column"
      ref={setNodeRef}
      {...props}
    >
      {children}
    </div>
  );
}

// =============================================================================
// KanbanColumnHeader
// =============================================================================

export type KanbanColumnHeaderProps = React.ComponentProps<"div">;

export function KanbanColumnHeader({ className, ...props }: KanbanColumnHeaderProps) {
  return (
    <div
      className={cn("flex items-center justify-between px-4 py-3", className)}
      data-slot="kanban-column-header"
      {...props}
    />
  );
}

// =============================================================================
// KanbanCardList
// =============================================================================

export type KanbanCardListProps<T extends KanbanItemProps = KanbanItemProps> = Omit<
  React.ComponentProps<"div">,
  "children" | "id"
> & {
  id: string;
  children: (item: T) => React.ReactNode;
};

export function KanbanCardList<T extends KanbanItemProps = KanbanItemProps>({
  id,
  children,
  className,
  ...props
}: KanbanCardListProps<T>) {
  const { getItemsForColumn } = useKanbanContext<T>();
  const items = getItemsForColumn(id);
  const itemIds = items.map((item) => item.id);

  return (
    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
      <div
        className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2", className)}
        data-slot="kanban-card-list"
        {...props}
      >
        {items.map(children)}
      </div>
    </SortableContext>
  );
}

// =============================================================================
// KanbanCard
// =============================================================================

export type KanbanCardProps<T extends KanbanItemProps = KanbanItemProps> = {
  id: string;
  item: T;
  children: React.ReactNode;
  isOverlay?: boolean;
  className?: string;
};

export function KanbanCard<T extends KanbanItemProps = KanbanItemProps>({
  id,
  item,
  children,
  isOverlay,
  className,
}: KanbanCardProps<T>) {
  const { onEditItem, onDeleteItem } = useKanbanContext<T>();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: isOverlay,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const cardContent = (
    <Card
      className={cn(
        "cursor-grab touch-manipulation bg-background p-4 transition-[box-shadow,border-color] duration-150 ease-out",
        "hover:bg-[oklch(from_var(--accent)_l_c_h_/_0.15)] hover:shadow-[var(--shadow-border-stack)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
        "[&[data-slot=card]]:gap-2 [&[data-slot=card]]:p-4 [&[data-slot=card]]:border-[0.5px] [&[data-slot=card]]:border-[oklch(from_var(--border)_l_c_h_/_0.3)]",
        "[&_[data-slot=card-header]]:flex [&_[data-slot=card-header]]:items-start [&_[data-slot=card-header]]:justify-between [&_[data-slot=card-header]]:gap-2 [&_[data-slot=card-header]]:p-0",
        "[&_[data-slot=card-title]]:font-medium [&_[data-slot=card-title]]:text-foreground [&_[data-slot=card-title]]:text-sm [&_[data-slot=card-title]]:leading-[1.4]",
        "[&_[data-slot=card-content]]:flex [&_[data-slot=card-content]]:flex-col [&_[data-slot=card-content]]:gap-2 [&_[data-slot=card-content]]:p-0",
        "[&_[data-slot=card-description]]:line-clamp-1 [&_[data-slot=card-description]]:text-[0.8125rem] [&_[data-slot=card-description]]:text-muted-foreground [&_[data-slot=card-description]]:leading-[1.5]",
        isDragging === true && !isOverlay && "cursor-grabbing opacity-50",
        isOverlay === true && "cursor-grabbing shadow-lg",
        className
      )}
    >
      {children}
    </Card>
  );

  if (isOverlay) {
    return cardContent;
  }

  return (
    <div className="relative block" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ContextMenu>
        <ContextMenuTrigger className="block">{cardContent}</ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuPopup>
              <ContextMenuSpacer />
              <ContextMenuItem icon={<Pencil size={14} />} onClick={() => onEditItem(item)}>
                Edit
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<Trash2 size={14} />} onClick={() => onDeleteItem(item)} variant="destructive">
                Delete
              </ContextMenuItem>
              <ContextMenuSpacer />
            </ContextMenuPopup>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenu>
    </div>
  );
}
