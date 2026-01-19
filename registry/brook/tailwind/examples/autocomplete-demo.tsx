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
import { Badge } from "@/registry/brook/tailwind/ui/badge";

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
    <div className="flex flex-col gap-3 p-8 max-sm:p-4">
      <label
        className="ml-1 flex flex-col gap-1 font-medium text-[var(--color-foreground)] text-sm leading-[17.5px] max-sm:text-[0.9375rem]"
        htmlFor="ac-input"
      >
        Search for help or ask a question
      </label>

      <Autocomplete
        items={questions}
        itemToStringValue={(item) => (item as Question).question}
        onValueChange={setValue}
        value={value}
      >
        <AutocompleteInput
          className="w-[300px] max-sm:w-full"
          id="ac-input"
          placeholder="Type your question or search FAQs..."
        />

        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>No matching questions found. Type your own question!</AutocompleteEmpty>
              <AutocompleteList>
                {(question: Question) => (
                  <AutocompleteItem key={question.value} value={question}>
                    <div className="flex flex-1 items-center gap-3 max-sm:gap-2.5">
                      <div className="min-w-0 flex-1 text-left">
                        <div className="font-normal text-xs leading-[1.4] max-sm:text-[0.9375rem]">
                          {question.question}
                        </div>
                      </div>
                      <Badge className="flex-shrink-0" size="sm" variant="outline">
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
