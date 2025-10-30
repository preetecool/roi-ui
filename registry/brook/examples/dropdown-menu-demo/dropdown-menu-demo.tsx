import { Archive, Copy, Edit, Trash2 } from "lucide-react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuSpacer,
  DropdownMenuTrigger,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <span> Actions </span>
          </Button>
        }
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup render={<ul />}>
            <DropdownMenuSpacer />
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
              icon={<Trash2 size={14} />}
              render={<li />}
              variant="destructive"
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuSpacer />
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
