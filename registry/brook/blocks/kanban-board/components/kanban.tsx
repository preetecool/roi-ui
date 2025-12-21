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
import { Card } from "@/registry/brook/ui/card/card";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuSeparator,
  ContextMenuSpacer,
  ContextMenuTrigger,
} from "@/registry/brook/ui/context-menu/context-menu";
import { type KanbanColumnDataProps, type KanbanItemProps, useKanbanDnd } from "../hooks/use-kanban-dnd";
import { cn, getTasksForColumn } from "../lib/project";
import styles from "./kanban.module.css";

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
  className,
  onDataChange,
  onDragStart,
  onDragEnd,
  onDragOver,
  onEditItem,
  onDeleteItem,
  renderOverlay,
}: KanbanProviderProps<T, C>) {
  const { activeItem, sensors, announcements, handleDragStart, handleDragOver, handleDragEnd } = useKanbanDnd({
    data,
    columns,
    enabled: true,
    onDataChange,
    onDragStart,
    onDragEnd,
    onDragOver,
  });

  const getItemsForColumn = useMemo(
    () => (columnId: string) => getTasksForColumn(data, columnId) as T[],
    [data]
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
        <div className={cn(styles.root, className)} data-slot="kanban-root">
          <div className={styles.board} data-slot="kanban-board">
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
    <div className={cn(styles.column, className)} data-slot="kanban-column" ref={setNodeRef} {...props}>
      {children}
    </div>
  );
}

// =============================================================================
// KanbanColumnHeader
// =============================================================================

export type KanbanColumnHeaderProps = React.ComponentProps<"div">;

export function KanbanColumnHeader({ className, ...props }: KanbanColumnHeaderProps) {
  return <div className={cn(styles.columnHeader, className)} data-slot="kanban-column-header" {...props} />;
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
      <div className={cn(styles.columnContent, className)} data-slot="kanban-card-list" {...props}>
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
        styles.card,
        isDragging === true && !isOverlay ? styles.cardDragging : null,
        isOverlay === true ? styles.cardOverlay : null,
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
    <div className={styles.cardWrapper} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ContextMenu>
        <ContextMenuTrigger className={styles.cardTrigger}>{cardContent}</ContextMenuTrigger>
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
