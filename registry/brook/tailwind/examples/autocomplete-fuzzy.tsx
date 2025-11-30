"use client";

import type React from "react";
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
  AutocompleteValue,
} from "@/registry/brook/tailwind/ui/autocomplete";
import { matchSorter } from "match-sorter";

interface Question {
  value: string;
  question: string;
  category: string;
}

const questions: Question[] = [
  {
    value: "reset-password",
    question: "How do I reset my password?",
    category: "Account",
  },
  {
    value: "payment-methods",
    question: "What payment methods do you accept?",
    category: "Billing",
  },
  {
    value: "cancel-subscription",
    question: "How do I cancel my subscription?",
    category: "Billing",
  },
  {
    value: "export-data",
    question: "Can I export my data?",
    category: "Data",
  },
  {
    value: "api-access",
    question: "How do I get API access?",
    category: "Developer",
  },
  {
    value: "contact-support",
    question: "How do I contact support?",
    category: "Support",
  },
  {
    value: "refund-policy",
    question: "What is your refund policy?",
    category: "Billing",
  },
  {
    value: "data-privacy",
    question: "How is my data protected?",
    category: "Privacy",
  },
  {
    value: "team-members",
    question: "How do I add team members?",
    category: "Account",
  },
  {
    value: "integrations",
    question: "What integrations are available?",
    category: "Features",
  },
];

function highlightText(text: string, query: string): React.ReactNode {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return text;
  }

  const textLower = text.toLowerCase();
  const result: React.ReactNode[] = [];
  let queryIndex = 0;

  for (let i = 0; i < text.length; i++) {
    if (queryIndex < trimmed.length && textLower[i] === trimmed[queryIndex]) {
      result.push(
        <mark className="bg-transparent text-[var(--info)] font-medium" key={i}>
          {text[i]}
        </mark>
      );
      queryIndex++;
    } else {
      result.push(text[i]);
    }
  }

  return result;
}

function fuzzyFilter(itemValue: unknown, query: string): boolean {
  if (!query) {
    return true;
  }

  const item = itemValue as Question;
  const results = matchSorter([item], query, {
    keys: [
      "question",
      "category",
      { key: "question", threshold: matchSorter.rankings.CONTAINS },
      { key: "category", threshold: matchSorter.rankings.WORD_STARTS_WITH },
    ],
  });

  return results.length > 0;
}

export default function AutocompleteFuzzy() {
  const [value, setValue] = useState("");

  return (
    <div className="p-8 max-sm:p-4">
      <label
        className="mb-2 ml-1 flex flex-col gap-1 font-medium text-foreground text-sm leading-[17.5px] max-sm:text-[0.9375rem]"
        htmlFor="fuzzy-input"
      >
        Search for help
      </label>

      <Autocomplete
        filter={fuzzyFilter}
        items={questions}
        itemToStringValue={(item) => (item as Question).question}
        onValueChange={setValue}
        value={value}
      >
        <AutocompleteInput
          className="w-[300px] max-sm:w-full"
          id="fuzzy-input"
          placeholder="Try 'billing' or 'password'..."
        />

        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty className="p-4 text-center text-muted-foreground text-sm">
                No results found for "<AutocompleteValue />"
              </AutocompleteEmpty>
              <AutocompleteList>
                {(item: Question) => (
                  <AutocompleteItem
                    className="h-auto py-2"
                    key={item.value}
                    value={item}
                  >
                    <AutocompleteValue>
                      {(inputValue) => (
                        <div className="flex flex-1 flex-col gap-0.5">
                          <div className="text-[0.8125rem] font-normal leading-[1.4] text-foreground">
                            {highlightText(item.question, inputValue)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {highlightText(item.category, inputValue)}
                          </div>
                        </div>
                      )}
                    </AutocompleteValue>
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  );
}
