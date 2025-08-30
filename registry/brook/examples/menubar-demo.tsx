import {
  Menubar,
  MenubarMenu,
  MenubarMenuTrigger,
  MenubarMenuPortal,
  MenubarMenuPositioner,
  MenubarMenuPopup,
  MenubarMenuItem,
  MenubarMenuSeparator,
  MenubarMenuSubmenuRoot,
  MenubarMenuSubmenuTrigger,
} from "@/registry/brook/ui/menubar/menubar";
import { Button } from "@/registry/brook/ui/button/button";

export default function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarMenuTrigger
          render={
            <Button variant="ghost" size="sm">
              File
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner>
            <MenubarMenuPopup>
              <MenubarMenuItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  New File
                  <span
                    className="shortcut"
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.6875rem",
                    }}
                  >
                    ⌘N
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  Open
                  <span
                    className="shortcut"
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.6875rem",
                    }}
                  >
                    ⌘O
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuSeparator />
              <MenubarMenuItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  Save
                  <span
                    className="shortcut"
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.6875rem",
                    }}
                  >
                    ⌘S
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>Save As...</MenubarMenuItem>
              <MenubarMenuSeparator />

              <MenubarMenuSubmenuRoot>
                <MenubarMenuSubmenuTrigger>Export</MenubarMenuSubmenuTrigger>
                <MenubarMenuPortal>
                  <MenubarMenuPositioner side="right" align="start" sideOffset={8}>
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
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner>
            <MenubarMenuPopup>
              <MenubarMenuItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  Undo
                  <span
                    className="shortcut"
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.6875rem",
                    }}
                  >
                    ⌘Z
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  Redo
                  <span
                    className="shortcut"
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.6875rem",
                    }}
                  >
                    ⌘⇧Z
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuSeparator />
              <MenubarMenuItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  Cut
                  <span
                    className="shortcut"
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.6875rem",
                    }}
                  >
                    ⌘X
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  Copy
                  <span
                    className="shortcut"
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.6875rem",
                    }}
                  >
                    ⌘C
                  </span>
                </div>
              </MenubarMenuItem>
              <MenubarMenuItem>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  Paste
                  <span
                    className="shortcut"
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.6875rem",
                    }}
                  >
                    ⌘V
                  </span>
                </div>
              </MenubarMenuItem>
            </MenubarMenuPopup>
          </MenubarMenuPositioner>
        </MenubarMenuPortal>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarMenuTrigger
          render={
            <Button variant="ghost" size="sm">
              View
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner>
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
                  <MenubarMenuPositioner side="right" align="start" sideOffset={8}>
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
            <Button variant="ghost" size="sm">
              Help
            </Button>
          }
        />
        <MenubarMenuPortal>
          <MenubarMenuPositioner>
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
