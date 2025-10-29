import { memo } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import styles from "./search-trigger-button.module.css";

export const SearchTriggerButton = memo(() => {
  const triggerSearch = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <Button id={styles.searchWrapper} onClick={triggerSearch} variant="ghost">
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

      <input
        className={styles.searchInput}
        placeholder="Search"
        readOnly
        type="text"
      />

      <div className={styles.searchKbd}>
        <Kbd size="sm">⌘</Kbd>
        <Kbd size="sm">K</Kbd>
      </div>
    </Button>
  );
});

SearchTriggerButton.displayName = "SearchTriggerButton";
