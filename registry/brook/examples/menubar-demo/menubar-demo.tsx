import { Button } from "@/registry/brook/ui/button/button";
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
} from "@/registry/brook/ui/menubar/menubar";
import styles from "./menubar-demo.module.css";

export default function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarMenuTrigger
          render={
            <Button size="sm" variant="ghost">
              File
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner sideOffset={8}>
            <MenubarMenuPopup>
              <MenubarMenuItem>
                <div className={styles.menuItemContent}>
                  New File
                  <span className={styles.shortcut}>⌘N</span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div className={styles.menuItemContent}>
                  Open
                  <span className={styles.shortcut}>⌘O</span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuSeparator />
              <MenubarMenuItem>
                <div className={styles.menuItemContent}>
                  Save
                  <span className={styles.shortcut}>⌘S</span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>Save As...</MenubarMenuItem>
              <MenubarMenuSeparator />

              <MenubarMenuSubmenuRoot>
                <MenubarMenuSubmenuTrigger>Export</MenubarMenuSubmenuTrigger>
                <MenubarMenuPortal>
                  <MenubarMenuPositioner
                    align="start"
                    side="right"
                    sideOffset={8}
                  >
                    <MenubarMenuPopup>
                      <MenubarMenuItem>PDF</MenubarMenuItem>
                      <MenubarMenuItem>PNG</MenubarMenuItem>
                      <MenubarMenuItem>SVG</MenubarMenuItem>
                    </MenubarMenuPopup>
                  </MenubarMenuPositioner>
                </MenubarMenuPortal>
              </MenubarMenuSubmenuRoot>

              <MenubarMenuSeparator />
              <MenubarMenuItem>Print</MenubarMenuItem>
            </MenubarMenuPopup>
          </MenubarMenuPositioner>
        </MenubarMenuPortal>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarMenuTrigger
          render={
            <Button size="sm" variant="ghost">
              Edit
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner sideOffset={8}>
            <MenubarMenuPopup>
              <MenubarMenuItem>
                <div className={styles.menuItemContent}>
                  Undo
                  <span className={styles.shortcut}>⌘Z</span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div className={styles.menuItemContent}>
                  Redo
                  <span className={styles.shortcut}>⌘⇧Z</span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuSeparator />
              <MenubarMenuItem>
                <div className={styles.menuItemContent}>
                  Cut
                  <span className={styles.shortcut}>⌘X</span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div className={styles.menuItemContent}>
                  Copy
                  <span className={styles.shortcut}>⌘C</span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div className={styles.menuItemContent}>
                  Paste
                  <span className={styles.shortcut}>⌘V</span>
                </div>
              </MenubarMenuItem>
            </MenubarMenuPopup>
          </MenubarMenuPositioner>
        </MenubarMenuPortal>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarMenuTrigger
          render={
            <Button size="sm" variant="ghost">
              View
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner sideOffset={8}>
            <MenubarMenuPopup>
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
                  <MenubarMenuPositioner
                    align="start"
                    side="right"
                    sideOffset={8}
                  >
                    <MenubarMenuPopup>
                      <MenubarMenuItem>Single Page</MenubarMenuItem>
                      <MenubarMenuItem>Two Pages</MenubarMenuItem>
                    </MenubarMenuPopup>
                  </MenubarMenuPositioner>
                </MenubarMenuPortal>
              </MenubarMenuSubmenuRoot>
            </MenubarMenuPopup>
          </MenubarMenuPositioner>
        </MenubarMenuPortal>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarMenuTrigger
          render={
            <Button size="sm" variant="ghost">
              Help
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner sideOffset={8}>
            <MenubarMenuPopup>
              <MenubarMenuItem>About</MenubarMenuItem>
              <MenubarMenuItem>Documentation</MenubarMenuItem>
              <MenubarMenuItem disabled>Keyboard Shortcuts</MenubarMenuItem>
            </MenubarMenuPopup>
          </MenubarMenuPositioner>
        </MenubarMenuPortal>
      </MenubarMenu>
    </Menubar>
  );
}
