"use client";

import { ExpandableCardSpread } from "./components/expandable-card-spread";
import data from "./data.json";

export default function Page() {
  return <ExpandableCardSpread data={data} />;
}
