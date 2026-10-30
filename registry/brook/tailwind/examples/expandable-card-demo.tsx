import { ExpandableCard, type ExpandableCardItem } from "@/registry/brook/tailwind/ui/expandable-card";

const item: ExpandableCardItem = {
  id: 1,
  imageSrc: "/figure-01.webp",
  cardHeading: "Make work easier",
  alt: "A hooded figure by a river at night, looking up at lit stone arches and a full moon",
  content: (
    <div>
      <p style={{ margin: "0 0 1rem 0" }}>
        Good software helps people finish their work. It should never get in the way.
      </p>

      <p style={{ margin: "0 0 1rem 0" }}>
        We test each component against real tasks. If a component slows people down, we change it.
      </p>
    </div>
  ),
};
export default function ExpandableCardDemo() {
  return (
    <div>
      <ExpandableCard item={item} />
    </div>
  );
}
