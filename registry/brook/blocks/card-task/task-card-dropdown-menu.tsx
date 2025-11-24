import { Calendar, MoreHorizontal, Trash, UserPlus } from "lucide-react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";

type TaskCardDropdownMenuProps = {
  onAddCollaborator: () => void;
  onDeleteTask: () => void;
};

export function TaskCardDropdownMenu({
  onAddCollaborator,
  onDeleteTask,
}: TaskCardDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <Button {...props} size="icon" variant="ghost">
            <MoreHorizontal
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
            <DropdownMenuItem
              icon={<UserPlus size="14" />}
              onClick={onAddCollaborator}
              render={<li />}
            >
              Add collaborator
            </DropdownMenuItem>
            <DropdownMenuItem icon={<Calendar size="14" />} render={<li />}>
              Change due date
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              icon={<Trash size="14" />}
              onClick={onDeleteTask}
              render={<li />}
              variant="destructive"
            >
              Delete task
            </DropdownMenuItem>
            <div style={{ height: "4px", width: "100%" }} />
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
