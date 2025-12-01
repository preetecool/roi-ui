"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/brook/tailwind/ui/accordion";

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
    <Accordion
      className="max-sm:w-full max-sm:max-w-full"
      defaultValue={["item-1"]}
      multiple
    >
      {accordionItems.map((item) => (
        <AccordionItem
          className="overflow-visible !rounded-none !border-b !border-[oklch(from_var(--border)_l_c_h_/_0.5)] bg-transparent !p-0 !pb-6 !mb-6 !mt-0"
          key={item.id}
          value={item.id}
        >
          <AccordionHeader className="[&_h3]:m-0">
            <AccordionTrigger className="max-sm:gap-3 max-sm:text-[0.9375rem] [&>div:first-child]:h-auto [&>div:first-child]:w-auto">
              {item.title}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel className="[&>div>div]:ml-[calc(18px+1rem)] [&>div>div]:pt-3 [&>div>div]:pr-0 max-sm:[&>div>div]:ml-[calc(16px+0.75rem)]">
            {item.content}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
