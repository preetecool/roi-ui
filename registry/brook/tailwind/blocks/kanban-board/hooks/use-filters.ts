"use client";

import { useCallback, useMemo, useState } from "react";
import { filterTasks, toggleFilterPriority, toggleFilterTag } from "../lib/project";
import type { FilterConfig, Priority, Task } from "../types";

const DEFAULT_FILTERS: FilterConfig = { priority: [], tags: [] };

export function useFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<FilterConfig>(DEFAULT_FILTERS);

  const filteredTasks = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  const togglePriority = useCallback((priority: Priority, checked: boolean) => {
    setFilters((prev) => toggleFilterPriority(prev, priority, checked));
  }, []);

  const toggleTag = useCallback((tag: string, checked: boolean) => {
    setFilters((prev) => toggleFilterTag(prev, tag, checked));
  }, []);

  const clearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const activeFilterCount = filters.priority.length + filters.tags.length;

  return {
    filters,
    filteredTasks,
    togglePriority,
    toggleTag,
    clearFilters,
    activeFilterCount,
  };
}
