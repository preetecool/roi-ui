import { Calendar, ListTodo, MessageCircleMore, MoreHorizontal, Trash, UserPlus, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/ui/avatar/avatar";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/brook/ui/card/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/ui/tooltip/tooltip";
import styles from "./card-task.module.css";

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
      <div style={{ display: "flex", alignItems: "center" }}>
        {displayUsers.map((user, index) => (
          <Tooltip key={user.value}>
            <TooltipTrigger
              render={
                <div style={{ marginLeft: index > 0 ? "-6px" : "0" }}>
                  <Avatar
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "2px solid var(--card)",
                    }}
                  >
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
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "var(--muted)",
              color: "var(--muted-foreground)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.625rem",
              fontWeight: 600,
              marginLeft: "-6px",
              border: "2px solid var(--card)",
            }}
          >
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
          <Button {...props} aria-label="Task options" size="icon" variant="ghost">
            <MoreHorizontal
              aria-hidden="true"
              size="16"
              style={{
                color: "oklch(from var(--muted-foreground) l c h / 0.8)",
              }}
            />
          </Button>
        )}
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup render={<ul />} style={{ minWidth: "160px" }}>
            <div style={{ height: "4px", width: "100%" }} />
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
            <div style={{ height: "4px", width: "100%" }} />
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
    <Card className={styles.taskCard}>
      <CardHeader>
        <CardTitle style={{ fontSize: "1rem" }}>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <TaskCardDropdownMenu onAddCollaborator={onAddCollaborator} onDeleteTask={onDeleteTask} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className={styles.contentContainer}>
          <div className={styles.badgeContainer}>
            {tags.map((tag) => (
              <Badge key={tag.label} size="sm" variant={tag.variant}>
                <span>{tag.label}</span>
              </Badge>
            ))}
          </div>
          <AvatarGroup users={collaborators} />
        </div>
      </CardContent>

      <CardFooter className={styles.taskFooter}>
        <div className={styles.dividerWrapper}>
          <div className={styles.divider} />
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeftGroup}>
            <div aria-label={`${collaborators.length} collaborators`} className={styles.iconBubble} role="group">
              <Users aria-hidden="true" size="14" />
              <span>{collaborators.length}</span>
            </div>
            <div aria-label={`${stats.comments} comments`} className={styles.iconBubble} role="group">
              <MessageCircleMore aria-hidden="true" size="14" />
              <span>{stats.comments}</span>
            </div>
            <div aria-label={`${stats.subtasks} subtasks`} className={styles.iconBubble} role="group">
              <ListTodo aria-hidden="true" size="14" />
              <span>{stats.subtasks}</span>
            </div>
          </div>
          <div aria-label={`Due ${dueDate.label}`} className={styles.iconBubble} role="group">
            <Calendar aria-hidden="true" size="14" />
            <span className={dueDate.variant === "warning" ? styles.tomorrowText : undefined}>{dueDate.label}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
