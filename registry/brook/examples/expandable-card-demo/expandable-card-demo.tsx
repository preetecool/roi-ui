"use client";
import { ExpandableCard, type ExpandableCardItem } from "@/registry/brook/ui/expandable-card/expandable-card";
import styles from "./expandable-card-demo.module.css";

const item: ExpandableCardItem = {
  id: 1,
  imageSrc: "/p-01.svg",
  cardHeading: "Eudaimonia",
  alt: "Figure contemplating under an archway at dusk",
  content: (
    <div className={styles.content}>
      <p>
        Aristotle taught that eudaimonia, or human flourishing, is not found in fleeting pleasures or material wealth,
        but in living a life of virtue and purpose. It is the highest good, achieved through the cultivation of
        character and the exercise of reason.
      </p>

      <p>
        We build not for momentary delight, but for lasting excellence. Every interface, every interaction is an
        opportunity to help users flourish in their work and creative pursuits.
      </p>
    </div>
  ),
};

export default function ExpandableCardDemo() {
  return <ExpandableCard item={item} />;
}
