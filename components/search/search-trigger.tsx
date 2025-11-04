"use client";

import type React from "react";
import { Button } from "@/registry/brook/ui/button/button";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import styles from "./search.module.css";

type SearchTriggerProps = {
  onClick?: () => void;
  render?: React.ReactElement;
};

export function SearchTrigger({ onClick, render }: SearchTriggerProps) {
  return (
    <Button className={styles.searchButton} onClick={onClick} variant="ghost">
      <svg
        aria-hidden="true"
        className={styles.searchIcon}
        fill="none"
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M14 14L10.5 10.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
      <span className={styles.searchText}>Search</span>
      <div className={styles.searchKbd}>
        <Kbd size="sm">⌘</Kbd>
        <Kbd size="sm">K</Kbd>
      </div>
    </Button>
  );
}
