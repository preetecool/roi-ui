"use client";

import type { PageTree } from "fumadocs-core/server";
import { Component, FileText, Puzzle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { EnterArrowIcon } from "@/registry/brook/ui/arrow-icon/arrow-icon";
import { ArrowPointer } from "@/registry/brook/ui/button/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/brook/ui/command/command";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import { ICON_CONFIG } from "./search.config";
import styles from "./search.module.css";
import { buildSearchGroups } from "./search.utils";
import { useKeyboardShortcut } from "./hooks/use-keyboard-shortcut";
import { useSearchDialog } from "./hooks/use-search-dialog";

export type SearchPage = {
  name: string;
  url: string;
};

export type SearchGroup = {
  heading: string;
  pages: SearchPage[];
};

export type SearchProps = {
  tree: PageTree.Root;
};

export type IconType = "arrow" | "component" | "puzzle" | "file";

export type IconConfig = {
  type: IconType;
  patterns: string[];
  urlPatterns?: string[];
};

/**
 * Determines the appropriate icon type based on page name and URL patterns
 */
const getIconType = (url: string, name: string): IconType => {
  const nameLower = name.toLowerCase();

  for (const config of ICON_CONFIG) {
    const nameMatch = config.patterns.some((pattern) =>
      nameLower.includes(pattern)
    );

    const urlMatch =
      !config.urlPatterns ||
      config.urlPatterns.some((pattern) => url.includes(pattern));

    if (nameMatch && urlMatch) {
      return config.type;
    }

    if (config.patterns.length === 0 && urlMatch) {
      return config.type;
    }
  }

  return "file";
};

/**
 * Renders the appropriate icon component based on icon type
 */
const renderIcon = (iconType: IconType) => {
  switch (iconType) {
    case "arrow":
      return <ArrowPointer />;
    case "component":
      return <Component size={16} />;
    case "puzzle":
      return <Puzzle size={16} />;
    case "file":
      return <FileText size={16} />;
    default:
      return <FileText size={16} />;
  }
};

/**
 * Search dialog component for documentation navigation
 * Supports keyboard shortcuts (Cmd/Ctrl + K) and fuzzy search
 */
export function Search({ tree }: SearchProps) {
  const router = useRouter();
  const { isOpen, isClosing, inputRef, open, close } = useSearchDialog();

  // Register Cmd/Ctrl + K keyboard shortcut
  useKeyboardShortcut({ key: "k", metaKey: true, ctrlKey: true }, open);

  const handleSelect = (url: string) => {
    router.push(url);
    close();
  };

  // Build search groups from page tree (memoized for performance)
  const allGroups = useMemo(
    () => buildSearchGroups(tree.children),
    [tree.children]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close search"
        className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
        onClick={close}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            close();
          }
        }}
        tabIndex={0}
        type="button"
      />
      <div
        className={`${styles.commandWrapper} ${isClosing ? styles.commandWrapperClosing : ""}`}
      >
        <Command>
          <CommandInput placeholder="Search documentation..." ref={inputRef} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {allGroups.map((group, idx) => (
              <CommandGroup
                heading={group.heading}
                key={`${group.heading}-${idx}`}
              >
                {group.pages.map((page) => {
                  const iconType = getIconType(page.url, page.name);
                  return (
                    <CommandItem
                      key={page.url}
                      onSelect={() => handleSelect(page.url)}
                      value={`${group.heading} ${page.name}`}
                    >
                      {renderIcon(iconType)}
                      <div className={styles.commandItemContent}>
                        <div className={styles.commandItemTitle}>
                          {page.name}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
          <div className={styles.commandFooter}>
            <div className={styles.commandFooterItem}>
              <Kbd className={styles.commandFooterKbd} size="md">
                <EnterArrowIcon />
              </Kbd>
              <span className={styles.commandFooterText}>Go to page</span>
            </div>
          </div>
        </Command>
      </div>
    </>
  );
}
