import { Calendar, ListTodo, MessageCircleMore, MoreHorizontal, Trash, UserPlus, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/tailwind/ui/avatar";
import { Badge } from "@/registry/brook/tailwind/ui/badge";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/brook/tailwind/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/brook/tailwind/ui/dropdown-menu";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/tailwind/ui/tooltip";

export type User = {
  value: string;
  label: string;
  email: string;
  avatar: string;
};

type TaskCardProps = {
  title: string;
  description: string;
  tags: Array<{
    label: string;
    variant?: "default" | "destructive";
  }>;
  collaborators: User[];
  stats: {
    comments: number;
    subtasks: string;
  };
  dueDate: {
    label: string;
    variant?: "default" | "warning";
  };
  onAddCollaborator?: () => void;
  onDeleteTask?: () => void;
};

function AvatarGroup({ users, maxDisplay = 3 }: { users: User[]; maxDisplay?: number }) {
  const displayUsers = users.slice(0, maxDisplay);
  const remainingCount = users.length - maxDisplay;

  return (
    <TooltipProvider>
      <div className="flex items-center">
        {displayUsers.map((user, index) => (
          <Tooltip key={user.value}>
            <TooltipTrigger
              render={
                <div className={index > 0 ? "-ml-1.5" : ""}>
                  <Avatar className="h-6 w-6 border-2 border-[var(--card)]">
                    <AvatarImage alt={`profile image for ${user.label}`} src={user.avatar} />
                    <AvatarFallback>
                      {user.label
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "??"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              }
            />
            <TooltipPortal>
              <TooltipPositioner>
                <TooltipPopup>
                  <TooltipArrow />
                  {user.label}
                </TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        ))}
        {remainingCount > 0 && (
          <div className="-ml-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--muted)] font-semibold text-[0.625rem] text-[var(--muted-foreground)]">
            +{remainingCount}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

function TaskCardDropdownMenu({
  onAddCollaborator,
  onDeleteTask,
}: {
  onAddCollaborator?: () => void;
  onDeleteTask?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <Button {...props} size="icon" variant="ghost">
            <MoreHorizontal className="text-[oklch(from_var(--muted-foreground)_l_c_h_/_0.8)]" size="16" />
          </Button>
        )}
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup className="min-w-[160px]" render={<ul />}>
            <div className="h-1 w-full" />
            <DropdownMenuItem icon={<UserPlus size="14" />} onClick={onAddCollaborator} render={<li />}>
              Add collaborator
            </DropdownMenuItem>
            <DropdownMenuItem icon={<Calendar size="14" />} render={<li />}>
              Change due date
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Trash size="14" />} onClick={onDeleteTask} render={<li />} variant="destructive">
              Delete task
            </DropdownMenuItem>
            <div className="h-1 w-full" />
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}

export function CardTask({
  title,
  description,
  tags,
  collaborators,
  stats,
  dueDate,
  onAddCollaborator,
  onDeleteTask,
}: TaskCardProps) {
  return (
    <Card className="w-full max-w-[300px] gap-4 p-4 xl:min-h-auto">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <TaskCardDropdownMenu onAddCollaborator={onAddCollaborator} onDeleteTask={onDeleteTask} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {tags.map((tag) => (
              <Badge key={tag.label} size="sm" variant={tag.variant}>
                <span>{tag.label}</span>
              </Badge>
            ))}
          </div>
          <AvatarGroup users={collaborators} />
        </div>
      </CardContent>

      <CardFooter className="mt-0 mb-0 flex flex-col gap-[0.65rem]">
        <div className="-mx-4 w-[calc(100%+32px)] py-[5px]">
          <div className="h-px w-full border-[oklch(from_var(--border)_l_c_h_/_0.6)] border-b-[0.5px]" />
        </div>
        <div className="flex w-full justify-between text-[oklch(from_var(--muted-foreground)_l_c_h_/_0.6)] text-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
              <Users size="14" />
              <span>{collaborators.length}</span>
            </div>
            <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
              <MessageCircleMore size="14" />
              <span>{stats.comments}</span>
            </div>
            <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
              <ListTodo size="14" />
              <span>{stats.subtasks}</span>
            </div>
          </div>
          <div className="flex h-[27px] items-center justify-center gap-1 rounded-xl border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.2)] bg-[var(--mix-card-33-bg)] px-2 py-1 transition-all duration-150 hover:border-[var(--border)] hover:bg-[var(--mix-card-50-bg)]">
            <Calendar size="14" />
            <span className={dueDate.variant === "warning" ? "text-[var(--warning-foreground)]" : undefined}>
              {dueDate.label}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
