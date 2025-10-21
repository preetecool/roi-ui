import { Archive, ChevronDown, Copy, Edit, Trash2 } from "lucide-react";
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
import styles from "./dropdown-menu-demo.module.css";

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <div className={styles.triggerContent}>
              <span> Actions </span>
              <ChevronDown className={styles.chevronIcon} size={16} />
            </div>
          </Button>
        }
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup>
            <DropdownMenuItem icon={<Edit size={16} />}>Edit</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Copy size={16} />}>
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Archive size={16} />}>
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem icon={<Trash2 size={16} />}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
