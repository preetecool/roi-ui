import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuPopup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";
import { Button } from "@/registry/brook/ui/button/button";
import { Edit, Copy, Archive, Trash2, ChevronDown } from "lucide-react";

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <div
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <span> Actions </span>
              <ChevronDown size={16} style={{ marginTop: "1px" }} />
            </div>
          </Button>
        }
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup>
            <DropdownMenuItem icon={<Edit size={16} />}>Edit</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Copy size={16} />}>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Archive size={16} />}>Archive</DropdownMenuItem>
            <DropdownMenuItem icon={<Trash2 size={16} />}>Delete</DropdownMenuItem>
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
