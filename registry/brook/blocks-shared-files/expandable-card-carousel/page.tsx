"use client";
import { ExpandableCardCarousel } from "./components/expandable-card-carousel";
import data from "./data.json";

export default function Page() {
  return <ExpandableCardCarousel data={data} />;
}
