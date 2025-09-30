"use client";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
  ContextMenuShortcut,
} from "@/registry/brook/ui/context-menu/context-menu";
import styles from "./context-menu-demo.module.css";

export default function ContextMenuDemo() {
  return (
    <div className={styles.container}>
      <ContextMenu>
        <ContextMenuTrigger className={styles.trigger}>
          Right click
        </ContextMenuTrigger>

        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuPopup className={styles.popup}>
              <ContextMenuItem>
                New File
                <ContextMenuShortcut>⌘+N</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                New Folder
                <ContextMenuShortcut>⌘+⇧+N</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />

              <ContextMenuSubmenuRoot>
                <ContextMenuSubmenuTrigger>Share</ContextMenuSubmenuTrigger>
                <ContextMenuPortal>
                  <ContextMenuPositioner>
                    <ContextMenuPopup>
                      <ContextMenuItem>Email Link</ContextMenuItem>
                      <ContextMenuItem>Copy Link</ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem>More...</ContextMenuItem>
                    </ContextMenuPopup>
                  </ContextMenuPositioner>
                </ContextMenuPortal>
              </ContextMenuSubmenuRoot>

              <ContextMenuSeparator />
              <ContextMenuItem>
                Copy
                <ContextMenuShortcut>⌘+C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Cut
                <ContextMenuShortcut>⌘+X</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Paste
                <ContextMenuShortcut>⌘+V</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className={styles.deleteItem}>
                Delete
                <ContextMenuShortcut>⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuPopup>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenu>
    </div>
  );
}
