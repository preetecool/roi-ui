export type Priority = "low" | "medium" | "high" | "urgent";

export type Assignee = {
  id: string;
  name: string;
  avatar?: string;
};

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  columnId: string;
  priority: Priority;
  tags: string[];
  assignees?: Assignee[];
  subtasks?: Subtask[];
  dueDate?: string;
  createdAt: string;
};

export type Column = {
  id: string;
  name: string;
  order: number;
};

export type FilterConfig = {
  priority: Priority[];
  tags: string[];
};

export type GroupByField = "column" | "priority" | "tag";

export type KanbanData = {
  tasks: Task[];
  columns: Column[];
  teamMembers: Assignee[];
};
