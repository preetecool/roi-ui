import { cn } from "@/lib/utils-tailwind";
import { Button } from "@/registry/brook/tailwind/ui/button";
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
} from "@/registry/brook/tailwind/ui/drawer";

export default function DrawerSide() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button>View Activity</Button>} />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport className="items-stretch justify-end">
          <DrawerPopup
            className={cn(
              "[--bleed:3rem] w-[calc(20rem+var(--bleed))] max-w-[calc(100vw-3rem+var(--bleed))]",
              "!max-h-none h-full !mb-0 !rounded-none",
              "-mr-[var(--bleed)] p-6 pr-[calc(1.5rem+var(--bleed))]",
              "overflow-y-auto overscroll-contain touch-auto pointer-events-auto",
              "shadow-[0_-16px_48px_rgb(0_0_0/0.12),0_6px_18px_rgb(0_0_0/0.06),0_0_0_1px_oklch(from_var(--border)_l_c_h/0.5)]",
              "transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
              "[transform:translateX(var(--drawer-swipe-movement-x))]",
              "data-[starting-style]:[transform:translateX(calc(100%-var(--bleed)))]",
              "data-[ending-style]:[transform:translateX(calc(100%-var(--bleed)))]",
              "data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
              "data-[ending-style]:shadow-[0_-16px_48px_rgb(0_0_0/0),0_6px_18px_rgb(0_0_0/0),0_0_0_1px_oklch(from_var(--border)_l_c_h/0)]",
              "supports-[-webkit-touch-callout:none]:[--bleed:0px] supports-[-webkit-touch-callout:none]:mr-0",
              "supports-[-webkit-touch-callout:none]:w-80 supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)]",
              "supports-[-webkit-touch-callout:none]:rounded-[10px] supports-[-webkit-touch-callout:none]:pr-6",
            )}
          >
            <DrawerContent className="max-w-none">
              <DrawerTitle>Activity</DrawerTitle>
              <DrawerDescription>
                Recent changes across your workspace this week.
              </DrawerDescription>
              <div className="flex justify-end gap-4">
                <DrawerClose render={<Button variant="outline" size="sm">Close</Button>} />
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}
