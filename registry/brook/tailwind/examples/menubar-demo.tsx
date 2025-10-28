import {
  Menubar,
  MenubarMenu,
  MenubarMenuItem,
  MenubarMenuPopup,
  MenubarMenuPortal,
  MenubarMenuPositioner,
  MenubarMenuSeparator,
  MenubarMenuSubmenuRoot,
  MenubarMenuSubmenuTrigger,
  MenubarMenuTrigger,
} from "@/registry/brook/tailwind/ui/menubar";
import { Button } from "@/registry/brook/ui/button/button";

export default function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarMenuTrigger
          render={
            <Button
              className="!border-none rounded-[0.4rem]"
              size="sm"
              variant="ghost"
            >
              File
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner sideOffset={8}>
            <MenubarMenuPopup>
              <div style={{ height: "4px", width: "100%" }} />
              <MenubarMenuItem>
                <div className="flex w-full items-center justify-between">
                  New File
                  <span className="mr-1 ml-auto text-muted-foreground text-xs tracking-wider opacity-60 max-sm:hidden">
                    ⌘N
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div className="flex w-full items-center justify-between">
                  Open
                  <span className="mr-1 ml-auto text-muted-foreground text-xs tracking-wider opacity-60 max-sm:hidden">
                    ⌘O
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuSeparator />
              <MenubarMenuItem>
                <div className="flex w-full items-center justify-between">
                  Save
                  <span className="mr-1 ml-auto text-muted-foreground text-xs tracking-wider opacity-60 max-sm:hidden">
                    ⌘S
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>Save As...</MenubarMenuItem>
              <MenubarMenuSeparator />

              <MenubarMenuSubmenuRoot>
                <MenubarMenuSubmenuTrigger>Export</MenubarMenuSubmenuTrigger>
                <MenubarMenuPortal>
                  <MenubarMenuPositioner align="start" side="right">
                    <MenubarMenuPopup>
                      <div style={{ height: "4px", width: "100%" }} />
                      <MenubarMenuItem>PDF</MenubarMenuItem>
                      <MenubarMenuItem>PNG</MenubarMenuItem>
                      <MenubarMenuItem>SVG</MenubarMenuItem>
                      <div style={{ height: "4px", width: "100%" }} />
                    </MenubarMenuPopup>
                  </MenubarMenuPositioner>
                </MenubarMenuPortal>
              </MenubarMenuSubmenuRoot>

              <MenubarMenuSeparator />
              <MenubarMenuItem>Print</MenubarMenuItem>
              <div style={{ height: "4px", width: "100%" }} />
            </MenubarMenuPopup>
          </MenubarMenuPositioner>
        </MenubarMenuPortal>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarMenuTrigger
          render={
            <Button
              className="!border-none rounded-[0.4rem]"
              size="sm"
              variant="ghost"
            >
              Edit
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner sideOffset={8}>
            <MenubarMenuPopup>
              <div style={{ height: "4px", width: "100%" }} />
              <MenubarMenuItem>
                <div className="flex w-full items-center justify-between">
                  Undo
                  <span className="mr-1 ml-auto text-muted-foreground text-xs tracking-wider opacity-60 max-sm:hidden">
                    ⌘Z
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div className="flex w-full items-center justify-between">
                  Redo
                  <span className="mr-1 ml-auto text-muted-foreground text-xs tracking-wider opacity-60 max-sm:hidden">
                    ⌘⇧Z
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuSeparator />
              <MenubarMenuItem>
                <div className="flex w-full items-center justify-between">
                  Cut
                  <span className="mr-1 ml-auto text-muted-foreground text-xs tracking-wider opacity-60 max-sm:hidden">
                    ⌘X
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div className="flex w-full items-center justify-between">
                  Copy
                  <span className="mr-1 ml-auto text-muted-foreground text-xs tracking-wider opacity-60 max-sm:hidden">
                    ⌘C
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div className="flex w-full items-center justify-between">
                  Paste
                  <span className="mr-1 ml-auto text-muted-foreground text-xs tracking-wider opacity-60 max-sm:hidden">
                    ⌘V
                  </span>
                </div>
              </MenubarMenuItem>
              <div style={{ height: "4px", width: "100%" }} />
            </MenubarMenuPopup>
          </MenubarMenuPositioner>
        </MenubarMenuPortal>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarMenuTrigger
          render={
            <Button
              className="!border-none rounded-[0.4rem]"
              size="sm"
              variant="ghost"
            >
              View
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner sideOffset={8}>
            <MenubarMenuPopup>
              <div style={{ height: "4px", width: "100%" }} />
              <MenubarMenuItem>Toggle Sidebar</MenubarMenuItem>
              <MenubarMenuItem>Toggle Fullscreen</MenubarMenuItem>
              <MenubarMenuSeparator />
              <MenubarMenuItem>Zoom In</MenubarMenuItem>
              <MenubarMenuItem>Zoom Out</MenubarMenuItem>
              <MenubarMenuItem>Reset Zoom</MenubarMenuItem>
              <MenubarMenuSeparator />

              <MenubarMenuSubmenuRoot>
                <MenubarMenuSubmenuTrigger>Layout</MenubarMenuSubmenuTrigger>
                <MenubarMenuPortal>
                  <MenubarMenuPositioner align="start" side="right">
                    <MenubarMenuPopup>
                      <div style={{ height: "4px", width: "100%" }} />
                      <MenubarMenuItem>Single Page</MenubarMenuItem>
                      <MenubarMenuItem>Two Pages</MenubarMenuItem>
                      <div style={{ height: "4px", width: "100%" }} />
                    </MenubarMenuPopup>
                  </MenubarMenuPositioner>
                </MenubarMenuPortal>
              </MenubarMenuSubmenuRoot>
              <div style={{ height: "4px", width: "100%" }} />
            </MenubarMenuPopup>
          </MenubarMenuPositioner>
        </MenubarMenuPortal>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarMenuTrigger
          render={
            <Button
              className="!border-none rounded-[0.4rem]"
              size="sm"
              variant="ghost"
            >
              Help
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner sideOffset={8}>
            <MenubarMenuPopup>
              <div style={{ height: "4px", width: "100%" }} />
              <MenubarMenuItem>About</MenubarMenuItem>
              <MenubarMenuItem>Documentation</MenubarMenuItem>
              <MenubarMenuItem disabled>Keyboard Shortcuts</MenubarMenuItem>
              <div style={{ height: "4px", width: "100%" }} />
            </MenubarMenuPopup>
          </MenubarMenuPositioner>
        </MenubarMenuPortal>
      </MenubarMenu>
    </Menubar>
  );
}
