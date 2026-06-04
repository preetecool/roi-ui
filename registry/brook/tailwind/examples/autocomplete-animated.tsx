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
} from "@/registry/brook/tailwind/ui/autocomplete";
import { Button } from "@/registry/brook/tailwind/ui/button";

const COLS_DESKTOP = 3;
const COLS_MOBILE = 2;
const SM_QUERY = "(min-width: 640px)";
const EASING = "cubic-bezier(0.77,0,0.175,1)";

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
    "--ac-popover-width": "calc(var(--ac-cols) * 10rem + 0.5rem)",
    "--ac-popover-height": "calc(var(--ac-list-height,0px) + 0.5rem)",
    "--ac-easing": EASING,
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
      <div
        className="group/ac relative isolate z-0 inline-grid data-[open]:overflow-clip"
        data-open={open || undefined}
        style={rootStyle}
      >
        <div
          aria-hidden
          className="-z-10 absolute inset-0 rounded-[var(--radius)] border border-input bg-card shadow-[0_1px_2px_oklch(0_0_0_/_0.05)] transition-[border-radius] duration-[400ms] ease-[var(--ac-easing)] group-data-[open]/ac:rounded-2xl dark:shadow-[0_1px_2px_oklch(0_0_0_/_0.2)]"
        />

        <div className="w-0 overflow-hidden rounded-2xl opacity-0 transition-[width,opacity] duration-[400ms] ease-[var(--ac-easing)] group-data-[open]/ac:w-[calc(var(--ac-popover-width)_+_0.5rem)] group-data-[open]/ac:opacity-100 group-data-[open]/ac:transition-[width]">
          <div className="relative h-0 overflow-hidden transition-[height] duration-[400ms] ease-[var(--ac-easing)] group-data-[open]/ac:h-[calc(var(--ac-popover-height)_+_0.25rem)] group-data-[open]/ac:duration-[250ms]">
            <div
              aria-hidden
              className="absolute top-1 right-1 bottom-0 left-1 rounded-t-[calc(1rem_-_0.25rem)] bg-popover opacity-0 blur-[4px] transition-[opacity,filter] duration-[400ms] ease-[var(--ac-easing)] group-data-[open]/ac:opacity-100 group-data-[open]/ac:blur-none"
            />
            <div className="relative m-1 mb-0 h-[var(--ac-popover-height)] w-[var(--ac-popover-width)] overflow-hidden rounded-t-[calc(1rem_-_0.25rem)] bg-popover p-1 opacity-0 blur-[4px] transition-[opacity,filter,height] duration-[400ms] ease-[var(--ac-easing)] [transition-duration:400ms,400ms,250ms] group-data-[open]/ac:opacity-100 group-data-[open]/ac:blur-none">
              <AutocompleteList
                className="block max-h-64 gap-0 overflow-y-auto overscroll-contain outline-none"
                ref={listRef}
              >
                {(group: CardGroup) => (
                  <AutocompleteGroup className="block p-0" items={group.items} key={group.value}>
                    {rows.map((row, rowIdx) => (
                      <AutocompleteRow
                        className="mt-1 grid grid-cols-[repeat(var(--ac-cols),1fr)] items-stretch gap-1 first:mt-0"
                        // biome-ignore lint/suspicious/noArrayIndexKey: rows are derived from a stable item order
                        key={rowIdx}
                      >
                        {row.map((item) => (
                          <AutocompleteItem
                            className="group/ac-item relative isolate z-0 m-0 flex h-auto cursor-default select-none items-center gap-2.5 rounded-lg px-2 py-1.5 font-semibold text-[0.8125rem] text-foreground/70 leading-none tracking-wide outline-none transition-colors duration-150 before:hidden before:content-none data-[highlighted]:text-foreground dark:text-muted-foreground"
                            key={item.id}
                            value={item}
                          >
                            <span
                              aria-hidden
                              className="-z-10 absolute inset-0 scale-[0.92] rounded-[inherit] bg-[oklch(from_var(--muted)_l_c_h_/_0.8)] opacity-0 shadow-[inset_0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5),0_1px_2px_oklch(0_0_0_/_0.06)] transition-[opacity,transform] duration-200 ease-out group-hover/ac-item:scale-100 group-hover/ac-item:opacity-100 group-data-[highlighted]/ac-item:scale-100 group-data-[highlighted]/ac-item:opacity-100 dark:bg-[oklch(1_0_0_/_0.04)] dark:shadow-[inset_0_0_0_1px_oklch(1_0_0_/_0.06),0_1px_2px_oklch(0_0_0_/_0.3),inset_0_1px_0_oklch(1_0_0_/_0.02)]"
                            />
                            <span
                              aria-hidden
                              className="size-6 flex-shrink-0 rounded-md bg-[color-mix(in_oklch,var(--swatch-color)_50%,transparent)] shadow-[inset_0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5)] dark:bg-[color-mix(in_oklch,var(--swatch-color)_25%,transparent)] dark:shadow-[inset_0_0_0_1px_oklch(1_0_0_/_0.06)]"
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

              <AutocompleteEmpty className="grid place-items-center py-6 text-muted-foreground/50 text-xs empty:m-0 empty:p-0">
                No results
              </AutocompleteEmpty>
            </div>
          </div>

          <div className="h-0 overflow-hidden transition-[height] duration-[400ms] ease-[var(--ac-easing)] group-data-[open]/ac:h-10">
            <div className="mx-1 mb-1 w-[var(--ac-popover-width)] rounded-b-[calc(1rem_-_0.25rem)] bg-popover px-1 pb-1 opacity-0 blur-[4px] transition-[opacity,filter] duration-[400ms] ease-[var(--ac-easing)] group-data-[open]/ac:opacity-100 group-data-[open]/ac:blur-none">
              <AutocompletePrimitive.Input
                className="h-8 w-full border-0 bg-transparent px-2.5 text-muted-foreground text-xs outline-none placeholder:text-muted-foreground/40"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        <AutocompletePrimitive.Trigger
          className="justify-self-center transition-[background-color,border-color,box-shadow] delay-[350ms] duration-200 ease-out group-data-[open]/ac:border-transparent group-data-[open]/ac:bg-transparent group-data-[open]/ac:shadow-none group-data-[open]/ac:delay-0 group-data-[open]/ac:focus-visible:outline-none group-data-[open]/ac:before:bg-transparent"
          render={<Button size="md" />}
          tabIndex={0}
        >
          View cards
          <Plus
            aria-hidden
            className="ml-auto flex-shrink-0 transition-transform duration-[400ms] ease-[var(--ac-easing)] group-data-[open]/ac:rotate-45"
            size={12}
            strokeWidth={3}
          />
        </AutocompletePrimitive.Trigger>
      </div>
    </Autocomplete>
  );
}
