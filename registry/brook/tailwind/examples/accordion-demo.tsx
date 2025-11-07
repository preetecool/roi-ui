"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { useMemo, useState } from "react";
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

export default function AccordionDemo() {
  const [value, setValue] = useState<string[]>(["item-1"]);

  const expandedIndices = useMemo(() => {
    return value
      .map((v) => accordionItems.findIndex((item) => item.id === v))
      .filter((i) => i !== -1);
  }, [value]);

  const getItemClassName = (index: number) => {
    const isExpanded = expandedIndices.includes(index);
    const isBeforeExpanded = expandedIndices.includes(index + 1);
    const isAfterExpanded = expandedIndices.includes(index - 1);
    const isFirst = index === 0;
    const isLast = index === accordionItems.length - 1;

    return cn(
      // Base styles
      "overflow-hidden bg-[var(--mix-card-75-bg)] p-4",
      "border-b-[0.5px] border-border",
      "transition-[margin,border-radius,border-color] duration-200",
      "will-change-[margin,border-radius]",

      // Default state border-radius
      !isExpanded && !isBeforeExpanded && !isAfterExpanded && [
        isFirst && "rounded-t-3xl",
        isLast && "rounded-b-3xl border-b-transparent",
        isFirst && isLast && "rounded-3xl",
      ],

      // Expanded state
      isExpanded && [
        "rounded-3xl border-b-transparent",
        !isFirst && "mt-2",
        !isLast && "mb-2",
      ],

      // Before/after expanded states
      !isExpanded && isBeforeExpanded && isAfterExpanded && "rounded-3xl border-b-transparent",
      !isExpanded && isBeforeExpanded && !isAfterExpanded && [
        "rounded-b-3xl border-b-transparent",
        isFirst && "rounded-3xl",
      ],
      !isExpanded && isAfterExpanded && !isBeforeExpanded && [
        "rounded-t-3xl",
        isLast && "rounded-3xl",
      ]
    );
  };

  return (
    <div className="flex w-[32rem] max-w-[calc(100vw-8rem)] flex-col max-sm:w-full max-sm:max-w-full">
      <Accordion.Root onValueChange={setValue} value={value}>
        {accordionItems.map((item, index) => (
          <Accordion.Item
            className={getItemClassName(index)}
            key={item.id}
            value={item.id}
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full cursor-pointer items-center gap-4 border-none bg-transparent text-left text-base font-[350] tracking-[-0.02em] text-secondary-foreground max-sm:gap-3 max-sm:text-[0.9375rem]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground transition-[color,rotate] duration-[200ms,150ms] will-change-[rotate] group-hover:text-foreground group-data-[panel-open]:rotate-90 max-sm:h-7 max-sm:w-7">
                  <svg
                    fill="none"
                    height="18"
                    viewBox="0 0 20 20"
                    width="18"
                  >
                    <path
                      className="origin-center transition-[opacity,scale] duration-150 will-change-[opacity,transform] group-data-[panel-open]:scale-0 group-data-[panel-open]:opacity-0"
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

            <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-150 will-change-[height] data-[ending-style]:h-0 data-[starting-style]:h-0">
              <div className="w-full overflow-hidden">
                <div className="ml-12 pr-12 text-sm leading-[1.6] text-[color:oklch(from_var(--foreground)_l_c_h_/_0.75)] max-sm:ml-10 max-sm:pr-0 max-sm:text-[0.9375rem] max-sm:leading-[1.5]">
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
