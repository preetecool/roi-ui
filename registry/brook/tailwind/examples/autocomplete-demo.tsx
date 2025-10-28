"use client";

import { useState } from "react";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
} from "@/registry/brook/tailwind/ui/autocomplete";

type Tag = {
  id: string;
  value: string;
};

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
    <div className="p-8 max-sm:p-0">
      <div className="mb-6" />

      <div className="relative w-[300px] max-sm:w-full">
        <Autocomplete
          items={tags}
          itemToStringValue={(item) => (item as Tag).value}
          onValueChange={setValue}
          value={value}
        >
          <div className="relative flex w-full flex-col">
            <label
              className="flex flex-col gap-1 font-medium text-foreground text-sm leading-5 max-sm:text-[0.9375rem]"
              htmlFor="tag-search"
            >
              Search tags
              <AutocompleteInput
                className="w-full"
                id="tag-search"
                placeholder="e.g. feature"
              />
            </label>
          </div>

          <AutocompletePortal>
            <AutocompletePositioner>
              <AutocompletePopup className="!w-full min-w-[300px] max-sm:min-w-0">
                <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
                <AutocompleteList>
                  {(tag: Tag) => (
                    <AutocompleteItem
                      className="flex w-full items-center text-left"
                      key={tag.id}
                      value={tag}
                    >
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
