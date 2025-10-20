import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "@/registry/brook/ui/accordion/accordion";

export default function AccordionDemo() {
  return (
    <AccordionRoot defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>What features are included?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          All plans include real-time analytics, unlimited team members, custom
          branding, API access, and 24/7 support.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>How does billing work?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          You can choose monthly or annual billing. Annual plans save 20% and
          you can cancel anytime with no fees.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>Can I upgrade or downgrade?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Yes, you can change your plan at any time. Upgrades take effect
          immediately, and downgrades apply at your next billing cycle.
        </AccordionPanel>
      </AccordionItem>
    </AccordionRoot>
  );
}
