import { Button } from "@/registry/brook/tailwind/ui/button";
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
} from "@/registry/brook/tailwind/ui/drawer";

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button>View Storage</Button>} />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup className="text-center">
            <DrawerHandle />
            <DrawerContent>
              <DrawerTitle className="text-center">Storage</DrawerTitle>
              <DrawerDescription className="text-center">
                You&apos;ve used 4.2 GB of 10 GB. Upgrade your plan for more space.
              </DrawerDescription>
              <div className="flex justify-center gap-4">
                <DrawerClose render={<Button variant="outline" size="sm">Done</Button>} />
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
