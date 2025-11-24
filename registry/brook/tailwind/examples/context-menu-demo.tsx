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
  ContextMenuSpacer,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
} from "@/registry/brook/tailwind/ui/context-menu";

export default function ContextMenuDemo() {
  return (
    <div className="mx-auto max-w-[600px] p-8">
      <ContextMenu>
        <ContextMenuTrigger className="flex w-full cursor-context-menu items-center justify-center rounded-[var(--radius)] border-2 border-[var(--color-border)] border-dashed p-32 text-[var(--color-muted-foreground)] text-sm outline-none transition-all duration-150 hover:border-[var(--color-ring)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2">
          Right click
        </ContextMenuTrigger>

        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuPopup className="min-w-[16rem]">
              <ContextMenuSpacer />
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
                  <Share2 className="ml-1" size={14} />
                  Share
                </ContextMenuSubmenuTrigger>
                <ContextMenuPortal>
                  <ContextMenuPositioner>
                    <ContextMenuPopup>
                      <ContextMenuSpacer />
                      <ContextMenuItem className="pl-3">
                        Email Link
                      </ContextMenuItem>
                      <ContextMenuItem className="pl-3">
                        Copy Link
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem icon={<MoreHorizontal size={14} />}>
                        More...
                      </ContextMenuItem>
                      <ContextMenuSpacer />
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
                icon={<Trash2 size={14} />}
                variant="destructive"
              >
                Delete
                <ContextMenuShortcut>⌫</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSpacer />
            </ContextMenuPopup>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenu>
    </div>
  );
}
