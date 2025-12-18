"use client";
import { ExpandableCard, type ExpandableCardItem } from "./components/expandable-card";

const item: ExpandableCardItem = {
  id: 1,
  imageSrc: "/scene_02.svg",
  cardHeading: "Stardust",
  alt: "Man by the brook, under a bridge, looking at the sunrise",
  content: (
    <div>
      <p style={{ margin: "0 0 1rem 0" }}>
        He stood by the water's edge as twilight faded into night, watching the stars emerge one by one. Each pinpoint
        of light was a sun, perhaps with worlds of its own, yet all connected by an invisible thread that stretched back
        billions of years. The same atoms that now formed his thoughts had once been forged in the hearts of dying
        stars, scattered across the cosmos, waiting to become something new.
      </p>

      <p style={{ margin: "0 0 1rem 0" }}>
        What struck him most was the simplicity of it all. From a single cell, impossibly small and ancient, the entire
        tree of life had branched and flourished. Every creature that ever lived, every breath ever taken, traced back
        to that same origin. We are all cousins in this vast family, he thought, separated by millions of years yet
        bound by the same fundamental spark.
      </p>

      <p style={{ margin: "0 0 1rem 0" }}>
        The beauty wasn't just in the stars above or the life around him, but in the connection itself. That we exist at
        all, conscious and capable of wonder, seemed like the universe's way of knowing itself. He was stardust
        contemplating stars, life reflecting on life, a brief arrangement of atoms privileged enough to witness this
        cosmic dance. In that moment, standing beneath the infinite sky, he felt both infinitely small and infinitely
        part of something greater.
      </p>
    </div>
  ),
};

export default function Page() {
  return <ExpandableCard item={item} />;
}
