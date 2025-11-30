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
} from "@/registry/brook/ui/autocomplete/autocomplete";
import { matchSorter } from "match-sorter";
import styles from "./autocomplete-fuzzy.module.css";

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
        <mark className={styles.highlight} key={i}>
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

function fuzzyFilter(item: Question, query: string): boolean {
  if (!query) {
    return true;
  }

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
    <div className={styles.container}>
      <label className={styles.label} htmlFor="fuzzy-input">
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
          className={styles.input}
          id="fuzzy-input"
          placeholder="Try 'billing' or 'password'..."
        />

        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty className={styles.empty}>
                No results found for "<AutocompleteValue />"
              </AutocompleteEmpty>
              <AutocompleteList>
                {(item: Question) => (
                  <AutocompleteItem
                    className={styles.item}
                    key={item.value}
                    value={item}
                  >
                    <AutocompleteValue>
                      {(inputValue) => (
                        <div className={styles.itemContent}>
                          <div className={styles.itemQuestion}>
                            {highlightText(item.question, inputValue)}
                          </div>
                          <div className={styles.itemCategory}>
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
