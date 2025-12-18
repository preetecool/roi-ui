"use client";

import { ProjectBoard } from "./components/project-board";
import { useTasks } from "./hooks/use-tasks";

export default function Page() {
  const { data, isLoaded, addTask, updateTask, deleteTask, setTasks } = useTasks();

  if (!isLoaded) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        Loading...
      </div>
    );
  }

  return (
    <ProjectBoard
      data={data}
      onAddTask={addTask}
      onDeleteTask={deleteTask}
      onTasksChange={setTasks}
      onUpdateTask={updateTask}
    />
  );
}
