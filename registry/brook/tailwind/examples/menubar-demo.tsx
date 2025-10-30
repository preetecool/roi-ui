import {
  Menubar,
  MenubarMenu,
  MenubarMenuItem,
  MenubarMenuPopup,
  MenubarMenuPortal,
  MenubarMenuPositioner,
  MenubarMenuSeparator,
  MenubarMenuShortcut,
  MenubarMenuSpacer,
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
              <MenubarMenuSpacer />
              <MenubarMenuItem>
                New File
                <MenubarMenuShortcut>⌘N</MenubarMenuShortcut>
              </MenubarMenuItem>
              <MenubarMenuItem>
                Open
                <MenubarMenuShortcut>⌘O</MenubarMenuShortcut>
              </MenubarMenuItem>
              <MenubarMenuSeparator />
              <MenubarMenuItem>
                Save
                <MenubarMenuShortcut>⌘S</MenubarMenuShortcut>
              </MenubarMenuItem>
              <MenubarMenuItem>Save As...</MenubarMenuItem>
              <MenubarMenuSeparator />

              <MenubarMenuSubmenuRoot>
                <MenubarMenuSubmenuTrigger>Export</MenubarMenuSubmenuTrigger>
                <MenubarMenuPortal>
                  <MenubarMenuPositioner align="start" side="right">
                    <MenubarMenuPopup>
                      <MenubarMenuSpacer />
                      <MenubarMenuItem>PDF</MenubarMenuItem>
                      <MenubarMenuItem>PNG</MenubarMenuItem>
                      <MenubarMenuItem>SVG</MenubarMenuItem>
                      <MenubarMenuSpacer />
                    </MenubarMenuPopup>
                  </MenubarMenuPositioner>
                </MenubarMenuPortal>
              </MenubarMenuSubmenuRoot>

              <MenubarMenuSeparator />
              <MenubarMenuItem>Print</MenubarMenuItem>
              <MenubarMenuSpacer />
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
              <MenubarMenuSpacer />
              <MenubarMenuItem>
                Undo
                <MenubarMenuShortcut>⌘Z</MenubarMenuShortcut>
              </MenubarMenuItem>
              <MenubarMenuItem>
                Redo
                <MenubarMenuShortcut>⌘⇧Z</MenubarMenuShortcut>
              </MenubarMenuItem>
              <MenubarMenuSeparator />
              <MenubarMenuItem>
                Cut
                <MenubarMenuShortcut>⌘X</MenubarMenuShortcut>
              </MenubarMenuItem>
              <MenubarMenuItem>
                Copy
                <MenubarMenuShortcut>⌘C</MenubarMenuShortcut>
              </MenubarMenuItem>
              <MenubarMenuItem>
                Paste
                <MenubarMenuShortcut>⌘V</MenubarMenuShortcut>
              </MenubarMenuItem>
              <MenubarMenuSpacer />
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
              <MenubarMenuSpacer />
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
                      <MenubarMenuSpacer />
                      <MenubarMenuItem>Single Page</MenubarMenuItem>
                      <MenubarMenuItem>Two Pages</MenubarMenuItem>
                      <MenubarMenuSpacer />
                    </MenubarMenuPopup>
                  </MenubarMenuPositioner>
                </MenubarMenuPortal>
              </MenubarMenuSubmenuRoot>
              <MenubarMenuSpacer />
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
              <MenubarMenuSpacer />
              <MenubarMenuItem>About</MenubarMenuItem>
              <MenubarMenuItem>Documentation</MenubarMenuItem>
              <MenubarMenuItem disabled>Keyboard Shortcuts</MenubarMenuItem>
              <MenubarMenuSpacer />
            </MenubarMenuPopup>
          </MenubarMenuPositioner>
        </MenubarMenuPortal>
      </MenubarMenu>
    </Menubar>
  );
}
