"use client";

import {
  Copy,
  FileText,
  FolderPlus,
  MoreHorizontal,
  Scissors,
  Share2,
  Trash2,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
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
              <div style={{ height: "4px", width: "100%" }} />
              <ContextMenuItem icon={<FileText size={14} />}>
                New File
                <ContextMenuShortcut>⌘+N</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem icon={<FolderPlus size={14} />}>
                New Folder
                <ContextMenuShortcut>⌘+⇧+N</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />

              <ContextMenuSubmenuRoot>
                <ContextMenuSubmenuTrigger>
                  <Share2 size={14} style={{ marginLeft: "4px" }} />
                  Share
                </ContextMenuSubmenuTrigger>
                <ContextMenuPortal>
                  <ContextMenuPositioner>
                    <ContextMenuPopup>
                      <div style={{ height: "4px", width: "100%" }} />
                      <ContextMenuItem style={{ paddingLeft: "12px" }}>
                        Email Link
                      </ContextMenuItem>
                      <ContextMenuItem style={{ paddingLeft: "12px" }}>
                        Copy Link
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem icon={<MoreHorizontal size={14} />}>
                        More...
                      </ContextMenuItem>
                      <div style={{ height: "4px", width: "100%" }} />
                    </ContextMenuPopup>
                  </ContextMenuPositioner>
                </ContextMenuPortal>
              </ContextMenuSubmenuRoot>

              <ContextMenuSeparator />
              <ContextMenuItem icon={<Copy size={14} />}>
                Copy
                <ContextMenuShortcut>⌘+C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem icon={<Scissors size={14} />}>
                Cut
                <ContextMenuShortcut>⌘+X</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem icon={<Copy size={14} />}>
                Paste
                <ContextMenuShortcut>⌘+V</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem
                className={styles.deleteItem}
                icon={<Trash2 size={14} />}
              >
                Delete
                <ContextMenuShortcut>⌫</ContextMenuShortcut>
              </ContextMenuItem>
              <div style={{ height: "4px", width: "100%" }} />
            </ContextMenuPopup>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenu>
    </div>
  );
}
