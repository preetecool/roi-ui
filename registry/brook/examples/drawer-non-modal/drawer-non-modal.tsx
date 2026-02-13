import { Button } from "@/registry/brook/ui/button/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/registry/brook/ui/drawer/drawer";
import styles from "./drawer-non-modal.module.css";

export default function DrawerNonModal() {
  return (
    <Drawer swipeDirection="right" modal={false} disablePointerDismissal>
      <DrawerTrigger render={<Button>Start Export</Button>} />
      <DrawerPortal>
        <DrawerViewport className={styles.viewport}>
          <DrawerPopup className={styles.popup}>
            <DrawerContent>
              <DrawerTitle>Export Complete</DrawerTitle>
              <DrawerDescription>
                Your file has been saved to the Downloads folder. You can continue working while it
                processes.
              </DrawerDescription>
              <div className={styles.actions}>
                <DrawerClose render={<Button variant="outline" size="sm">Dismiss</Button>} />
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
