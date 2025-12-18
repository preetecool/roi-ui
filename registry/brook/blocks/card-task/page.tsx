import { CardTask, type User } from "./components/card-task";

const users: User[] = [
  {
    value: "preetecool",
    label: "preetecool",
    email: "@preetecool",
    avatar: "/preetecool.png",
  },
  {
    value: "john-doe",
    label: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
];

export default function Page() {
  return (
    <CardTask
      collaborators={users}
      description="Update the card component documentation to reflect the new style"
      dueDate={{ label: "1d", variant: "warning" }}
      onAddCollaborator={() => console.log("Add collaborator")}
      onDeleteTask={() => console.log("Delete task")}
      stats={{ comments: 4, subtasks: "4/5" }}
      tags={[{ label: "Urgent", variant: "destructive" }, { label: "Docs" }]}
      title="Update Documentation"
    />
  );
}
