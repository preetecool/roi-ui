"use client";

import { ProjectBoard } from "./components/project-board";
import { useTasks } from "./hooks/use-tasks";

export default function Page() {
  const { data, isLoaded, addTask, updateTask, deleteTask, setTasks } = useTasks();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
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
