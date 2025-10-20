import { Button } from "@/registry/brook/ui/button/button";
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/brook/ui/popover/popover";
import { X } from "lucide-react";
import styles from "./popover-demo.module.css";

export default function PopoverDemo() {
  return (
    <div className={styles.container}>
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline">Open Popover</Button>}
        />
        <PopoverPortal>
          <PopoverPositioner align="center" side="top" sideOffset={8}>
            <PopoverPopup>
              <PopoverArrow />
              <PopoverTitle>Notifications</PopoverTitle>
              <PopoverDescription>
                You are all caught up! No new notifications.
              </PopoverDescription>
              <PopoverClose aria-label="Close">
                <X size={16} />
              </PopoverClose>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>
    </div>
  );
}
