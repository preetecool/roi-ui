import ExpandableCard, { ExpandableCardItem } from "@/registry/brook/ui/expandable-card/expandable-card";

const items: ExpandableCardItem[] = [
  {
    id: 1,
    src: "/water.svg",
    cardHeading: "Expandable Card",
    alt: "water flows",
    content: (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>

        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
          dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </div>
    ),
  },
];

export default function ExpandableCardDemo() {
  return (
    <div style={{ width: "100%", minHeight: "400px" }}>
      <ExpandableCard items={items} />
    </div>
  );
}
