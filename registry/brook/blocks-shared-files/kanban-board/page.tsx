"use client";

import { ProjectBoard } from "./components/project-board";
import seedData from "./data.json";
import type { KanbanData, Task } from "./types";

const data: KanbanData = {
  columns: seedData.columns,
  tasks: seedData.tasks as Task[],
  teamMembers: seedData.assignees,
};

export default function Page() {
  return <ProjectBoard data={data} />;
}
