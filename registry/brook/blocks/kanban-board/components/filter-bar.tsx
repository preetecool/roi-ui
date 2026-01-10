"use client";

import { Check, Filter, Layers, X } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuCheckboxItemIndicator,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRadioItemIndicator,
  DropdownMenuSeparator,
  DropdownMenuSpacer,
  DropdownMenuTrigger,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";
import { capitalize, cn, GROUP_BY_ITEMS, PRIORITY_ITEMS, TAG_ITEMS } from "../lib/project";
import type { FilterConfig, GroupByField, Priority } from "../types";
import styles from "./kanban.module.css";

function CheckIcon() {
  return <Check size={12} />;
}

export type FilterBarProps = {
  className?: string;
  filters: FilterConfig;
  groupBy: GroupByField;
  onTogglePriority: (priority: Priority, checked: boolean) => void;
  onToggleTag: (tag: string, checked: boolean) => void;
  onGroupByChange: (groupBy: GroupByField) => void;
};

export function FilterBar({
  className,
  filters,
  groupBy,
  onTogglePriority,
  onToggleTag,
  onGroupByChange,
}: FilterBarProps) {
  const activeFilterCount = useMemo(
    () => filters.priority.length + filters.tags.length,
    [filters.priority.length, filters.tags.length]
  );

  const currentGroupByLabel = useMemo(
    () => GROUP_BY_ITEMS.find((item) => item.value === groupBy)?.label ?? "Group by",
    [groupBy]
  );

  const prioritySet = useMemo(() => new Set(filters.priority), [filters.priority]);
  const tagSet = useMemo(() => new Set(filters.tags), [filters.tags]);

  return (
    <div className={cn(styles.filterContainer, className)} data-slot="filter-bar">
      <div className={styles.filterBar}>
        {/* Filter Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button size="sm" variant="outline">
                <Filter size={14} style={{ color: "var(--muted-foreground)" }} />
                Filters
                {activeFilterCount > 0 && (
                  <Badge size="sm" variant="secondary">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            }
          />
          <DropdownMenuPortal>
            <DropdownMenuPositioner align="start" side="bottom" sideOffset={4}>
              <DropdownMenuPopup>
                <DropdownMenuSpacer />

                <DropdownMenuGroup>
                  <DropdownMenuGroupLabel>Priority</DropdownMenuGroupLabel>
                  {PRIORITY_ITEMS.map((item) => (
                    <DropdownMenuCheckboxItem
                      checked={prioritySet.has(item.value)}
                      key={item.value}
                      onCheckedChange={(checked) => onTogglePriority(item.value, checked)}
                    >
                      <span>{item.label}</span>
                      <DropdownMenuCheckboxItemIndicator>
                        <CheckIcon />
                      </DropdownMenuCheckboxItemIndicator>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuGroupLabel>Tags</DropdownMenuGroupLabel>
                  {TAG_ITEMS.map((item) => (
                    <DropdownMenuCheckboxItem
                      checked={tagSet.has(item.value)}
                      key={item.value}
                      onCheckedChange={(checked) => onToggleTag(item.value, checked)}
                    >
                      <span>{item.label}</span>
                      <DropdownMenuCheckboxItemIndicator>
                        <CheckIcon />
                      </DropdownMenuCheckboxItemIndicator>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSpacer />
              </DropdownMenuPopup>
            </DropdownMenuPositioner>
          </DropdownMenuPortal>
        </DropdownMenu>

        {/* Group By Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button size="sm" variant="outline">
                <Layers size={14} style={{ color: "var(--muted-foreground)" }} />
                {currentGroupByLabel}
              </Button>
            }
          />
          <DropdownMenuPortal>
            <DropdownMenuPositioner align="start" side="bottom" sideOffset={4}>
              <DropdownMenuPopup>
                <DropdownMenuSpacer />

                <DropdownMenuGroup>
                  <DropdownMenuGroupLabel>Group by</DropdownMenuGroupLabel>
                  <DropdownMenuRadioGroup
                    onValueChange={(value) => onGroupByChange(value as GroupByField)}
                    value={groupBy}
                  >
                    {GROUP_BY_ITEMS.map((item) => (
                      <DropdownMenuRadioItem key={item.value} value={item.value}>
                        {item.label}
                        <DropdownMenuRadioItemIndicator>
                          <CheckIcon />
                        </DropdownMenuRadioItemIndicator>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>

                <DropdownMenuSpacer />
              </DropdownMenuPopup>
            </DropdownMenuPositioner>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
    </div>
  );
}

export type ActiveFiltersProps = {
  className?: string;
  filters: FilterConfig;
  onRemovePriority: (priority: Priority) => void;
  onRemoveTag: (tag: string) => void;
};

export function ActiveFilters({ className, filters, onRemovePriority, onRemoveTag }: ActiveFiltersProps) {
  const hasActiveFilters = filters.priority.length > 0 || filters.tags.length > 0;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className={cn(styles.filterPills, className)} data-slot="active-filters">
      {filters.priority.map((p) => (
        <Badge className={styles.filterPill} key={p} variant="secondary">
          {capitalize(p)}
          <button
            aria-label={`Remove ${capitalize(p)} priority filter`}
            className={styles.filterPillRemove}
            onClick={() => onRemovePriority(p)}
            type="button"
          >
            <X aria-hidden="true" size={12} />
          </button>
        </Badge>
      ))}
      {filters.tags.map((tag) => (
        <Badge className={styles.filterPill} key={tag} variant="secondary">
          {capitalize(tag)}
          <button
            aria-label={`Remove ${capitalize(tag)} tag filter`}
            className={styles.filterPillRemove}
            onClick={() => onRemoveTag(tag)}
            type="button"
          >
            <X aria-hidden="true" size={12} />
          </button>
        </Badge>
      ))}
    </div>
  );
}
