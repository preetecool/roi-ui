"use client";

import { useDocsSearch } from "fumadocs-core/search/client";
import { Component, FileText, Puzzle } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import type { PageTree } from "@/lib/source-types";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/brook/ui/command/command";
import { EnterArrowIcon } from "@/registry/brook/ui/arrow-icon/arrow-icon";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import styles from "./search.module.css";
import { SearchTrigger } from "./search-trigger";

type SearchResult = {
  id: string;
  type: string;
  content: string;
  url: string;
};

type TreeItem = {
  id: string;
  name: string;
  url: string;
  group: string;
};

export type SearchProps = {
  tree?: PageTree.Root;
};

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

export function Search({ tree }: SearchProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
  });

  useKeyboardShortcut({ key: "k", metaKey: true, ctrlKey: true }, () => setOpen(true));

  useEffect(
    () => () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    },
    []
  );

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTimeout(() => {
          setInputValue("");
          setSearch("");
        }, 150);
      }
    },
    [setSearch]
  );

  const handleValueChange = useCallback(
    (value: string) => {
      setInputValue(value);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        setSearch(value);
      }, 300);
    },
    [setSearch]
  );

  const handleItemClick = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  // Build tree items from pageTree
  const treeGroups = useMemo(() => {
    if (!tree?.children) return [];

    const groups: { name: string; items: TreeItem[] }[] = [];

    tree.children.forEach((group: PageTree.Node) => {
      if (group.type !== "folder") return;

      const items: TreeItem[] = (group.children as PageTree.Node[])
        .filter((item: PageTree.Node): item is PageTree.Item => item.type === "page")
        .map((item: PageTree.Item) => ({
          id: item.url,
          name: item.name?.toString() || "",
          url: item.url,
          group: group.name?.toString() || "",
        }));

      if (items.length > 0) {
        groups.push({
          name: group.name?.toString() || "",
          items,
        });
      }
    });

    return groups;
  }, [tree]);

  // Filter and deduplicate search results
  const searchResults = useMemo(() => {
    if (!query.data || query.data === "empty" || !Array.isArray(query.data)) {
      return [];
    }

    return query.data.filter(
      (item, index, self) =>
        !(item.type === "text" && item.content.trim().split(/\s+/).length <= 1) &&
        index === self.findIndex((t) => t.content === item.content)
    ) as SearchResult[];
  }, [query.data]);

  const itemToStringValue = useCallback(
    (item: unknown) => {
      if (!item || typeof item !== "object") return "";
      if ("content" in item) return (item as SearchResult).content;
      if ("name" in item) return (item as TreeItem).name;
      return "";
    },
    []
  );

  const showSearchResults = inputValue.trim().length > 0;
  const isLoading = query.isLoading;
  const hasSearchResults = searchResults.length > 0;

  // Combine all items for the autocomplete
  const allItems = useMemo(() => {
    if (showSearchResults) {
      return searchResults;
    }
    return treeGroups.flatMap((g) => g.items);
  }, [showSearchResults, searchResults, treeGroups]);

  return (
    <>
      <SearchTrigger onClick={() => setOpen(true)} />
      <CommandDialog onOpenChange={handleOpenChange} open={open}>
        <CommandDialogPopup className={styles.searchDialog} initialFocus={inputRef}>
          <Command items={allItems} onValueChange={handleValueChange} itemToStringValue={itemToStringValue}>
            <CommandInput ref={inputRef} placeholder="Search documentation..." className={styles.commandInput} />
            <CommandList className={styles.searchList}>
              {showSearchResults ? (
                <>
                  {!hasSearchResults && (
                    <CommandEmpty>
                      {isLoading ? "Searching..." : "No results found."}
                    </CommandEmpty>
                  )}
                  {hasSearchResults && (
                    <CommandGroup items={searchResults}>
                      <CommandGroupLabel>Search Results</CommandGroupLabel>
                      <CommandCollection>
                        {(result: SearchResult) => (
                          <CommandItem
                            key={result.id}
                            value={result}
                            render={<Link href={result.url} onNavigate={handleItemClick} tabIndex={-1} />}
                          >
                            {getIcon(result.url)}
                            {result.content}
                          </CommandItem>
                        )}
                      </CommandCollection>
                    </CommandGroup>
                  )}
                </>
              ) : (
                treeGroups.map((group, index) => (
                  <div key={group.name}>
                    {index > 0 && <CommandSeparator />}
                    <CommandGroup items={group.items}>
                      <CommandGroupLabel>{group.name}</CommandGroupLabel>
                      <CommandCollection>
                        {(item: TreeItem) => (
                          <CommandItem
                            key={item.id}
                            value={item}
                            render={<Link href={item.url} onNavigate={handleItemClick} tabIndex={-1} />}
                          >
                            {getIcon(item.url)}
                            {item.name}
                          </CommandItem>
                        )}
                      </CommandCollection>
                    </CommandGroup>
                  </div>
                ))
              )}
            </CommandList>
            <CommandFooter>
              <div className={styles.commandFooterItem}>
                <Kbd className={styles.commandFooterKbd} size="md">
                  <EnterArrowIcon />
                </Kbd>
                <span className={styles.commandFooterText}>Go to page</span>
              </div>
            </CommandFooter>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
    </>
  );
}
