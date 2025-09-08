"use client";

import { useState } from "react";
import {
  Autocomplete,
  AutocompleteInput,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteEmpty,
} from "@/registry/brook/ui/autocomplete/autocomplete";
import styles from "./autocomplete-demo.module.css";

interface Tag {
  id: string;
  value: string;
}

const tags: Tag[] = [
  { id: "t1", value: "feature" },
  { id: "t2", value: "fix" },
  { id: "t3", value: "bug" },
  { id: "t4", value: "docs" },
  { id: "t5", value: "internal" },
  { id: "t6", value: "mobile" },
  { id: "c-accordion", value: "component: accordion" },
  { id: "c-alert-dialog", value: "component: alert dialog" },
  { id: "c-autocomplete", value: "component: autocomplete" },
  { id: "c-avatar", value: "component: avatar" },
  { id: "c-checkbox", value: "component: checkbox" },
  { id: "c-checkbox-group", value: "component: checkbox group" },
  { id: "c-collapsible", value: "component: collapsible" },
  { id: "c-combobox", value: "component: combobox" },
  { id: "c-dialog", value: "component: dialog" },
  { id: "c-field", value: "component: field" },
  { id: "c-form", value: "component: form" },
  { id: "c-input", value: "component: input" },
  { id: "c-popover", value: "component: popover" },
  { id: "c-select", value: "component: select" },
  { id: "c-switch", value: "component: switch" },
  { id: "c-tabs", value: "component: tabs" },
  { id: "c-tooltip", value: "component: tooltip" },
];

export default function AutocompleteDemo() {
  const [value, setValue] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>

      <div className={styles.autocompleteWrapper}>
        <Autocomplete items={tags} value={value} onValueChange={setValue} itemToStringValue={(item) => item.value}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>
              Search tags
              <AutocompleteInput placeholder="e.g. feature" className={styles.input} />
            </label>
          </div>

          <AutocompletePortal>
            <AutocompletePositioner>
              <AutocompletePopup className={styles.popup}>
                <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
                <AutocompleteList>
                  {(tag: Tag) => (
                    <AutocompleteItem key={tag.id} value={tag} className={styles.item}>
                      {tag.value}
                    </AutocompleteItem>
                  )}
                </AutocompleteList>
              </AutocompletePopup>
            </AutocompletePositioner>
          </AutocompletePortal>
        </Autocomplete>
      </div>
    </div>
  );
}
