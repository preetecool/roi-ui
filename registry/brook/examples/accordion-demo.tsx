import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel } from "@/registry/brook/ui/accordion/accordion";

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>What is a brook?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          A small, natural stream of fresh water flowing along a course towards a river, lake, or sea.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>What is a stream?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          A small narrow river that flows continuously in one direction, often through valleys and plains.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>What is a creek?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          A narrow waterway smaller than a river, often found in wooded areas and feeding into larger bodies of water.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
