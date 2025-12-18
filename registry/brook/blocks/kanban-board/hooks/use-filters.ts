"use client";

import { useCallback, useMemo, useState } from "react";
import type { FilterConfig, Priority, Task } from "../types";
import { filterTasks } from "../lib/project";

const DEFAULT_FILTERS: FilterConfig = { priority: [], tags: [] };

export function useFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<FilterConfig>(DEFAULT_FILTERS);

  const filteredTasks = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  const togglePriority = useCallback((priority: Priority, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      priority: checked ? [...prev.priority, priority] : prev.priority.filter((p) => p !== priority),
    }));
  }, []);

  const toggleTag = useCallback((tag: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      tags: checked ? [...prev.tags, tag] : prev.tags.filter((t) => t !== tag),
    }));
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
