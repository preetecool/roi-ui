"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { Plus } from "lucide-react";
import { type CSSProperties, useCallback, useMemo, useState, useSyncExternalStore } from "react";
import useMeasure from "react-use-measure";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteRow,
} from "@/registry/brook/ui/autocomplete/autocomplete";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./autocomplete-animated.module.css";

const COLS_DESKTOP = 3;
const COLS_MOBILE = 2;
const SM_QUERY = "(min-width: 640px)";

type Card = {
  id: string;
  value: string;
  color: string;
};

type CardGroup = {
  value: string;
  items: Card[];
};

const cards: Card[] = [
  { id: "rose", value: "Rose", color: "oklch(0.65 0.22 25)" },
  { id: "amber", value: "Amber", color: "oklch(0.78 0.16 65)" },
  { id: "lime", value: "Lime", color: "oklch(0.82 0.21 125)" },
  { id: "emerald", value: "Emerald", color: "oklch(0.72 0.16 160)" },
  { id: "teal", value: "Teal", color: "oklch(0.7 0.13 200)" },
  { id: "sky", value: "Sky", color: "oklch(0.74 0.13 230)" },
  { id: "indigo", value: "Indigo", color: "oklch(0.55 0.2 275)" },
  { id: "violet", value: "Violet", color: "oklch(0.6 0.22 295)" },
  { id: "fuchsia", value: "Fuchsia", color: "oklch(0.65 0.27 320)" },
];

function subscribeMediaQuery(query: string) {
  return (notify: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", notify);
    return () => mql.removeEventListener("change", notify);
  };
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    subscribeMediaQuery(query),
    () => window.matchMedia(query).matches,
    () => false
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    rows.push(arr.slice(i, i + size));
  }
  return rows;
}

const itemToStringValue = (item: unknown) => (item as Card).value;

export default function AutocompleteAnimated() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [listRef, { height: listHeight }] = useMeasure();

  const cols = useMediaQuery(SM_QUERY) ? COLS_DESKTOP : COLS_MOBILE;
  const groups = useMemo<CardGroup[]>(() => [{ value: "all", items: cards }], []);
  const rows = useMemo(() => chunk(cards, cols), [cols]);

  const handleValueChange = useCallback((next: string, details: AutocompletePrimitive.Root.ChangeEventDetails) => {
    if (details.reason === "item-press") {
      return;
    }
    setValue(next);
  }, []);

  const handleOpenChange = useCallback((nextOpen: boolean, details: AutocompletePrimitive.Root.ChangeEventDetails) => {
    if (!nextOpen && details.reason === "input-clear") {
      return;
    }
    setOpen(nextOpen);
    if (!nextOpen) {
      queueMicrotask(() => setValue(""));
    }
  }, []);

  const rootStyle = {
    "--ac-cols": cols,
    "--ac-list-height": `${listHeight}px`,
  } as CSSProperties;

  return (
    <Autocomplete
      grid
      items={groups}
      itemToStringValue={itemToStringValue}
      onOpenChange={handleOpenChange}
      onValueChange={handleValueChange}
      open={open}
      value={value}
    >
      <div className={styles.root} data-open={open || undefined} style={rootStyle}>
        <div aria-hidden className={styles.surface} />

        <div className={styles.widthClip}>
          <div className={styles.heightClip}>
            <div aria-hidden className={styles.popoverFill} />
            <div className={styles.popover}>
              <AutocompleteList className={styles.list} ref={listRef}>
                {(group: CardGroup) => (
                  <AutocompleteGroup className={styles.group} items={group.items} key={group.value}>
                    {rows.map((row, rowIdx) => (
                      <AutocompleteRow
                        className={styles.row}
                        // biome-ignore lint/suspicious/noArrayIndexKey: rows are derived from a stable item order
                        key={rowIdx}
                      >
                        {row.map((item) => (
                          <AutocompleteItem className={styles.item} key={item.id} value={item}>
                            <span className={styles.itemBg} />
                            <span
                              aria-hidden
                              className={styles.swatch}
                              style={{ "--swatch-color": item.color } as CSSProperties}
                            />
                            {item.value}
                          </AutocompleteItem>
                        ))}
                      </AutocompleteRow>
                    ))}
                  </AutocompleteGroup>
                )}
              </AutocompleteList>

              <AutocompleteEmpty className={styles.empty}>No results</AutocompleteEmpty>
            </div>
          </div>

          <div className={styles.inputClip}>
            <div className={styles.inputBar}>
              <AutocompletePrimitive.Input className={styles.input} placeholder="Search..." />
            </div>
          </div>
        </div>

        <AutocompletePrimitive.Trigger className={styles.trigger} render={<Button size="md" />} tabIndex={0}>
          View cards
          <Plus aria-hidden className={styles.triggerIcon} size={12} strokeWidth={3} />
        </AutocompletePrimitive.Trigger>
      </div>
    </Autocomplete>
  );
}
