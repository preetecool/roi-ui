"use client";

import { Search } from "lucide-react";
import { Button } from "@/registry/brook/ui/button/button";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import styles from "./search.module.css";

type SearchTriggerProps = {
  onClick?: () => void;
};

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <Button className={styles.searchButton} onClick={onClick} variant="ghost">
      <Search absoluteStrokeWidth aria-hidden="true" className={styles.searchIcon} size={16} strokeWidth={1.5} />
      <span className={styles.searchText}>Search</span>
      <div className={styles.searchKbd}>
        <Kbd size="sm">⌘</Kbd>
        <Kbd size="sm">K</Kbd>
      </div>
    </Button>
  );
}
