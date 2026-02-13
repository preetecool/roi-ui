import { Button } from "@/registry/brook/ui/button/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/registry/brook/ui/drawer/drawer";
import styles from "./drawer-demo.module.css";

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button>View Storage</Button>} />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup className={styles.popup}>
            <DrawerHandle />
            <DrawerContent>
              <DrawerTitle className={styles.title}>Storage</DrawerTitle>
              <DrawerDescription className={styles.description}>
                You&apos;ve used 4.2 GB of 10 GB. Upgrade your plan for more space.
              </DrawerDescription>
              <div className={styles.actions}>
                <DrawerClose render={<Button variant="outline" size="sm">Done</Button>} />
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
