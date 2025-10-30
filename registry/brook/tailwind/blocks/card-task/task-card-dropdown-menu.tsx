import { Calendar, MoreHorizontal, Trash, UserPlus } from "lucide-react";
import { cn } from "@/lib/tw-utils";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/brook/tailwind/ui/dropdown-menu";

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
              className={cn(
                "relative isolate text-[var(--destructive)]",
                "[&_svg]:text-[var(--destructive)]",
                "before:!absolute before:!left-1 before:!right-1 before:!top-0 before:!bottom-0 before:!-z-[1] before:!rounded-[0.3rem] before:!bg-transparent before:!content-['']",
                "hover:before:!bg-[var(--destructive)]",
                "data-[highlighted]:before:!bg-[var(--destructive)]",
                "hover:!text-[var(--destructive-foreground)]",
                "data-[highlighted]:!text-[var(--destructive-foreground)]",
                "hover:[&_svg]:!text-[var(--destructive-foreground)]",
                "data-[highlighted]:[&_svg]:!text-[var(--destructive-foreground)]"
              )}
              icon={<Trash size="14" />}
              onClick={onDeleteTask}
              render={<li />}
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
