"use client";

import type { useDocsSearch } from "fumadocs-core/search/client";
import { useRouter } from "next/navigation";
import { CommandGroup, CommandItem } from "@/registry/brook/ui/command/command";
import styles from "./search.module.css";

type Query = Awaited<ReturnType<typeof useDocsSearch>>["query"];

type SearchResultsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  query: Query;
  search: string;
};

export function SearchResults({ setOpen, query, search }: SearchResultsProps) {
  const router = useRouter();

  const uniqueResults =
    query.data && Array.isArray(query.data)
      ? query.data.filter(
          (item, index, self) =>
            !(item.type === "text" && item.content.trim().split(/\s+/).length <= 1) &&
            index === self.findIndex((t) => t.content === item.content)
        )
      : [];

  if (!search.trim()) {
    return null;
  }

  if (!query.data || query.data === "empty") {
    return null;
  }

  if (query.data && uniqueResults.length === 0) {
    return null;
  }

  return (
    <CommandGroup heading="Search Results">
      {uniqueResults.map((item) => (
        <CommandItem
          data-type={item.type}
          key={item.id}
          keywords={[item.content]}
          onSelect={() => {
            router.push(item.url);
            setOpen(false);
          }}
          value={`${item.content} ${item.type}`}
        >
          <div className={styles.commandItemContent}>
            <div className={styles.commandItemTitle}>{item.content}</div>
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
