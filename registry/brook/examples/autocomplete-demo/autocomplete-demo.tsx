"use client";

import { useState } from "react";
import { Badge } from "@/registry/brook/ui/badge/badge";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
} from "@/registry/brook/ui/autocomplete/autocomplete";
import styles from "./autocomplete-demo.module.css";

type Question = {
  value: string;
  question: string;
  category: string;
};

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
  { value: "export-data", question: "Can I export my data?", category: "Data" },
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

export default function AutocompleteDemo() {
  const [value, setValue] = useState("");

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="ac-input">
        Search for help or ask a question
      </label>

      <Autocomplete
        items={questions}
        itemToStringValue={(item) => (item as Question).question}
        onValueChange={setValue}
        value={value}
      >
        <AutocompleteInput
          className={styles.input}
          id="ac-input"
          placeholder="Type your question or search FAQs..."
        />

        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>
                No matching questions found. Type your own question!
              </AutocompleteEmpty>
              <AutocompleteList>
                {(question: Question) => (
                  <AutocompleteItem key={question.value} value={question}>
                    <div className={styles.itemContainer}>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemName}>
                          {question.question}
                        </div>
                      </div>
                      <Badge
                        className={styles.badge}
                        size="sm"
                        variant="secondary"
                      >
                        {question.category}
                      </Badge>
                    </div>
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
