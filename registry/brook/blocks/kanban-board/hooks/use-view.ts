"use client";

import { useCallback, useMemo, useState } from "react";
import type { Column, GroupByField, Task } from "../types";
import { getDisplayColumns, getTasksForGroup } from "../lib/project";

const DEFAULT_GROUP_BY: GroupByField = "column";

export function useView(columns: Column[], tasks: Task[]) {
  const [groupBy, setGroupBy] = useState<GroupByField>(DEFAULT_GROUP_BY);

  const displayColumns = useMemo(() => getDisplayColumns(groupBy, columns, tasks), [groupBy, columns, tasks]);

  const getTasksForColumn = useCallback(
    (columnId: string, filteredTasks: Task[]) => getTasksForGroup(filteredTasks, columnId, groupBy),
    [groupBy]
  );

  const isDragEnabled = groupBy === "column" || groupBy === "priority";

  return {
    groupBy,
    setGroupBy,
    displayColumns,
    getTasksForColumn,
    isDragEnabled,
  };
}
