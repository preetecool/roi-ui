"use client";
import { ExpandableCard } from "./components/expandable-card";

const demoItem = {
  id: "1",
  imageSrc: "/scene_01.svg",
  alt: "A woman contemplating architecture under the night sky",
  cardHeading: "Threshold",
  content: (
    <>
      <p>
        Between what we build and what eternally exists, she stands in quiet contemplation. The ancient arches frame not
        just stone, but centuries of human aspiration reaching toward something greater than ourselves.
      </p>
      <p>
        In the soft glow of twilight, architecture becomes more than shelter—it transforms into a bridge between the
        temporal and the timeless. Each weathered surface tells stories of hands that shaped it, minds that conceived
        it, and generations who have stood in this very spot, gazing upward at the same impossible geometry of faith
        made manifest.
      </p>
      <p>
        The veil she wears mirrors the mystery of the structure itself: layers of meaning wrapped in beauty, revealing
        and concealing in equal measure. This is the threshold moment—where the practical world of engineering meets the
        ineffable realm of the sacred, where human craft aspires to capture something divine.
      </p>
    </>
  ),
};

export default function Page() {
  return <ExpandableCard item={demoItem} />;
}
