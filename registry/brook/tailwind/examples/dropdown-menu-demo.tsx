import { Archive, Copy, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/tw-utils";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/brook/tailwind/ui/dropdown-menu";
import { Button } from "@/registry/brook/ui/button/button";

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <div className="flex items-center">
              <span> Actions </span>
            </div>
          </Button>
        }
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup render={<ul />}>
            <div style={{ height: "4px", width: "100%" }} />
            <DropdownMenuItem icon={<Edit size={14} />} render={<li />}>
              Edit...
            </DropdownMenuItem>

            <DropdownMenuItem icon={<Copy size={14} />} render={<li />}>
              Copy...
            </DropdownMenuItem>

            <DropdownMenuItem icon={<Archive size={14} />} render={<li />}>
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cn(
                "isolate text-destructive",
                "[&_svg]:text-destructive",
                "before:-z-10 before:absolute before:inset-x-1 before:inset-y-0 before:rounded-[0.3rem] before:bg-transparent before:content-['']",
                "hover:text-destructive-foreground hover:before:bg-destructive hover:[&_svg]:text-destructive-foreground"
              )}
              icon={<Trash2 size={14} />}
              render={<li />}
            >
              Delete
            </DropdownMenuItem>
            <div style={{ height: "4px", width: "100%" }} />
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
