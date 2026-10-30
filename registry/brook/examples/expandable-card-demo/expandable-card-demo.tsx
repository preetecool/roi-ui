"use client";
import { ExpandableCard, type ExpandableCardItem } from "@/registry/brook/ui/expandable-card/expandable-card";
import styles from "./expandable-card-demo.module.css";

const item: ExpandableCardItem = {
  id: 1,
  imageSrc: "/figure-01.webp",
  cardHeading: "Make work easier",
  alt: "A hooded figure by a river at night, looking up at lit stone arches and a full moon",
  content: (
    <div className={styles.content}>
      <p>Good software helps people finish their work. It should never get in the way.</p>

      <p>We test each component against real tasks. If a component slows people down, we change it.</p>
    </div>
  ),
};

export default function ExpandableCardDemo() {
  return <ExpandableCard item={item} />;
}
