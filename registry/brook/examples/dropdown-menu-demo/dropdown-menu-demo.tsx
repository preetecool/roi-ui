import { Archive, Copy, Edit, Trash2 } from "lucide-react";
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
              className={styles.deleteItem}
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
