import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from "@/registry/brook/ui/popover/popover";
import { Button } from "@/registry/brook/ui/button/button";
import { X } from "lucide-react";
import styles from "./popover-demo.module.css";

export default function PopoverDemo() {
  return (
    <div className={styles.container}>
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Open Popover</Button>} />
        <PopoverPortal>
          <PopoverPositioner side="top" align="center">
            <PopoverPopup>
              <PopoverArrow />
              <PopoverTitle>Notifications</PopoverTitle>
              <PopoverDescription>You are all caught up! No new notifications.</PopoverDescription>
              <PopoverClose
                render={
                  <Button variant="ghost" size="icon">
                    <X size={16} />
                  </Button>
                }
              />
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>
    </div>
  );
}
