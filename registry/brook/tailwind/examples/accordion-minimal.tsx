"use client";

import { Accordion } from "@base-ui-components/react/accordion";
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

export default function AccordionMinimal() {
  return (
    <Accordion.Root
      className="flex w-[32rem] max-w-[calc(100vw-8rem)] flex-col max-sm:w-full max-sm:max-w-full"
      defaultValue={["item-1"]}
      multiple
    >
      {accordionItems.map((item) => (
        <Accordion.Item
          className="border-b border-[oklch(from_var(--border)_l_c_h_/_0.5)] pb-6 mb-6"
          key={item.id}
          value={item.id}
        >
          <Accordion.Header className="m-0 [&_h3]:m-0">
            <Accordion.Trigger
              className={cn(
                "group flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent text-left font-[350] text-base text-secondary-foreground tracking-[-0.02em]",
                "max-sm:gap-3 max-sm:text-[0.9375rem]"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center text-muted-foreground",
                  "transition-[color,rotate] duration-150 ease-[cubic-bezier(0.455,0.03,0.515,0.955)]",
                  "group-hover:text-foreground",
                  "group-data-[panel-open]:rotate-90"
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
              "h-[var(--accordion-panel-height)] overflow-hidden",
              "transition-[height] duration-150 ease-[cubic-bezier(0.455,0.03,0.515,0.955)]",
              "data-[ending-style]:h-0 data-[starting-style]:h-0"
            )}
          >
            <div
              className={cn(
                "ml-[calc(18px+1rem)] pt-3 text-sm leading-relaxed text-[oklch(from_var(--foreground)_l_c_h_/_0.75)]",
                "max-sm:ml-[calc(16px+0.75rem)] max-sm:text-[0.9375rem] max-sm:leading-normal"
              )}
            >
              {item.content}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
