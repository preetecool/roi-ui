import { Button } from "@/registry/brook/ui/button/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/registry/brook/ui/drawer/drawer";
import styles from "./drawer-side.module.css";

export default function DrawerSide() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button>View Activity</Button>} />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport className={styles.viewport}>
          <DrawerPopup className={styles.popup}>
            <DrawerContent>
              <DrawerTitle>Activity</DrawerTitle>
              <DrawerDescription>
                Recent changes across your workspace this week.
              </DrawerDescription>
              <div className={styles.actions}>
                <DrawerClose render={<Button variant="outline" size="sm">Close</Button>} />
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
