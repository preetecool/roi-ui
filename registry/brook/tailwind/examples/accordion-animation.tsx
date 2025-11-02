"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { useState } from "react";
import { cn } from "@/lib/utils-tailwind";

const accordionItems = [
  {
    id: "item-1",
    title: "What features are included?",
    content:
      "All plans include real-time analytics, unlimited team members, custom branding, API access, and 24/7 support.",
  },
  {
    id: "item-2",
    title: "How does billing work?",
    content:
      "You can choose monthly or annual billing. Annual plans save 20% and you can cancel anytime with no fees.",
  },
  {
    id: "item-3",
    title: "Can I upgrade or downgrade?",
    content:
      "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at your next billing cycle.",
  },
];

export default function AccordionFramerMotion() {
  const [value, setValue] = useState<string[]>(["item-1"]);

  return (
    <div className="flex w-[32rem] max-w-[calc(100vw-8rem)] flex-col gap-4 max-sm:w-full max-sm:max-w-full max-sm:gap-3">
      <Accordion.Root onValueChange={setValue} value={value}>
        {accordionItems.map((item) => (
          <Accordion.Item
            className="mb-4 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--mix-card-66-bg)] p-4 max-sm:mb-3"
            key={item.id}
            value={item.id}
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent text-left font-[350] text-base text-secondary-foreground tracking-tight max-sm:gap-3 max-sm:text-[0.9375rem]">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center text-muted-foreground transition-[color,rotate] duration-200 ease-[cubic-bezier(0.455,0.03,0.515,0.955)]",
                    "group-hover:text-foreground",
                    "group-data-[panel-open]:rotate-90",
                    "max-sm:h-7 max-sm:w-7 max-sm:flex-shrink-0"
                  )}
                >
                  <svg
                    aria-label="Accordion toggle icon"
                    className="max-sm:h-4 max-sm:w-4"
                    fill="none"
                    height="18"
                    role="img"
                    viewBox="0 0 20 20"
                    width="18"
                  >
                    <title>Toggle accordion</title>
                    <path
                      className={cn(
                        "origin-center transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.455,0.03,0.515,0.955)]",
                        "group-data-[panel-open]:scale-0 group-data-[panel-open]:opacity-0"
                      )}
                      d="M4 10L16 10"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 4L10 16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>{item.title}</div>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Panel
              className={cn(
                "h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-150 ease-[cubic-bezier(0.455,0.03,0.515,0.955)]",
                "data-[ending-style]:h-0 data-[starting-style]:h-0"
              )}
            >
              <div
                className={cn(
                  "w-full scale-100 overflow-hidden opacity-100 blur-0",
                  "transition-[opacity,filter,scale] duration-150 ease-[cubic-bezier(0.455,0.03,0.515,0.955)]",
                  "[.data-\\[starting-style\\]_&]:scale-95 [.data-\\[starting-style\\]_&]:opacity-0 [.data-\\[starting-style\\]_&]:blur-[2px]",
                  "[.data-\\[ending-style\\]_&]:scale-95 [.data-\\[ending-style\\]_&]:opacity-0 [.data-\\[ending-style\\]_&]:blur-[2px]"
                )}
              >
                <div className="mt-1 ml-12 pr-12 text-[oklch(from_var(--foreground)_l_c_h_/_0.75)] text-sm leading-relaxed max-sm:ml-10 max-sm:pr-0 max-sm:text-[0.9375rem] max-sm:leading-normal">
                  {item.content}
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
