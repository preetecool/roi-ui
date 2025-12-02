"use client";

import { useDocsSearch } from "fumadocs-core/search/client";
import { Component, FileText, Puzzle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import type { PageTree } from "@/lib/source-types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/registry/brook/ui/command/command";
import {
  Dialog,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
} from "@/registry/brook/ui/dialog/dialog";
import styles from "./search.module.css";
import { SearchFooter } from "./search-footer";
import { SearchItem } from "./search-item";
import { SearchResults } from "./search-results";
import { SearchTrigger } from "./search-trigger";

export type SearchProps = {
  tree?: PageTree.Root;
};

/**
 * Determines the appropriate icon based on URL path
 */
const getIcon = (url: string) => {
  switch (true) {
    case url.includes("/ui/"):
      return <Puzzle size={16} />;
    case url.includes("/blocks/"):
      return <Component size={16} />;
    default:
      return <FileText size={16} />;
  }
};

/**
 * Search dialog component for documentation navigation
 * Supports keyboard shortcuts (Cmd/Ctrl + K) and full-text search via API
 */
export function Search({ tree }: SearchProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Use fumadocs search with API endpoint
  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
  });

  // Register Cmd/Ctrl + K keyboard shortcut
  useKeyboardShortcut({ key: "k", metaKey: true, ctrlKey: true }, () =>
    setOpen(true)
  );

  const handleSelect = (url: string) => {
    router.push(url);
    setOpen(false);
  };

  const handleSearchChange = (value: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearch(value);
    }, 300);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={<SearchTrigger />} />
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup className={styles.commandWrapper}>
          <Command
            filter={(value, searchValue, keywords) => {
              handleSearchChange(searchValue);
              const extendValue = value + " " + (keywords?.join(" ") || "");
              if (
                extendValue.toLowerCase().includes(searchValue.toLowerCase())
              ) {
                return 1;
              }
              return 0;
            }}
          >
            <CommandInput placeholder="Search documentation..." />
            <CommandList>
              <CommandEmpty>
                {query.isLoading ? "Searching..." : "No results found."}
              </CommandEmpty>

              {tree?.children.map((group: PageTree.Node, index: number) => {
                if (group.type !== "folder") return null;
                return (
                  <CommandGroup
                    heading={group.name as string}
                    key={`group-${index}`}
                  >
                    {(group.children as PageTree.Node[])
                      .filter(
                        (item: PageTree.Node): item is PageTree.Item =>
                          item.type === "page"
                      )
                      .map((item: PageTree.Item) => (
                        <SearchItem
                          key={item.url}
                          onSelect={() => handleSelect(item.url)}
                          value={
                            item.name?.toString()
                              ? `${group.name} ${item.name}`
                              : ""
                          }
                        >
                          {getIcon(item.url)}
                          <div className={styles.commandItemContent}>
                            <div className={styles.commandItemTitle}>
                              {item.name}
                            </div>
                          </div>
                        </SearchItem>
                      ))}
                  </CommandGroup>
                );
              })}

              <SearchResults
                open={open}
                query={query}
                search={search}
                setOpen={setOpen}
              />
            </CommandList>
            <SearchFooter />
          </Command>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}
